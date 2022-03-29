import React from 'react';
import Button from "./Button";

import Programs from "../../college_search_data/programs.json";

const Modal = ({school, showModal}) => {

  return (
    <div id="modal">
        <div id="modal-header">
            {school.INSTNM}
            <Button text="x" onSubmit={showModal}/>
        </div>
        <div id="modal-info">
            City:{school.CITY}
            <div id="programs-list">
                {school.PROGRAMS.map((program,i) => [
                    <li key={i}>{Programs[program]}</li>
                 ])}
            </div>
        </div>
    </div>
  )
}

export default Modal