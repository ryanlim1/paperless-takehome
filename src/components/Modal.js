import React from 'react';
import Button from "./Button";

import Programs from "../../college_search_data/programs.json";

const Modal = ({school, showModal}) => {

  const convertDecimal = (num) => {
    return parseFloat(num)*100;
  }

  const getURL = () => {
    return `http://${school.INSTURL}`;
  }

  return (
    <div id="modal">
        <div id="modal-header">
            <h3>{school.INSTNM}</h3>
            <Button id="modal-button" text="x" onSubmit={showModal}/>
        </div>
        <div id="modal-info">
            <span><b>City: </b>{school.CITY}</span>
            <span><b>Zip Code: </b>{school.ZIP}</span>
            <span><b>Admissions Rate: </b>{school.ADM_RATE !=="NULL" ? convertDecimal(school.ADM_RATE).toFixed(2)+"%" : "Not reported"}</span>
            <span><b>SAT Average: </b>{school.SAT_AVG !== "NULL" ? school.SAT_AVG : "Not reported"}</span>
            <span><b>Website: </b>{school.INSTURL !== "NULL" ? <a href={getURL()} >{school.INSTURL}</a> : "None"}</span>
            <br></br>
            <div id="programs-list">
                <b>Programs Offered:</b> {school.PROGRAMS.length ? <ul id={school.PROGRAMS.length === 1 ? "single-column" : "double-column"}> {school.PROGRAMS.map((program,i) => (
                  <li key={i}> {"- " + Programs[program]} </li>))} </ul> : "-"}
            </div>
        </div>
    </div>
  )
}

export default Modal