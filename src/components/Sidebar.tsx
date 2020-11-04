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
        {props.eligiblePrograms.map(program => 
          <div className="sidebar-item"><a href={`#${program.id}`}>{program.name}</a></div>
        )}
      </div>
    </div>
  </nav>
)}

export default Sidebar;