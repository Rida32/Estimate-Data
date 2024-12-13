import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "./AppContext";

const CustomerRecord = () => {
  const navigate = useNavigate();
  const { customers, setCustomers } = useAppData();

  return (
    <>
      <div style={{ height: "100%" }}>
        <div className="record-container">
          <div>
            <div
              className="Record"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: "25px",
              }}
            >
              <h2 style={{ fontSize: "25px", margin: 0, fontWeight: "bold" }}>
                Customer Record
              </h2>
              <button
                className="customer-btn"
                onClick={() => {
                  navigate("/customers");
                }}
              >
                + Add Customer
              </button>
            </div>
            <div className="customer-table">
              <table className="customertab">
                <thead>
                  <tr className="customer-row ">
                    <th className="customer-header col-1 justify-content-left">
                      ID
                    </th>
                    <th className="customer-header col-4">Customers Name</th>
                    <th className="customer-header col-6">Contact Email</th>
                    <th className="customer-header col-1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer, index) => {
                    return (
                      <tr key={index}>
                        <td>{index} </td>
                        <td>{customer.CustomerName} </td>
                        <td>{customer.email} </td>
                        <td></td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerRecord;
