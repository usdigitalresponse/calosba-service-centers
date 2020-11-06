// @ts-nocheck
import React, { useEffect } from "react";

import "./form-style.scss";
import "./results.scss";

const StatePrograms: React.FC = (props) => {

  const stateProgramList = props.eligibleStatePrograms.map((program, i) => {
    return (
      <div id={program.id} className={i === props.eligibleStatePrograms.length - 1 ? "loan-container-last" : "loan-container"}>
        <a name={program.id}></a>
        {/* <label className="top-label">
          {program.address}
        </label> */}
        <h2 className="title">
          {program.name}
        </h2>
        <p className="loan-description">
          <strong>Address: </strong><span>{program.address}</span>
        </p>
        <p>
        </p>
        <p className="loan-description">
          <strong>Languages</strong>
        </p>
        <p>
          {program.languages}
        </p>
        <p className="loan-description">
          <strong>Services Offered</strong>
        </p>
        <p>
          {program.what}
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
          Learn More
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