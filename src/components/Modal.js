import React from 'react';
import Button from "./Button";

import Programs from "../../college_search_data/programs.json";

const Modal = ({school, showModal}) => {

  return (
    <div id="modal">
        <div id="modal-header">
            <h3>{school.INSTNM}</h3>
            <Button id="modal-button" text="x" onSubmit={showModal}/>
        </div>
        <div id="modal-info">
            <em>City: </em>{school.CITY}
            <div id="programs-list">
                Programs Offered: {school.PROGRAMS.length ? school.PROGRAMS.map((program,i) => [
                    <li key={i}>{Programs[program]} </li>
                 ]) : "-"}
            </div>
        </div>
    </div>
  )
}

export default Modal