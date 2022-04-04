/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from "react";
// import { parse } from "csv-parse";

import Button from "./Button";

import Programs from "../../college_search_data/programs.json";

function DetailedCard({ school, showDetailedCard, csvData }) {
  const convertDecimal = (num) => parseFloat(num) * 100;

  const getURL = () => `https://${school.INSTURL}`;

  return (
    <div id="detailed-card">
      <div id="detailed-card-header">
        <h3>{school.INSTNM}</h3>
        <Button
          id="detailed-card-button"
          text="x"
          onSubmit={showDetailedCard}
        />
      </div>
      <div id="detailed-card-info">
        <span>
          <b>City: </b>
          {school.CITY}
        </span>
        <span>
          <b>Zip Code: </b>
          {school.ZIP}
        </span>
        <span>
          <b>Admissions Rate: </b>
          {school.ADM_RATE !== "NULL"
            ? `${convertDecimal(school.ADM_RATE).toFixed(2)}%`
            : "Not reported"}
        </span>
        <span>
          <b>SAT Average: </b>
          {school.SAT_AVG !== "NULL" ? school.SAT_AVG : "Not reported"}
        </span>
        <br />
        <span>
          <b>Website: </b>
          {school.INSTURL !== "NULL" ? (
            <a href={getURL()}>{school.INSTURL}</a>
          ) : (
            "None"
          )}
        </span>
        <br />
        <div id="programs-list">
          <b>Programs Offered:</b>{" "}
          {school.PROGRAMS.length ? (
            <ul
              id={
                school.PROGRAMS.length === 1 ? "single-column" : "double-column"
              }
            >
              {" "}
              {school.PROGRAMS.map((program, i) => (
                <li key={i}> {`- ${Programs[program]}`} </li>
              ))}{" "}
            </ul>
          ) : (
            "-"
          )}
        </div>
        <br />
        <span>
          <b>Highest Degree Awarded: </b>
          <div>{csvData.HIGHDEGREE[school.HIGHDEG]}</div>
        </span>
        <br />
        <span>
          <b>Locale of Institution: </b>
          <div>{csvData.LOCALE[school.LOCALE]}</div>
        </span>
        <br />
        <span>
          <b>Carnegie Classification: </b>
          <div>{csvData.CCSIZSET[school.CCSIZSET]}</div>
        </span>
      </div>
    </div>
  );
}

export default DetailedCard;
