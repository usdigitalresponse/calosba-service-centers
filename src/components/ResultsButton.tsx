//@ts-nocheck

import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Button } from "~/components/uswds-components";
import { useForm, useFormDictionary } from "../contexts/form";
import rules from "../data/rules.json";
import centers_data from "./../data/centers.json";
import county_nearest_neighbors_data from "./../data/count_nearest_neighbors.json";
import assert from "assert";
import {Center} from "./../types";

// interface Rule {
//   op: string;
//   qid: string;
//   value: string;
// }

// interface ProgramDef {
//   program: string;
//   rules: Rule[];
// }

const getNearestCenters = (userSelectedCountyName: string): Center[] => {
  if (!userSelectedCountyName) {
    return [];
  }
  
  const nearestIds = county_nearest_neighbors_data[userSelectedCountyName].slice(0, 5);
  const nearestCenters: Center[] = [];

  centers_data.forEach(center => {
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

const centerIncludesSelection = (centerValues: [], selectedValues: []): boolean => {
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

  // if selected is 0, we let all pass
  if (selectedValues.includes(0)) {
    return true;
  }

  selectedValues.forEach(selection => {
    if (centerValues.includes(selection)) {
      returnFlag = true;
    }
  })
  return returnFlag;
}

const getEligibleCenterIds = (nearestCenters: Center[], values): number[] => {
  const resultCenterIds = [];
  if (!nearestCenters) {
    return [];
  }

  // filter out ineligible centers
  nearestCenters.forEach((center: Center) => {
    const matchesNeeded = 3;
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

  const userSelectedCountyName: string = values?.question_county;

  // Get nearest centers to selected county + add statewide centers
  const nearestCenters: Center[] = getNearestCenters(userSelectedCountyName) || [];
    
  // Get list of eligible center ids
  const finalEligibleCenterIds: number[] = getEligibleCenterIds(nearestCenters, values) || [];
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
