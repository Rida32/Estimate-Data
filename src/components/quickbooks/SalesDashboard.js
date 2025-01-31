import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import * as Dashboards from '@highcharts/dashboards';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesDashboard = () => {

  const [salesData, setSalesData] = useState([

    { customerName: 'Customer A', assignedTo: 'John Doe', saleId: '1001', amount: 250, note: 'Sold 10 units of product X.', status: 'Pending' },
    { customerName: 'Customer B', assignedTo: 'Jane Smith', saleId: '1002', amount: 450, note: 'Sold 20 units of product Y.', status: 'Approved' },
    { customerName: 'Customer C', assignedTo: 'John Doe', saleId: '1003', amount: 300, note: 'Sold 15 units of product Z.', status: 'Pending' },
    { customerName: 'Customer D', assignedTo: 'Jane Smith', saleId: '1004', amount: 500, note: 'Sold 25 units of product W.', status: 'Needs Approval' },
    { customerName: 'Customer E', assignedTo: 'John Doe', saleId: '1005', amount: 350, note: 'Sold 12 units of product V.', status: 'Pending' },
  ]);

  const calculateTotals = () => {
    const totalSales = salesData.reduce((sum, sale) => sum + sale.amount, 0);
    const pendingSales = salesData.filter(sale => sale.status === 'Pending').length;
    const approvedSales = salesData.filter(sale => sale.status === 'Approved').length;

    return {
      totalSales,
      pendingSales,
      approvedSales,
    };
  };

  const { totalSales, pendingSales, approvedSales } = calculateTotals();

  const chartData = {
    labels: salesData.map((sale) => sale.customerName),
    datasets: [
      {
        label: 'Amount',
        data: salesData.map((sale) => sale.amount),
        backgroundColor: '#4285F4', 
        borderColor: '#1A73E8',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sales Overview',
      },
    },
  };

  return (
    <>
    <div style={{height:"100%"}}>
    <div className="sales-dashboard">
      <h1>Sales Dashboard</h1>
      <div className="sales-table">
        <table>
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Assigned To</th>
              <th>Sale ID</th>
              <th>Amount</th>
              <th>Note</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((sale, index) => (
              <tr key={index}>
                <td>{sale.customerName}</td>
                <td>{sale.assignedTo}</td>
                <td>{sale.saleId}</td>
                <td>${sale.amount.toFixed(2)}</td>
                <td>{sale.note}</td>
                <td>
                  <span className={`status ${sale.status.toLowerCase().replace(' ', '-')}`}>
                    {sale.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="stats-boxes">
        <div className="stat-box open-sales">
          <h3>{pendingSales}</h3>
          <p>Pending Sales</p>
        </div>
        <div className="stat-box approved-sales">
          <h3>{approvedSales}</h3>
          <p>Approved Sales</p>
        </div>
        <div className="stat-box total-sales">
          <h3>${totalSales.toFixed(2)}</h3>
          <p>Total Sales</p>
        </div>
      </div>
      <div className="sales-graph" style={{ marginTop: '50px', display: 'flex' }}>
          <div style={{ flex: 2 }}>
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div style={{ flex: 1, marginLeft: '20px', marginTop:"80px", }}>
            <div style={{
              background: '#bb6bd9',
              padding: '30px',
              marginBottom: '10px',
              borderRadius: '5px',
              textAlign: 'center',
              color: '#fff',
            }}>
              <h3 style={{ margin: 0 }}>${(totalSales * 1.1).toFixed(2)}</h3>
              <p style={{ margin: 0 }}>Money In (10% increase)</p>
            </div>
            <div style={{
              background: '#58bad7',
              padding: '30px',
              borderRadius: '5px',
              textAlign: 'center',
              color: '#fff',
            }}>
              <h3 style={{ margin: 0 }}>${(totalSales * 0.2).toFixed(2)}</h3>
              <p style={{ margin: 0 }}>Money Out (20% increase)</p>
            </div>
          </div>
        </div>
    </div>
    </div>
    </>
  );
};

export default SalesDashboard;

