import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "./AppContext";
import DataPreview from "./DataPreview";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const Table = () => {
  const navigate = useNavigate();
  const { estimates, setmainPayload } = useAppData();
   
  const deleteRow = (indexToDelete) => {
    estimates.splice(indexToDelete, 1);
    setmainPayload([...estimates]);
  };
  
  return (
    <>
      <div style={{ height: "100%" }}>
        <div className="data-form-container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginLeft: "25px" }}>
         <h2 style={{ fontSize: "25px", margin: 0, fontWeight:"bold", }}>Estimate</h2>
         <button className="button-add btn"
            onClick={() => {navigate("/form");}}>
              Add
         </button>
        </div>
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
                  <th className="table-header">Action</th>
                </tr>
              </thead>
              <tbody>
                {estimates.map((estimates, index) => (
                  <tr>
                    <td  className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(estimates);navigate("/dataPreview");}}>
                    {estimates.formData?.customers}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(estimates);navigate("/dataPreview");}}>{estimates.formData?.estimateNo}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(estimates);navigate("/dataPreview");}}>{estimates.formData?.tags}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(estimates);navigate("/dataPreview");}}>{estimates.formData?.approvedDate}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(estimates);navigate("/dataPreview");}}>{estimates.formData?.date}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(estimates);navigate("/dataPreview");}}>{estimates.formData?.contact}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(estimates);navigate("/dataPreview");}}>{estimates.formData?.status}</td>
                    <td>
                    <IconButton
                            className="delete-button d-flex flex-column justify-content-center"
                            onClick={() => deleteRow(index)}>
                            <DeleteIcon style={{ color: 'red', fontSize: 24 }}/>
                    </IconButton>

                        </td>
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
