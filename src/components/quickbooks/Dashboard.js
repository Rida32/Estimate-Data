import React from 'react'


const data = [
    { label: 'Submitted', value: '136' },
    { label: 'Approved', value: '110' },
    { label: 'Amount Submitted', value: '$507,136.50' },
    { label: 'Amount Approved', value: '$192,615.22' },
    { label: 'Close %', value: '80.88' },
    { label: 'Avg Time to Close', value: '0.00' },
    { label: 'Avg # Days Spent in Approved', value: '0.00' },
    { label: 'Avg # Days in Ready to Invoice', value: '0.00' },
  ];

const Dashboard = () => {

  return (
    <>
         <div className="dashboard">
      <h1>Estimates</h1>
      <div className="kpi-grid">
        {data.map((item, index) => (
          <Card key={index} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
    </>
  )
}

export default Dashboard