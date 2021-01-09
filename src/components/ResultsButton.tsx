//@ts-nocheck

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "~/components/uswds-components";
import { useForm, useFormDictionary } from "../contexts/form";
import rules from "../data/rules.json";
import county_nearest_neighbors_data from "./../data/count_nearest_neighbors.json";
import assert from "assert";

interface Rule {
  op: string;
  qid: string;
  value: string;
}

interface ProgramDef {
  program: string;
  rules: Rule[];
}

function evalRuleSet(values: Record<string, any>, ruleSet: Rule[]) {
  return ruleSet.every((rule) => {
    const { op, qid, value } = rule;

    console.log(county_nearest_neighbors_data)

    const inputValue = values[qid];
    if (qid === 'ca_services_county') {
      
      
    }
    if (inputValue === undefined) {
      // answer not filled out yet
      return false;
    }

    let inputValueAsString;
    if (inputValue instanceof Date) {
      inputValueAsString = inputValue.toISOString().slice(0, 10); // Just date, not time
    } else {
      inputValueAsString = inputValue.toString();
    }
    if (op === "eq") {
      return inputValueAsString === value;
    } else if (op === "le") {
      return inputValueAsString <= value;
    } else {
      assert(false, `unknown op ${op}`);
    }
  });
}

const ResultsButton: React.FC<{}> = (props) => {
  const { values } = useForm();
  const [results] = useFormDictionary("results");

  // TODO: this should use the validation logic that the questions does
  const typedRules = rules as ProgramDef[];

  let selectedCountyName = values.ca_services_county;
  let centerIdsNearCounty = county_nearest_neighbors_data[selectedCountyName]

  const selectedCenterIds = [];
  for (const progDef of typedRules) {
    if (evalRuleSet(values, progDef.rules)) {
      selectedCenterIds.push(progDef.program);
    }
  }

  const href =
    "/results?" + centerIdsNearCounty.map((centerId) => "eligible=" + centerId).join("&");

  return (
    <Link to={href}>
      <Button size="large">{results}</Button>
    </Link>
  );
};

export default ResultsButton;
