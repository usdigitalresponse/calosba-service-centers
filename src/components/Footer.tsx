import React from "react";

import "./footer.scss";

const Footer: React.FC = () => (
  <footer className="no-print">
    <div className="container">
      <div className="row">
        <div className="col">
          <img src="/osba_logo_light.png" alt="USDR Logo" />
          Office of the Small Business Advocate (CalOSBA)
            Governor’s Office of Business and Economic Development (GO-Biz)
        </div>
      </div>
      <div className="row">
        <div className="col">
          <p className="d-inline">
            <img src="/twitter_logo.png" alt="Twitter logo" />
            <a target="_blank" href="https://twitter.com/CaliforniaOSBA">
              @CaliforniaOSBA
            </a>
          </p>
          <p>
          <img src="/instagram_logo.jpeg" alt="Instagram logo" />
            <a target="_blank" href="https://instagram.com/CaliforniaOSBA">
              @CaliforniaOSBA
            </a>
          </p>
          <div className="footer-email">
            Submit an email request at <a target="_blank" href="https://business.ca.gov/zendesk">
            business.ca.gov/zendesk
            </a>
          </div>
        </div>
        <div className="col">
          <p className="d-inline">
            <div>
                     This network is funded in part by a grant from the State of California

            </div>
          </p>
          <p className="d-inline">
            <div>
          1325 J Street, Suite 1800
          Sacramento, CA 95814
          </div>
          </p>
          <p className="d-inline">
            <div>
          1-877-345-4633
          </div>
          </p>

        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
