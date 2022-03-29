import React from 'react'

const CollegeCard = ({school, setModal}) => {
  return (
    <div className="card" onClick={(e)=>setModal(school.INSTNM)}>
        <div className="school-name">
            {school.INSTNM}
        </div>
    </div>
  )
}

export default CollegeCard;