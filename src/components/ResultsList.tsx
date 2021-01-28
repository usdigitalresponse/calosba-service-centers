// @ts-nocheck

import React, { useEffect } from "react";
import {Center} from './../types';
import areas_of_service from '../data/areas_of_service.json';
import specific_communities from '../data/specific_communities.json';

import "./form-style.scss";
import "./results.scss";

const ResultsList: React.FC<resultsListProps> = ({eligibleCenters}) => eligibleCenters.map((center, i) => {
  return (
    <div id={center.id} className="loan-container">
      <a name={center.id}></a>
      <h2 className="title">
        {center.name}
      </h2>
      <p className="loan-description">
        <strong>Address: </strong><div>{center.fullAddress}</div>
        {center.hasStatewideService && <label className="top-label">This center has statewide service</label>}
      </p>
      <p>
      </p>
      <p className="loan-description">
        <strong>Languages: </strong> <p>{center.languages.join(', ')}</p>
      </p>
      <p className="loan-description">
        <strong>Services Offered:</strong> 
        <p className="services-list">
          {center.areasOfService.map(areaId => {
            const areaObj = areas_of_service.find(area => area.id === areaId);
            return <li>{areaObj.name}</li>
          })}
        </p>
      </p>
      {center.specificCommunities.length > 0 && <p className="loan-description">
        <strong>Specific Communities:</strong> 
        <p className="services-list">
          {center.specificCommunities.map(communityId => {
            const communityObj = specific_communities.find(community => community.id === communityId);
            return <li>{communityObj.name}</li>
          })}
        </p>
      </p>}
      <a
        className="usa-button"
        onClick={(e) => {
          e.preventDefault();
          window.open(`${center.website}`, '_blank')
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