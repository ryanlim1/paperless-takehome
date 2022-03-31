import React, { useState } from 'react';
import CollegeCard from './CollegeCard.js';

const  CollegeContainer = ({schools, setModal, itemsPerPage, page}) => {

  const [currSchools, setCurrSchools] = useState([]);

  const paginate = () => {
    const start = (page-1)*itemsPerPage;
    return schools.slice(start, start+itemsPerPage);
  }

  return (
    <div id="container">
      {paginate().map((s,i) => {
        return(
          <CollegeCard school={s} key={i} setModal={setModal}/>)
        })
      }
    </div>
  )
}

export default CollegeContainer;