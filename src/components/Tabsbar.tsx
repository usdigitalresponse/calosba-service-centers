// @ts-nocheck
import React, { useEffect , useState} from "react";

import "./results.scss";

const Tabsbar: React.FC = (props) => {
  const [activeTab, setActiveTab] = useState('ppp');

  return (
    <nav id="mobile-tabsbar-container">
      <div className="tabsbar">
        {props.results.map(center => {
          return center.Id === activeTab ? 
            (
              <span className="tab-item current">
                <a className="tab-link current" href={`#${center.Id}`}><strong>{center.CenterName}</strong></a>
              </span>
            ) : (
              <span className="tab-item">
                <a 
                  className="tab-link" 
                  href={`#${center.Id}`}
                  onClick={() => {
                    setActiveTab(center.Id)
                  }}
                >
                    {center.CenterName}
                </a>
              </span>
            )
        })}
      </div>
    </nav>
  )
}

export default Tabsbar;