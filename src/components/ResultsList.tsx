// @ts-nocheck
import React, { useEffect } from "react";

import "./form-style.scss";
import "./results.scss";

const ResultsList: React.FC = (props) => props.results.map((center, i) => {
  return (
    <div id={center.Id} className="loan-container">
      <a name={center.Id}></a>
      {/* <label className="top-label">
        {program.address}
      </label> */}
      <h2 className="title">
        {center.CenterName}
      </h2>
      <p className="loan-description">
        <strong>Address: </strong><span>{center.full_address}</span>
      </p>
      <p>
      </p>
      <p className="loan-description">
        <strong>Languages</strong>
      </p>
      <p>
        {center.Languages.map(lang => {
          return <li>{lang}</li>
        })}
      </p>
      <p className="loan-description">
        <strong>Services Offered</strong>
      </p>
      <p>
        {center.AreasOfService.map(area => {
          return <li>{area}</li>
        })}
      </p>
      <a
        className="usa-button"
        onClick={(e) => {
          e.preventDefault();
          window.open(center.Website, '_blank')
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