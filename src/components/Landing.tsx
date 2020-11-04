import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Header from "./Header";
import Footer from "./Footer";

import "./footer.scss";
import "./index.scss";

interface Props {
  ca?: boolean
  ca_services?: boolean
  pitt?: boolean
  hawaii?:boolean;
}

const Landing: React.FC<Props> = (props) => {
  const { ca, ca_services, pitt, hawaii } = props;

  const [windowWidth, setWindowWidth] = useState(1000);

  const updateDimensions = () => {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    setWindowWidth(windowWidth);
  }

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
  }, [])

  const styles = {
    showSidebar: windowWidth > 768,
    sidebarWidth: windowWidth < 1100 ? 50 : 150,
    sidebarCollapsed: windowWidth < 1100
  };

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
      <Header/>
      <div className="container humans-image">
        <img
          src="/smb_humans.svg"
          alt="Person getting money"
        ></img>
      </div>
      <main>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div>
                <h1>[CA-SERVICES] Find COVID-19 financial assistance for your business</h1>
                <p>
                  Answer a few questions to find loans, funding alternatives, and support.
                </p>
                  <Link 
                    to="/questions"
                    role="button"
                    className="usa-button usa-button--big"
                    >
                      Get Started
                  </Link>

              </div>
              <section>
                {/* <h2>Who is it for?</h2> */}
                <p>This free tool is for U.S.-based businesses including:</p>
                <ul>
                  <li>Non-profits</li>
                  <li>Tribal business concerns</li>
                  <li>Self-employed individuals</li>
                  <li>Contractors, freelancers, and gig workers</li>
                  <li>Small business with fewer than 500 employees (including C Corp, S Corp, LLC)</li>
                </ul>
                <p>If you have more than 500 employees, check the <a className="link-in-text" href = "https://www.sba.gov/document/support--table-size-standards" target="_blank">
                  Small Business Administration size standards </a> to find loans specific to your industry.</p>
              </section>
              {/* <section id="government-partners">
                <h2>Government partners</h2>
                <p>
                  To get a free tool built for your agency or to include your state's programs, please email the {" "}
                  <a
                    target="_blank"
                    href="https://www.usdigitalresponse.org/requesthelp"
                  >
                    US Digital Response
                  </a>
                  .
                </p>
              </section> */}
            </div>
            <div className="col-md-6 d-none d-md-block">
              <img
                src="/smb_humans.svg"
                alt="Graphic of a handdrawn women of color receiving money. We hope to better support small minority-owned businesses with this tool."
              ></img>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
