import React from "react";
import "./fromTextInput.css";

const FromTextInput = ({ label, value, onChange }) => {
  return (
    <React.Fragment>
      <label htmlFor="fromInp" className="fromInp">
        <input
          type="text"
          id="fromInp"
          placeholder="&nbsp;"
          autoComplete="off"
          value={value}
          onChange={onChange}
        />
        <span className="label">{label}</span>
        <span className="border" />
      </label>
    </React.Fragment>
  );
};

export default FromTextInput;
