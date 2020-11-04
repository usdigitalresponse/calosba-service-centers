// @ts-nocheck
import React, { useEffect } from "react";

import "./form-style.scss";
import "./results.scss";

const StatePrograms: React.FC = (props) => {

  const stateProgramList = props.eligibleStatePrograms.map((program, i) => {
    return (
      <div id={program.id} className={i === props.eligibleStatePrograms.length - 1 ? "loan-container-last" : "loan-container"}>
        <a name={program.id}></a>
        <label className="top-label">
          {program.status}
        </label>
        <h2 className="title">
          {program.name}
        </h2>
        <p className="loan-description">
          <strong>What is it?</strong>
        </p>
        <p>
          {program.what}
        </p>
        <p className="loan-description">
          <strong>Who is it for?</strong>
        </p>
        <a
          className="usa-button"
          data-ga-label={program.id}
          onClick={(e) => {
            e.preventDefault();
            window.open(program.url, '_blank')
            }}
          type="button"
          href="#"
        >
          Apply Now
        </a>
      </div>
    )
  });

  return (
    <div>
      {stateProgramList}
    </div>
  )
};

export default StatePrograms;