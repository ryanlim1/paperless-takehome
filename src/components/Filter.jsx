/* eslint-disable react/prop-types */
import React from "react";

function Filter({ onChange, latitude }) {
  return (
    <div id="filter">
      Sort:
      <select onChange={(e) => onChange(e)}>
        <option value="0">Default</option>
        <option value="1">Alphabetically</option>
        {latitude ? <option value="2">By Current Location</option> : null}
      </select>
    </div>
  );
}

export default Filter;
