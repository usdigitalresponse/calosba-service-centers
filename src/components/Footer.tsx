import React from "react";

import "./footer.scss";

const Footer: React.FC = () => (
  <footer className="no-print">
    <div className="container">
      <div className="row">
        <div className="col">
          <img src="/osba_logo_light.png" alt="USDR Logo" />
          This network is funded in part by a grant from the State of California
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="d-inline">
            <img src="/twitter_logo.png" alt="Twitter logo" />
            <a target="_blank" href="https://twitter.com/CaliforniaOSBA">
              @CaliforniaOSBA
            </a>
            <img src="/twitter_logo.png" alt="Twitter logo" />
            <a target="_blank" href="https://twitter.com/CaliforniaOSBA">
              @CaliforniaOSBA
            </a>
          </p>
          <p className="d-inline">
            <a href="mailto:info@usdigitalresponse.org">
              info@usdigitalresponse.org
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
