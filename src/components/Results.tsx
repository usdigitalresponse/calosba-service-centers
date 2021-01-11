import React, { useEffect , useState} from "react";
import * as L from 'leaflet';
import { useLocation } from "react-router-dom";
import ResultsList from './ResultsList'
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Tabsbar from "./Tabsbar";
import { Helmet } from "react-helmet";
import { useFormDictionary, useForm } from "~/contexts/form";
import centers_data from "./../data/centers.json";
import {Center} from "./../types";

import "./results.scss";
import "./index.scss";

const Results: React.FC = () => {
  const { search } = useLocation();
  const [eligibleCenters, setEligibleCenters] = useState<Center[]>([])
  const allCenters = JSON.parse(JSON.stringify(centers_data));
 
  const handleMarkerClick = (centerId: number): void => {
    window.location.replace(`#${centerId}`)
  }

  const renderLeafletMap = (eligibleCenters: Center[] = []): void => {
    if (!eligibleCenters.length) {
      return;
    }
    const latLngs = eligibleCenters.map(center => L.latLng(center.latitude, center.longitude));
    const bounds = L.latLngBounds(latLngs);
    const map = L.map('mapid').fitBounds(bounds, {padding: [20, 20]});

    // render map tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // render marker for each center
    eligibleCenters.forEach(center => {
      let latLongTuple = new L.LatLng(center.latitude, center.longitude);
      L.marker(latLongTuple).bindTooltip(center.name, {permanent: false, className: "my-label", offset: [0, 0] }).addTo(map).on('click', () => {handleMarkerClick(center.id)});
    })
  }

  useEffect(() => {    
    // get result ids from query params:
    const idsFromQuery: number[] = new URLSearchParams(search).getAll("eligible").map(string => parseInt(string));
    if (idsFromQuery.length) {
      let eligibleCenters: Center[] = [];
      allCenters.forEach(((center: Center) => {
        if (idsFromQuery.includes(center.id)) {
          eligibleCenters.push(center);
        }
      }));
      setEligibleCenters(eligibleCenters);
      renderLeafletMap(eligibleCenters);
    }
  }, []);

  return (
    <div className="content-page">
    <Helmet>
      <meta property="og:title" content="COVID-19 SMB Loan Information" />
      <meta
        property="og:description"
        content="Learn about support programs available to help stabilize your business."
      />
      <title>CalOSBA Technical Assistance Centers</title>
      <meta
        name="Description"
        content="Learn about support programs available to help stabilize your business."
      />
    </Helmet>
    <Header showLanguageSelect/>
    <main>
      <div className="container">
        <div className="row">
          <div className="col-md-8 left">
            <h1 className="title-top">
              Your Recommendations
            </h1>
            <p>
            Please contact a technical assistance center(s) to be matched with an advisor for no-cost one-on-one consulting or register for low-cost training.
            </p>
            <div className="tabsbar-container">
              <Tabsbar
                  eligibleCenters={eligibleCenters}
                />
            </div>
            <div id="mapid"></div>
            <ResultsList
              eligibleCenters={eligibleCenters}
            />
          </div>
          <div className="col-md-4">
            <Sidebar
              eligibleCenters={eligibleCenters}
            />
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
  );
};

export default Results;