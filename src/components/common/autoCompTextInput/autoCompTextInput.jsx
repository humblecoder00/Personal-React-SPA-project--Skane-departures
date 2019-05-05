import React, { Component } from "react";
import "./autoCompTextInput.css";

class AutoCompleteList extends Component {
  // state = {  }
  render() {
    const { data } = this.props;

    return (
      <ul className="q-autocomplete">
        {data.map((list, index) => (
          <li
            key={index}
            onClick={() =>
              this.props.clickedSelection({
                id: list.id,
                name: list.name,
                x: list.x,
                y: list.y
              })
            }
          >
            <span>{list.name}</span>
            <i>{list.type}</i>
          </li>
        ))}
      </ul>
    );
  }
}

export default AutoCompleteList;
