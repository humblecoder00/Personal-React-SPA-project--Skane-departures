import "flatpickr/dist/themes/material_red.css";
import React, { Component } from "react";
import Flatpickr from "react-flatpickr";
import "./datePicker.css";

class DatePicker extends Component {
  render() {
    const {
      date,
      time,
      onDatePick,
      onTimePick,
      onTimeOpen,
      dateError,
      timeError
    } = this.props;
    return (
      <React.Fragment>
        <div>
          <Flatpickr
            value={date}
            onChange={onDatePick}
            options={{
              dateFormat: "Y-m-d",
              minDate: "today",
              defaultDate: "today",
              disableMobile: "true",
              altInput: true,
              altFormat: "F j, Y"
            }}
            placeholder="Select Date.."
          />
        </div>
        {dateError && <div className="validationError">{dateError}</div>}
        <div>
          <Flatpickr
            value={time}
            onChange={onTimePick}
            options={{
              enableTime: true,
              noCalendar: true,
              dateFormat: "H:i",
              disableMobile: "true"
            }}
            placeholder="Select Time.."
            onOpen={onTimeOpen}
          />
        </div>
        {timeError && <div className="validationError">{timeError}</div>}
      </React.Fragment>
    );
  }
}

export default DatePicker;
