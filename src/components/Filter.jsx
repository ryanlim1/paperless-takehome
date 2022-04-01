/* eslint-disable react/prop-types */
import React from "react";

function Filter({ onChange }) {
  return (
    <div id="filter">
      Sort:
      <select onChange={(e) => onChange(e)}>
        <option value="0">Default</option>
        <option value="1">Alphabetically</option>
        <option value="2">By Current Location</option>
      </select>
    </div>
  );
}

export default Filter;
