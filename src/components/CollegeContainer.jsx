/* eslint-disable react/prop-types */
import React from "react";
import CollegeCard from "./CollegeCard";

function CollegeContainer({ schools, setModal, itemsPerPage, page }) {
  const paginate = () => {
    const start = (page - 1) * itemsPerPage;
    return schools.slice(start, start + itemsPerPage);
  };

  return (
    <div id="container">
      {paginate().map((s, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <CollegeCard school={s} key={i} setModal={setModal} />
      ))}
    </div>
  );
}

export default CollegeContainer;
