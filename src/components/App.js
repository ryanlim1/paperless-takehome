import React, {useState, useEffect} from 'react';
import CollegeContainer from './CollegeContainer.js';
import Filter from "./Filter.js";
import Button from "./Button.js";
import Modal from "./Modal.js";

import Schools from "../../college_search_data/ma_schools.json";

const App = () => {

    const [allSchools, setAllSchools] = useState([]);
    const [currSchools, setCurrSchools] = useState([]);
    const [page, setPage] = useState(0);
    const [isShowModal, setShowModal] = useState(false);
    const [currModal, setCurrModal] = useState({})

    // renders on component mount to DOM
    useEffect(() => {
        setAllSchools([...Schools]);
    }, []);

    const itemsPerPage = 5;

    const paginate = (page) => {
        const start = (page-1)*itemsPerPage;
        return allSchools.slice(start, start+itemsPerPage);
    }

    // sort schools alphabetically
    const sortAlpha = () => {
        // creating a new sortedArr var to store school alphabetically by name
        const sortedArr = [...allSchools].sort((a,b) => {
            return a.INSTNM.localeCompare(b.INSTNM);
        });
        setCurrSchools([...paginate(sortedArr)]);
        setAllSchools([...sortedArr]);
    }

    // sort by location of user
    const sortLocation = () => {
        
    }

    const onFilterChange = (e) => {
        e.preventDefault();
        if(e.target.value==="0"){
            setAllSchools([...Schools]);
            setCurrSchools([...paginate(Schools)]);
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
        setCurrSchools([...paginate(newPage)]);
    }
    

    const incrementPage = () => {
        const newPage = page+1;
        if(newPage === Math.ceil(allSchools.length/itemsPerPage+1)){
            return;
        }
        setPage(newPage);
        setCurrSchools([...paginate(newPage)]);
    }

    const showModal = () => {
        setShowModal(!isShowModal);
    }

    const setModal = (school) => {
        if(!isShowModal){
            showModal();
        }
        for(let i = 0; i < itemsPerPage; i++){
            if(school === currSchools[i].INSTNM){
                setCurrModal(currSchools[i]);
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
            {isShowModal && page ? <Modal school={currModal} showModal={showModal}/> : null}
            {page ? <CollegeContainer schools={currSchools} setModal={setModal}/> : <ul> {allSchools.map((school, i) => (
                <li key={i}>{school.INSTNM}</li>))} </ul>}
            <div className="toggle-page">
                <Button text="<" onSubmit={decrementPage}/>
                {!page ? "0" : page}
                <Button text=">" onSubmit={incrementPage}/>
            </div>
        </div>

    )
}

export default App;