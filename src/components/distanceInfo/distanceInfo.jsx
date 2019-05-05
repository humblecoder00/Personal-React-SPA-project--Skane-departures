import React from "react";
import "./distanceInfo.css";

const DistanceInfo = ({ data }) => {
  return (
    <React.Fragment>
      <div className="distanceHeader">
        <span>
          <div className="distanceIconColumn">
            <img src="images/walk.jpg" className="distanceIcon" alt="walk" />
          </div>
        </span>
        <div className="stationColumn">
          <div className="distanceInfo">
            <span className="inlineHeading">Closest Station:</span>
            <span className="inlineText">{data.name}</span>
          </div>
        </div>
        <div className="distanceMetersColumn">
          <div className="distanceInfo">
            <span className="inlineHeading">Distance:</span>
            <span className="inlineText">{data.distance}</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DistanceInfo;
