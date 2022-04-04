import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import CollegeContainer from "./CollegeContainer";
import Filter from "./Filter";
import Button from "./Button";
import DetailedCard from "./DetailedCard";

import Schools from "../../college_search_data/ma_schools.json";

function App() {
  const itemsPerPage = 5;

  const [csvData, setCsvData] = useState({});
  const [location, setLocation] = useState({});
  const [allSchools, setAllSchools] = useState([]);
  const [page, setPage] = useState(0);
  const [showingDetailedCard, setShowingDetailedCard] = useState(false);
  const [currDetailedCard, setCurrDetailedCard] = useState({});

  useEffect(async () => {
    fetch("http://localhost:3000/")
      .then((res) => res.json())
      .then((data) => {
        setCsvData({ ...data });
      });

    setAllSchools([...Schools]);

    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
    const { latitude, longitude } = position.coords;
    setLocation({
      latitude,
      longitude,
    });
  }, []);

  // sort schools alphabetically
  const sortAlphabetically = () => {
    // creating a new sortedArr var to store school alphabetically by name
    const sortedArr = [...allSchools].sort((a, b) =>
      a.INSTNM.localeCompare(b.INSTNM)
    );
    setAllSchools([...sortedArr]);
  };

  // sort by location of user
  const sortLocation = () => {
    const sortedArr = [...allSchools].sort(
      (a, b) =>
        // sort by distance formula from school to user location
        Math.sqrt(
          (a.LATITUDE - location.latitude) ** 2 +
            (a.LONGITUDE - location.longitude) ** 2
        ) -
        Math.sqrt(
          (b.LATITUDE - location.latitude) ** 2 +
            (b.LONGITUDE - location.longitude) ** 2
        )
    );
    setAllSchools([...sortedArr]);
  };

  const onFilterChange = (e) => {
    e.preventDefault();
    if (e.target.value === "0") {
      setAllSchools([...Schools]);
    } else if (e.target.value === "1") {
      sortAlphabetically();
    } else if (e.target.value === "2") {
      sortLocation();
    }
  };

  const decrementPage = () => {
    const newPage = page - 1;
    if (newPage === -1) {
      return;
    }
    setPage(newPage);
  };

  const incrementPage = () => {
    const newPage = page + 1;
    if (newPage === Math.ceil(allSchools.length / itemsPerPage + 1)) {
      return;
    }
    setPage(newPage);
  };

  const showDetailedCard = () => {
    setShowingDetailedCard(!showingDetailedCard);
  };

  const setDetailedCard = (school) => {
    if (!showingDetailedCard) {
      showDetailedCard();
    }
    for (let i = 0; i < allSchools.length; i += 1) {
      if (school === allSchools[i].INSTNM) {
        setCurrDetailedCard(allSchools[i]);
      }
    }
  };

  return (
    <div>
      <h1>Colleges and Universities in Massachusetts</h1>
      <Filter onChange={onFilterChange} latitude={location.latitude} />
      {!page && (
        <div className="toggle-page">
          <Button text="<" onSubmit={decrementPage} />
          {page}
          <Button text=">" onSubmit={incrementPage} />
        </div>
      )}
      {page ? (
        <CollegeContainer
          schools={allSchools}
          setDetailedCard={setDetailedCard}
          itemsPerPage={itemsPerPage}
          page={page}
        />
      ) : (
        <ul id="college-static-list">
          {allSchools.map((school) => (
            <li key={uuidv4()}>{school.INSTNM}</li>
          ))}
        </ul>
      )}
      <div className="toggle-page">
        <Button text="<" onSubmit={decrementPage} />
        {page}
        <Button text=">" onSubmit={incrementPage} />
      </div>
      {showingDetailedCard && page ? (
        <DetailedCard
          school={currDetailedCard}
          showDetailedCard={showDetailedCard}
          csvData={csvData}
        />
      ) : null}
    </div>
  );
}

export default App;
