import React from "react";

import "./footer.scss";

const Footer: React.FC = () => (
  <footer className="no-print">
    <div className="container">
      <div className="row">
        <div className="col">
          <img id="footer-osba-logo" src="/osba_logo_light.png" alt="CalOSBA Logo" />
          Office of the Small Business Advocate (CalOSBA) and The Governor’s Office of Business and Economic Development (GO-Biz)
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="footer-social">
            <img className="social" src="/twitter_logo.png" alt="Twitter logo" />
            <a target="_blank" href="https://twitter.com/CaliforniaOSBA">
              @CaliforniaOSBA
            </a>
          </div>
          <div className="footer-social">
            <img className="social" src="/instagram_logo.jpeg" alt="Instagram logo" />
            <a target="_blank" href="https://instagram.com/CaliforniaOSBA">
              @CaliforniaOSBA
            </a>
          </div>
          <div className="footer-social">
            <img className="social" src="/facebook_logo.png" alt="Instagram logo" />
            <a target="_blank" href="https://facebook.com/CaliforniaOSBA">
              @CaliforniaOSBA
            </a>
          </div>
          <div className="footer-post-script">
            This network is funded in part by a grant from the State of California
          </div>
        </div>
        <div className="col">
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
            <div>
              Submit an email request at <a target="_blank" href="https://business.ca.gov/zendesk">
              business.ca.gov/zendesk
              </a>
          </div>

        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
