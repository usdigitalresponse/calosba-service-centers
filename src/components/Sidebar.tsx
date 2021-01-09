// @ts-nocheck
import React, { useEffect , useState} from "react";

const Sidebar: React.FC = (props) => {

return (
  <nav className="sidebar-container">
    <div>
      <div className="sidebar-title">
        INDEX
      </div>
      <div>
        {props.centers.map(center => 
          <div className="sidebar-item"><a href={`#${center.Id}`}>{center.CenterName}</a></div>
        )}
      </div>
    </div>
  </nav>
)}

export default Sidebar;