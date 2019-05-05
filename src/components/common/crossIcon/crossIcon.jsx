import React, { Component } from "react";
import "./crossIcon.css";

class CrossIcon extends Component {
  render() {
    return (
      <span
        className="cross-container"
        onClick={() => this.props.textCleaner()}
      >
        <i className="close warp thick" />
      </span>
    );
  }
}

export default CrossIcon;
