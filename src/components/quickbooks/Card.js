import React from 'react'

const Card = ({ label, value }) => {
  return (
   <>
   <div style={{height:"100%"}}>
    <div className="card">
      <div className="icon">
        <i className="fas fa-chart-line"></i>
      </div>
      <div className="content">
        <p className="label">{label}</p>
        <h3 className="value">{value}</h3>
      </div>
    </div>
    </div>
   </>
  )
}

export default Card