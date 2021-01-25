// @ts-nocheck
import React, { useEffect , useState} from "react";

const Sidebar: React.FC<sidebarProps> = ({eligibleCenters}) => {

return (
  <nav className="sidebar-container">
    <div>
      <div className="sidebar-title">
        INDEX
      </div>
      <div>
        {eligibleCenters.map(center => 
          <div className="sidebar-item"><a href={`#${center.id}`}>{center.name}</a></div>
        )}
      </div>
    </div>
  </nav>
)}

type sidebarProps = {
  eligibleCenters: Center[]
}

export default Sidebar;