import React from "react";
import "./customButton.css";

const ButtonCustom = ({ label }) => {
  return (
    <React.Fragment>
      <button className="btn fourth">{label}</button>
    </React.Fragment>
  );
};

export default ButtonCustom;
