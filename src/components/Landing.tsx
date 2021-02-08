import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import Header from "./Header";
import Footer from "./Footer";

import "./footer.scss";
import "./index.scss";

const Landing: React.FC = () => {
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
        <title>CalOSBA Technical Assistance</title>
        <meta
          name="Description"
          content="Learn about support programs available to help stabilize your business."
        />
      </Helmet>
      <Header showLanguageSelect/>
      <div className="container humans-image">
        <img
          src="/smb_humans.svg"
          alt="Person getting money"
        ></img>
      </div>
      <main>
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div>
                <h1>Find technical assistance for your small business</h1>
                <p className="content-container">
                  California supports a network of small business technical assistance centers that provide services, including but not limited to, free one-on-one consulting and no-cost or low-cost trainings to:                  
                  <p className="landing-list">
                    <li className="landing-list-item">Help businesses get funded</li>
                    <li className="landing-list-item">Enter new markets</li>
                    <li className="landing-list-item">Strengthen operations</li>
                    <li className="landing-list-item">Build resiliency and more.</li>
                  </p>
                  With over 30 languages available, use this tool to find your local center today and tailored services.
                </p>
                
                <div className="content-container">
                  <Link 
                    to="/questions"
                    role="button"
                    className="usa-button usa-button--big"
                    >
                      Get Started
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-5 d-none d-md-block">
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
