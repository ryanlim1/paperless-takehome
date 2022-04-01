import React, {useState, useEffect} from 'react';
import CollegeContainer from './CollegeContainer.js';
import Filter from "./Filter.js";
import Button from "./Button.js";
import Modal from "./Modal.js";

import Schools from "../../college_search_data/ma_schools.json";

const App = () => {

    const itemsPerPage = 5;

    const [location, setLocation] = useState({})
    const [allSchools, setAllSchools] = useState([]);
    const [page, setPage] = useState(0);
    const [isShowModal, setShowModal] = useState(false);
    const [currModal, setCurrModal] = useState({});


    // renders on component mount to DOM
    useEffect(async () => {
        setAllSchools([...Schools]);
        const position =  await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords
        setLocation({
            latitude, 
            longitude
        })
    }, []);

    // sort schools alphabetically
    const sortAlpha = () => {
        // creating a new sortedArr var to store school alphabetically by name
        const sortedArr = [...allSchools].sort((a,b) => {
            return a.INSTNM.localeCompare(b.INSTNM);
        });
        setAllSchools([...sortedArr]);
    }

    // sort by location of user
    async function sortLocation() {
        const sortedArr = [...allSchools].sort((a,b) => {
            // sort by distance formula from school to user location
            return Math.sqrt(Math.pow(a.LATITUDE - location.latitude, 2) + Math.pow(a.LONGITUDE - location.longitude, 2)) - Math.sqrt(Math.pow(b.LATITUDE - location.latitude, 2) + Math.pow(b.LONGITUDE - location.longitude, 2));
        });
        setAllSchools([...sortedArr]);
    }

    const onFilterChange = (e) => {
        e.preventDefault();
        if(e.target.value==="0"){
            setAllSchools([...Schools]);
        }
        else if(e.target.value==="1"){
            sortAlpha();
        }
        else if(e.target.value==="2"){
            sortLocation();
        }
    }

    const decrementPage = () => {
        const newPage = page - 1;
        if(newPage===-1){
            return;
        }
        setPage(newPage);
    }
    

    const incrementPage = () => {
        const newPage = page+1;
        if(newPage === Math.ceil(allSchools.length/itemsPerPage+1)){
            return;
        }
        setPage(newPage);
    }

    const showModal = () => {
        setShowModal(!isShowModal);
    }

    const setModal = (school) => {
        if(!isShowModal){
            showModal();
        }
        for(let i = 0; i < allSchools.length; i++){
            if(school === allSchools[i].INSTNM){
                setCurrModal(allSchools[i])
            }
        }
    }

    return(
        <div>
            <h1>Colleges and Universities in Massachusetts</h1>
            <Filter onChange={onFilterChange}/>
            {!page && <div className="toggle-page">
                <Button text="<" onSubmit={decrementPage}/>
                {!page ? "0" : page}
                <Button text=">" onSubmit={incrementPage}/>
            </div>}
            {page ? <CollegeContainer schools={allSchools} setModal={setModal} itemsPerPage={itemsPerPage} page={page}/> : <ul> {allSchools.map((school, i) => (
                <li key={i}>{school.INSTNM}</li>))} </ul>}
            <div className="toggle-page">
                <Button text="<" onSubmit={decrementPage}/>
                {!page ? "0" : page}
                <Button text=">" onSubmit={incrementPage}/>
            </div>
            {isShowModal && page ? <Modal school={currModal} showModal={showModal}/> : null}
        </div>

    )
}

export default App;