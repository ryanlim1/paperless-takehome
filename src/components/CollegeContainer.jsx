/* eslint-disable react/prop-types */
import React from "react";
import { v4 as uuidv4 } from "uuid";

import CollegeCard from "./CollegeCard";

function CollegeContainer({ schools, setDetailedCard, itemsPerPage, page }) {
  const paginate = () => {
    const start = (page - 1) * itemsPerPage;
    return schools.slice(start, start + itemsPerPage);
  };

  return (
    <div id="container">
      {paginate().map((s) => (
        <CollegeCard
          school={s}
          key={uuidv4()}
          setDetailedCard={setDetailedCard}
        />
      ))}
    </div>
  );
}

export default CollegeContainer;
