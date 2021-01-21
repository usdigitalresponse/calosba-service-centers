// @ts-nocheck

import React, { useEffect } from "react";
import {Center} from './../types';

import "./form-style.scss";
import "./results.scss";

const ResultsList: React.FC<resultsListProps> = ({eligibleCenters}) => eligibleCenters.map((center, i) => {
  return (
    <div id={center.id} className="loan-container">
      <a name={center.id}></a>
      {/* <label className="top-label">
        {program.address}
      </label> */}
      <h2 className="title">
        {center.name}
      </h2>
      <p className="loan-description">
        <strong>Address: </strong><p>{center.fullAddress}</p>
      </p>
      <p>
      </p>
      <p className="loan-description">
        <strong>Languages: </strong> <p>{center.languages.join(', ')}</p>
      </p>
      <p className="loan-description">
        <strong>Services Offered:</strong> 
        <p className="services-list">
          {center.areasOfService.map(area => {
            return <li>{area}</li>
          })}
        </p>
      </p>
      <a
        className="usa-button"
        onClick={(e) => {
          e.preventDefault();
          window.open(center.website, '_blank')
          }}
        type="button"
        href="#"
      >
        Learn More
      </a>
    </div>
  )
});

type resultsListProps = {
  eligibleCenters: Center[]
}

export default ResultsList;