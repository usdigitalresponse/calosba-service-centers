// @ts-nocheck
import React, { useEffect } from "react";

import "./form-style.scss";
import "./results.scss";

const ResultsList: React.FC = (props) => props.results.map((program, i) => {
  return (
    <div id={program.id} className="loan-container">
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

export default ResultsList;