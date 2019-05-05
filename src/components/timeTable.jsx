import React, { Component } from "react";
import axios from "axios";
import { xmlToJson, nearestToJson, listDepartures } from "./../utils/xmlToJson";
import AutoCompleteList from "./common/autoCompTextInput/autoCompTextInput";
import InputLoader from "./common/loader/loader";
import CrossIcon from "./common/crossIcon/crossIcon";
import DatePicker from "./common/datePicker/datePicker";
import FromTextInput from "./common/fromTextInput/fromTextInput";
import ButtonCustom from "./common/customButton/customButton";
import ResultsTable from "./resultsTable/resultsTable";
import DistanceInfo from "./distanceInfo/distanceInfo";
import Pagination from "./common/pagination/pagination";
import { paginate } from "./../utils/paginate";
import LoadingInfo from "./common/loadingInfo/loadingInfo";
import "./timeTable.css";

class TimeTable extends Component {
  state = {
    currentPage: 1,
    pageSize: 10,
    from: "",
    fromQuery: { id: "", name: "", x: "", y: "" },
    fromDistance: { id: "", stationName: "", distance: "" },
    date: "",
    time: "",
    fromPlaces: [],
    finalQuery: {
      id: "",
      date: "",
      time: ""
    },
    errors: {},
    departures: [],
    fromLoader: false,
    departuresLoader: false,
    fromTextCleaner: false
  };

  // Fetch from stations:
  async callFromApi(query) {
    const response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://www.labs.skanetrafiken.se/v2.2/querypage.asp?inpPointfr=${query}&inpPointTo=ystad`
    );
    const fromPlaces = xmlToJson(response);
    this.setState({ fromPlaces, fromLoader: false });
  }

  // Calculate distance to nearest station from start point:
  async fromDistanceApi(x, y) {
    const nearest = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://www.labs.skanetrafiken.se/v2.2/neareststation.asp?x=${x}&y=${y}&Radius=1000`
    );

    const fromDistance = await nearestToJson(nearest);
    this.setState({
      fromDistance,
      finalQuery: {
        id: fromDistance.id,
        date: this.state.date,
        time: this.state.time
      }
    });

    this.stationDepartures(
      this.state.finalQuery.id,
      this.state.finalQuery.date,
      this.state.finalQuery.time
    );
    return fromDistance;
  }

  async stationDepartures(stationId, date, time) {
    const departure = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://www.labs.skanetrafiken.se/v2.2/stationresults.asp?selPointFrKey=${stationId}&inpDate=${date}&inpTime=${time}&selDirection=1`
    );

    const departures = listDepartures(departure);
    this.setState({ departures, departuresLoader: false });
  }

  // Handling form events:

  handleFromInput = e => {
    // catch the input value:
    let input = e.target.value;

    // clear the timeout if it has been already set:
    clearTimeout(this.timer);

    // set the state with input:
    this.setState({ from: input });

    // set a new timeout for debouncing:
    this.timer = setTimeout(() => {
      // if input area is not empty, call the API:
      // if (this.state.from) this.callApi(this.state.from.toLowerCase());
      this.state.from.length > 0
        ? this.callFromApi(this.state.from.toLowerCase()) &&
          this.setState({ fromLoader: true, fromTextCleaner: false }) // if query is set, send parameter
        : this.setState({ fromPlaces: [], fromLoader: false }); // if query is empty, clean the search result
    }, 300);
  };

  // Select from station handler:
  handleFromSelection = e => {
    // Take the text
    // Set it to Textbox (state.from)
    // Set the places to zero [] (state.places)
    let selected = e;

    // Set the parameters:
    this.setState({
      from: selected.name,
      fromQuery: selected,
      fromPlaces: [],
      fromTextCleaner: true
    });
  };

  handleFromTextCleaner = () => {
    this.setState({ from: "", fromTextCleaner: false });
  };

  async handleMapping(fromX, fromY) {
    await this.fromDistanceApi(fromX, fromY);
    this.setState({ departuresLoader: true });
  }

  handleDatePick = val => {
    let pickedDate = new Date(val);
    let timezoneOffset = pickedDate.getTimezoneOffset() * 60000;
    let correctDate = new Date(pickedDate.getTime() - timezoneOffset);
    let date = JSON.stringify(correctDate);
    date = date.slice(1, 11);
    this.setState({ date });
  };

  handleTimePick = val => {
    let pickedTime = new Date(val);
    let timezoneOffset = pickedTime.getTimezoneOffset() * 60000;
    let correctTime = new Date(pickedTime.getTime() - timezoneOffset);
    let time = JSON.stringify(correctTime);
    time = time.slice(12, 17);
    this.setState({ time });
  };

  handleTimeOpen = () => {
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let time = hour + ":" + min;
    this.setState({ time });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleFormValidation = () => {
    const errors = {};

    const { from, date, time } = this.state;

    if (from.trim() === "") errors.from = "Starting Point is required.";
    if (date.trim() === "") errors.date = "Date is required.";
    if (time.trim() === "") errors.time = "Time is required.";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const errors = this.handleFormValidation();
    this.setState({ errors: errors || {} });
    if (errors) return;

    const fromX = this.state.fromQuery.x;
    const fromY = this.state.fromQuery.y;
    this.handleMapping(fromX, fromY);
  };

  render() {
    const {
      from,
      fromPlaces,
      fromDistance,
      departures,
      departuresLoader,
      fromLoader,
      fromTextCleaner,
      errors,
      date,
      time,
      pageSize,
      currentPage
    } = this.state;

    // const { totalCount } = this.getPagedData();
    const count = departures.length;
    const paginatedDepartures = paginate(departures, currentPage, pageSize);

    return (
      <React.Fragment>
        <div className="mainContainer">
          <form className="queryArea" onSubmit={this.handleFormSubmit}>
            <div className="queryHeader">
              <h3>Transport Departures in Skåne</h3>
            </div>
            <div className="queryItem1">
              <div className="textInput">
                <FromTextInput
                  label="Select Starting Point.."
                  value={from}
                  onChange={this.handleFromInput}
                />

                {fromLoader === true ? (
                  <span>
                    <InputLoader />
                  </span>
                ) : null}
                {fromTextCleaner === true ? (
                  <span>
                    <CrossIcon textCleaner={this.handleFromTextCleaner} />
                  </span>
                ) : null}
              </div>
            </div>
            <AutoCompleteList
              data={fromPlaces}
              clickedSelection={this.handleFromSelection}
            />
            {errors.from && (
              <div className="validationError">{errors.from}</div>
            )}
            <div className="queryItem2">
              <DatePicker
                date={date}
                time={time}
                onDatePick={this.handleDatePick}
                onTimePick={this.handleTimePick}
                onTimeOpen={this.handleTimeOpen}
                dateError={errors.date}
                timeError={errors.time}
              />
            </div>
            <div className="queryItem3">
              <ButtonCustom label="Calculate" />
            </div>
          </form>

          {fromDistance.distance !== "0 meters" &&
          fromDistance.distance !== "" ? (
            <div className="distanceArea">
              <DistanceInfo data={fromDistance} />
            </div>
          ) : null}
          {departuresLoader === true ? (
            <React.Fragment>
              <LoadingInfo loadingText="Getting the departure data" />
            </React.Fragment>
          ) : null}
          {departures.length !== 0 ? (
            <React.Fragment>
              <div className="resultArea">
                <ResultsTable data={paginatedDepartures} />
              </div>
              <div className="paginationArea">
                <Pagination
                  itemsCount={count}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </React.Fragment>
          ) : null}
        </div>
      </React.Fragment>
    );
  }
}

export default TimeTable;
