import React from "react";
import { Link } from "react-router-dom";
import { Button } from "~/components/uswds-components";
import { useForm, useFormDictionary } from "../contexts/form";
import centers_data from "./../data/centers.json";
import county_nearest_neighbors_data from "./../data/count_nearest_neighbors.json";
import {Center} from "./../types";

 // Re-parsing JSON for TypeScript: 
const allCenters = JSON.parse(JSON.stringify(centers_data));

const getNearestCenters = (userSelectedCountyName: string | undefined): Center[] => {
  if (!userSelectedCountyName) {
    return [];
  }
  
  const nearestIds = county_nearest_neighbors_data[userSelectedCountyName].slice(0, 5);
  const nearestCenters: Center[] = [];

  allCenters.forEach((center: Center) => {
    // adds statewide centers to result set:
    if (center.hasStatewideService) {
      nearestCenters.push(center);

    // adds nearest id matches to result set:
    } else if (nearestIds.includes(center.id)) {
      nearestCenters.push(center)
    }
  })
  return nearestCenters;
}

const centerIncludesSelection = (centerValues: any, selectedValues: number[]): boolean => {
  let returnFlag = false;
  
  if (!selectedValues) {
    return false;
  }

  // if selected is -1, "None of the above"
  if (selectedValues.includes(-1)) {
    // if center is not null for this criteria, center is ineligible:
    if (centerValues.length > 0) {
      return false;
    } else {
      return true
    }
  }

  // if selected is 0, "Other" -> center is eligible
  if (selectedValues.includes(0)) {
    return true;
  }

  // if selected value is included in center values -> center is eligible.
  selectedValues.forEach(selection => {
    if (centerValues.includes(selection)) {
      returnFlag = true;
    }
  })
  return returnFlag;
}

const getEligibleCenterIds = (nearestCenters: Center[], values): number[] => {
  const resultCenterIds: number[] = [];
  if (!nearestCenters) {
    return [];
  }

  // loop through each center
  nearestCenters.forEach((center: Center) => {
    // A center is eligible if it meets criteria for each question on the form, excluding county question:
    const matchesNeeded = Object.keys(values).length - 1;
    let matchesCurrent = 0;

    // filter for language:
    const selectedLanguagesArray = values.question_languages;
    if (centerIncludesSelection(center.languages, selectedLanguagesArray)) {
      matchesCurrent += 1;
    }

    // filter for areas of service: 
    const selectedAreasOfServiceArray = values.question_areas_of_service;
    if (centerIncludesSelection(center.areasOfService, selectedAreasOfServiceArray)) {
      matchesCurrent += 1;
    }

    // filter for specific communities:
    const selectedSpecificCommunities = values.question_communities;
    if (centerIncludesSelection(center.specificCommunities, selectedSpecificCommunities)) {
      matchesCurrent += 1;
    }

    // If enough matches are met, add center id to eligible result set.
    if (matchesCurrent === matchesNeeded) {
      resultCenterIds.push(center.id)
    }
  })
  return resultCenterIds;
}

const ResultsButton: React.FC<{}> = (props) => {
  const { values } = useForm();
  const [results] = useFormDictionary("results");

  const userSelectedCountyName: any = values.question_county;

  // Get nearest centers to selected county. If no selected, include all centers. 
  const nearestCenters: Center[] = userSelectedCountyName ? getNearestCenters(userSelectedCountyName) : allCenters;

  // Get list of eligible center ids - max length 10
  const finalEligibleCenterIds: number[] = getEligibleCenterIds(nearestCenters, values).slice(0, 10) || [];
  const href = "/results?" + finalEligibleCenterIds.map((centerId) => "eligible=" + centerId).join("&")
  
  return (
    <Link to={href}>
      <Button 
        size="large"
      >{results}</Button>
    </Link>
  );
};

export default ResultsButton;
