import React from 'react';
import CollegeCard from './CollegeCard.js';

const  CollegeContainer = ({schools, setModal}) => {
  return (
    <div id="container">
      {schools.map((s,i) => {
        return(
          <CollegeCard school={s} key={i} setModal={setModal}/>)
        })
      }
    </div>
  )
}

export default CollegeContainer;