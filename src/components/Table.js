import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "./AppContext";
import DataPreview from "./DataPreview";


const Table = () => {
  const navigate = useNavigate();
  const { estimates, setmainPayload } = useAppData();

  return (
    <>
      <div style={{height:"100%"}}>
        <div className="data-form-container" >
          <h2>Estimate Details</h2>
          <button className="button-add d-flex flex-column justify-content-end endtext-end align-items"
            onClick={() => {
              navigate("/");
            }}
          >
            Add
          </button>
          <div className="table-responsive">
            <table className="estimate table table-bordered">
              <thead>
                <tr className="table-row">
                  <th className="table-header">Customers</th>
                  <th className="table-header">Estimate No</th>
                  <th className="table-header">Tags</th>
                  <th className="table-header">Approved Date</th>
                  <th className="table-header">Date</th>
                  <th className="table-header">Contact</th>
                  <th className="table-header">Status</th>
                </tr>
              </thead>
              <tbody>
                {estimates.map((estimates, index) => (
                  <tr className="table-cell"
                    key={index}
                    onClick={() => {
                      setmainPayload(estimates);navigate("/dataPreview");
                    }}
                  >
                    <td>{estimates.formData?.customers}</td>
                    <td>{estimates.formData?.estimateNo}</td>
                    <td>{estimates.formData?.tags}</td>
                    <td>{estimates.formData?.approvedDate}</td>
                    <td>{estimates.formData?.date}</td>
                    <td>{estimates.formData?.contact}</td>
                    <td>{estimates.formData?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <button
            className="back-button button d-flex flex-column justify-content-end endtext-end align-items"
            onClick={() => {
              navigate("/");
            }}
          >
            back
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;
