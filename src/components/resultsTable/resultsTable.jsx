import React, { Component } from "react";
import "./resultsTable.css";

class ResultsTable extends Component {
  // state = {  }
  render() {
    const { data } = this.props;
    return (
      <React.Fragment>
        <ul>
          <li className="resultsHeader">
            <div className="destinationHeader">
              <span>Towards</span>
            </div>
            <div className="locationHeader">
              <span>Location</span>
            </div>
            <div className="timeHeader">
              <span>Leaving</span>
            </div>
          </li>
          {data.map((d, i) => (
            <li className="resultItem" key={i}>
              <div className="iconColumn" key={i}>
                <img
                  src={`images/${d.vehicleIcon}`}
                  className="vehicleIcon"
                  alt="vehicle"
                />
              </div>
              <div className="destinationColumn">
                <div className="destinationInfo">
                  <span className="routeInfo">{d.towards}</span>
                  <span className="routeName">
                    {d.lineType} {d.no}
                  </span>
                </div>
              </div>
              <span className="locationColumn">Point {d.stopPoint}</span>
              <span className="timeColumn">{d.date}</span>
            </li>
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default ResultsTable;
