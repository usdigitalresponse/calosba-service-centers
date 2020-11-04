// @ts-nocheck
import React, { useEffect , useState} from "react";

import "./results.scss";

const Tabsbar: React.FC = (props) => {
  const [activeTab, setActiveTab] = useState('ppp');

  return (
    <nav id="mobile-tabsbar-container">
      <div className="tabsbar">
        {props.eligiblePrograms.map(program => {
          return program.id === activeTab ? 
            (
              <span className="tab-item current">
                <a className="tab-link current" href={`#${program.id}`}><strong>{program.name}</strong></a>
              </span>
            ) : (
              <span className="tab-item">
                <a 
                  className="tab-link" 
                  href={`#${program.id}`}
                  onClick={() => {
                    setActiveTab(program.id)
                  }}
                >
                    {program.name}
                </a>
              </span>
            )
        })}
      </div>
    </nav>
  )
}

export default Tabsbar;