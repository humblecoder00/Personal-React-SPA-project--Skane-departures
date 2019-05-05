import React from "react";
import "./loadingInfo.css";

const LoadingInfo = props => {
  const { loadingText } = props;
  return (
    <React.Fragment>
      <div className="distanceArea">
        <p className="loading">{loadingText}</p>
      </div>
    </React.Fragment>
  );
};

export default LoadingInfo;
