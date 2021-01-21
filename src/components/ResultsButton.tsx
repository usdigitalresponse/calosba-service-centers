//@ts-nocheck

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "~/components/uswds-components";
import { useForm, useFormDictionary } from "../contexts/form";
import rules from "../data/rules.json";
import centers_data from "./../data/centers.json";
import county_nearest_neighbors_data from "./../data/count_nearest_neighbors.json";
import assert from "assert";
import {Center} from "./../types";

interface Rule {
  op: string;
  qid: string;
  value: string;
}

// interface ProgramDef {
//   program: string;
//   rules: Rule[];
// }

const getNearestCenters = (userSelectedCountyName: string): Center[] => {
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

function evalRuleSet(values: Record<string, any>, ruleSet: Rule[]) {
  return ruleSet.every((rule) => {
    const { op, qid, value } = rule;

    console.log("VAL", value)
    console.log("values", values)

    const inputValue = values[qid];
  
    if (inputValue === undefined) {
      // answer not filled out yet
      return false;
    }

    // let inputValueAsString;
    // if (inputValue instanceof Date) {
    //   inputValueAsString = inputValue.toISOString().slice(0, 10); // Just date, not time
    // } else {
    //   inputValueAsString = inputValue.toString();
    // }
    // if (op === "eq") {
    //   return inputValueAsString === value;
    // } else if (op === "le") {
    //   return inputValueAsString <= value;
    // } else {
    //   assert(false, `unknown op ${op}`);
    // }
  });
}

const ResultsButton: React.FC<{}> = (props) => {
  const { values } = useForm();
  const [results] = useFormDictionary("results");
  const allCenters: Center[] = JSON.parse(JSON.stringify(centers_data));

  const typedRules = rules;

  const userSelectedCountyName: string = values.ca_services_county;
  const finalEligibleCountyIds: number[] = [];
  
  // get nearest centers to county
  const nearestCenters: Center[] = getNearestCenters(userSelectedCountyName)

  console.log("VALUES", values)

  nearestCenters.forEach((center: Center) => {
    // if (center.languages.includes())
    finalEligibleCountyIds.push(center.id)
  })

  

  // for (const progDef of typedRules) {
  //   if (evalRuleSet(values, progDef.rules)) {
  //     selectedCenterIds.push(progDef.program);
  //   }
  // }

  const href =
    "/results?" + finalEligibleCountyIds.map((centerId) => "eligible=" + centerId).join("&");

  return (
    <Link to={href}>
      <Button size="large">{results}</Button>
    </Link>
  );
};

export default ResultsButton;
