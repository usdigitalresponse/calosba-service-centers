import React, { useEffect , useState} from "react";
import * as L from 'leaflet';
import { useLocation } from "react-router-dom";
import ResultsList from './ResultsList'
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Tabsbar from "./Tabsbar";
import { Helmet } from "react-helmet";
import centers_data from "./../data/centers.json";
import {Center} from "./../types";
import { Accordion, AccordionPanel, Box } from 'grommet';

import "./results.scss";
import "./index.scss";

 // For typescript:
 const allCenters = JSON.parse(JSON.stringify(centers_data));

const Results: React.FC = () => {
  const { search } = useLocation();
  const [eligibleCenters, setEligibleCenters] = useState<Center[]>([])

  // get result ids from query params:
  const idsFromQuery: number[] = new URLSearchParams(search).getAll("eligible").map(string => parseInt(string));

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
    if (idsFromQuery.length) {
      let eligibleCenters: Center[] = [];
      allCenters.forEach(((center: Center) => {
        if (idsFromQuery.includes(center.id)) {
          eligibleCenters.push(center);
        }
      }));
      setEligibleCenters(eligibleCenters);
      renderLeafletMap(eligibleCenters);
      window.scrollTo(0, 0);
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
        content="Find CalOSBA support centers to help your business."
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
            {idsFromQuery.length > 0 ? 
              <>
                <p>
                  Please contact a technical assistance center(s) to be matched with an advisor for no-cost one-on-one consulting or register for low-cost training.
                </p>
                <p>
                  To learn more about our centers, <a href={'#glossary'}>go to our glossary.</a>
                </p>
                <p>
                  You can also <a href={'/'}>start this form over again.</a>  
                </p>
                <div id="mapid"></div>
                <div className="tabsbar-container">
                  <Tabsbar
                      eligibleCenters={eligibleCenters}
                    />
                </div>
                <ResultsList
                  eligibleCenters={eligibleCenters}
                />
              </> : (
                <>
                  <p className="no-matches-paragraph">
                    Please email the California Office of the Small Business Advocate by <a target="_blank" href="https://business.ca.gov/zendesk">
                    using this online form to be connected with a resource.
                    </a>
                  </p>
                  <p className="no-matches-paragraph">
                    You can also <a href={'/'}>start this form over again.</a> 
                  </p>
              </>
            )}
          </div>
          {eligibleCenters.length > 0 && <div className="col-md-4">
            <Sidebar
              eligibleCenters={eligibleCenters}
            />
          </div>}
          <div className="accordion-container">
            <a id={"glossary"}></a>
            <h2>Glossary of Terms:</h2>
            <Accordion
              multiple={true}
              margin="small"
            >
              <AccordionPanel label="MBDA (Minority Business Development Agency)">
                <Box pad="medium" background="light-2">
                  <p>Minority-owned firms seeking to penetrate new markets — domestic & global — and growing in size and scale, can access business experts at a MBDA Business Center. Whether it’s securing capital, competing for a contract, identifying a strategic partner or becoming export-ready, your success is our priority. The Centers are in areas with the largest concentration of minority populations and the largest number of minority businesses.</p>
                </Box>
              </AccordionPanel>
              <AccordionPanel label="PTAC (Procurement Technical Assistance Center)">
                <Box pad="medium" background="light-2">
                  <p>PTACs provide a wide range of government contracting help — most free of charge! All PTACs are staffed with counselors experienced in government contracting and provide a wide range of services including classes and seminars, individual counseling and easy access to bid opportunities, contract specifications, procurement histories, and other information necessary to successfully compete for government contracts. Many PTAC counselors have backgrounds in government acquisitions and virtually all receive ongoing training to keep pace with continually evolving acquisitions procedures and policies.</p>
                </Box>
              </AccordionPanel>
              <AccordionPanel label="SBDC (Small Business Development Center)">
                <Box pad="medium" background="light-2">
                  <p>Small business owners and aspiring entrepreneurs can go to their local SBDCs for FREE face-to-face business consulting and at-cost training on a variety of topics. The mission of America s nationwide network of SBDCs is to help new entrepreneurs realize the dream of business ownership and assist existing businesses to remain competitive in an ever-changing global economy.</p>
                </Box>
              </AccordionPanel>
              <AccordionPanel label="VBOC (Veterans Business Outreach Center)">
                <Box pad="medium" background="light-2">
                  <p>VBOC's mission is to advance the growth and commercial competitiveness of veteran owned small business enterprises through education and services focusing on business development, technology deployment and e-commerce.</p>
                </Box>
              </AccordionPanel>
              <AccordionPanel label="WBC (Women’s Business Center)">
                <Box pad="medium" background="light-2">
                  <p>WBCs help women succeed in business by providing training, mentoring, business development, and financing opportunities to over 145,000 women entrepreneurs each year. Small business owners and aspiring entrepreneurs can go to their local WBCs for FREE face-to-face business consulting and at-cost training on a variety of topics.</p>
                </Box>
              </AccordionPanel>
              <AccordionPanel label="Other Technical Assistance Centers ">
                <Box pad="medium" background="light-2">
                  <p> California is home to a myriad of other technical assistance providers that provide small business technical assistance to small business owners and entrepreneurs. Many of these organizations focus on providing technical assistance to women, people of color, minorities, veterans, low to moderate income communities, and rural communities.</p>
                </Box>
              </AccordionPanel>
            </Accordion>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
  );
};

export default Results;