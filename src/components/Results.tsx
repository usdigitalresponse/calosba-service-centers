// @ts-nocheck

import React, { useEffect , useState} from "react";
import { useLocation, useHistory } from "react-router-dom";
import ResultsList from './ResultsList'
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Tabsbar from "./Tabsbar";
import { Helmet } from "react-helmet";
import { useFormDictionary, useForm } from "~/contexts/form";

import "./results.scss";
import "./index.scss";

const allCenters = [1, 2, 3];

const Results: React.FC = () => {
  const { search } = useLocation();
  const history = useHistory();
  const [back, next, complete] = useFormDictionary("back", "next", "complete");
  const [windowWidth, setWindowWidth] = useState(0);

  const updateDimensions = () => {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    setWindowWidth(windowWidth);
  }

  const renderLeafletMap = () => {
    var map = L.map('mapid').setView([36.7, -119], 7);

    L.marker([36.7, -119]).addTo(map)
    L.marker([36.3, -119.2]).addTo(map)
    L.marker([37.5, -119.2]).addTo(map)
    L.marker([37, -118.9]).addTo(map)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    renderLeafletMap();
  }, []);

  const {
    form: { results },
  } = useForm();

  const useDevData = true;

  // hacky port of raw js from previous results page, will redo with the new results page
  const eligibleResultIds = useDevData ? allCenters : URLSearchParams(search).getAll("eligible")
  const filteredCenters = results.filter(center => {
    return eligibleResultIds.includes(center.Id)
  })
  return (
    <div className="content-page">
    <Helmet>
      <meta property="og:title" content="COVID-19 SMB Loan Information" />
      <meta
        property="og:description"
        content="Learn about support programs available to help stabilize your business."
      />
      <title>COVID-19 SMB Loan Information</title>
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
              Calosba Centers near you
            </h1>
            <p>
              These are centers we recommend.
            </p>
            <div className="tabsbar-container">
              <Tabsbar
                  results={filteredCenters}
                />
            </div>
            <div id="mapid"></div>
            <ResultsList
              results={filteredCenters}
            />
          </div>
          <div className="col-md-4">
            <Sidebar
              eligiblePrograms={filteredCenters}
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