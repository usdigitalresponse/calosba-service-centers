// @ts-nocheck
import React, { useEffect , useState} from "react";

import "./results.scss";

const Tabsbar: React.FC<TabsbarProps> = ({eligibleCenters}) => {
  const [activeTab, setActiveTab] = useState('');

  return (
    <nav id="mobile-tabsbar-container">
      <div className="tabsbar">
        {eligibleCenters.map(center => {
          return center.id === activeTab ? 
            (
              <span className="tab-item current">
                <a className="tab-link current" href={`#${center.id}`}><strong>{center.name}</strong></a>
              </span>
            ) : (
              <span className="tab-item">
                <a 
                  className="tab-link" 
                  href={`#${center.id}`}
                  onClick={() => {
                    setActiveTab(center.id)
                  }}
                >
                    {center.name}
                </a>
              </span>
            )
        })}
      </div>
    </nav>
  )
}

type TabsbarProps = {
  eligibleCenters: Center[]
}

export default Tabsbar;