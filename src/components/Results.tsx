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
import centers_data from "./../data/centers.json";

import "./results.scss";
import "./index.scss";

const Results: React.FC = () => {
  const { search } = useLocation();
  const [windowWidth, setWindowWidth] = useState(0);

  const updateDimensions = () => {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    setWindowWidth(windowWidth);
  }

  const handleMarkerClick = (centerId) => {
    window.location.replace(`#${centerId}`)
  }

  const renderLeafletMap = (centers) => {
    const idsFromQuery = new URLSearchParams(search).getAll("eligible");
    const eligibleResultIds = idsFromQuery.map(id => parseInt(id))
    const filteredCenters = centers_data.filter(center => {
      return eligibleResultIds.includes(center.Id)
    })
    let initialLatLong = [36.7, -119]
    if (filteredCenters[0]) {
      initialLatLong = [filteredCenters[0]?.Latitude, [filteredCenters[0]?.Longitude]]
    }
    var map = L.map('mapid').setView(initialLatLong, 7);

    filteredCenters.forEach(center => {
      let latLongTuple = [center.Latitude, center.Longitude]
      L.marker(latLongTuple).bindTooltip(center.CenterName, {permanent: false, className: "my-label", offset: [0, 0] }).addTo(map).on('click', () => {handleMarkerClick(center.Id)});
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    const idsFromQuery = new URLSearchParams(search).getAll("eligible");
    if (idsFromQuery) {
      renderLeafletMap();
    }
  }, []);

  // const {
  //   form: { results },
  // } = useForm();

  // hacky port of raw js from previous results page, will redo with the new results page
  const idsFromQuery = new URLSearchParams(search).getAll("eligible");
  const eligibleResultIds = idsFromQuery.map(id => parseInt(id))
  const filteredCenters = centers_data.filter(center => {
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
              Your Recommendations
            </h1>
            <p>
            Please contact a technical assistance center(s) to be matched with an advisor for no-cost one-on-one consulting or register for low-cost training.
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
              centers={filteredCenters}
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