/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from "react";

function CollegeCard({ school, setDetailedCard }) {
  return (
    <div className="card" onClick={() => setDetailedCard(school.INSTNM)}>
      <div className="school-name">{school.INSTNM}</div>
    </div>
  );
}

export default CollegeCard;
