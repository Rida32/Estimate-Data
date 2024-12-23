import React, { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "./AppContext";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CustomButton from './CustomButton';
import EditIcon from "@mui/icons-material/Edit";





const Estimates = () => {
  const navigate = useNavigate();
  const { estimates, setmainPayload, estimateData, setEstimateData } = useAppData();
  const [isModalOpen, setModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
   

  const handleDeleteClick = (index) => {
    setRowToDelete(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setRowToDelete(null);
  };

  const confirmDelete = () => {
    if (rowToDelete !== null) {
      estimates.splice(rowToDelete, 1);
      setmainPayload([...estimates]);
    }
    closeModal();
  };

  const handleEditClick = (row) => {
    setEstimateData(row); // Set the selected row data to AppContext
    navigate("/estimates/add"); // Navigate to the form page
  };
  
  return (
    <>
      <div style={{ height: "100%" }}>
        <div className="data-form-container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginLeft: "25px" }}>
         <h2 style={{ fontSize: "25px", margin: 0, fontWeight:"bold", }}>Estimate</h2>
         <CustomButton className="button-add btn"
            onClick={() => {navigate("/estimates/add");}}>
              Add
         </CustomButton>
        </div>
          <div className="table-responsive">
            <table className="estimate table table-bordered">
              <thead>
                <tr className="table-row">
                  <th className="table-header">ID</th>
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
                {estimates.map((row, index) => (
                  <tr key={index}>
                  <td  className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>
                    {row.id}</td>
                    <td  className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>
                    {row.formData?.customers}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>{row.formData?.estimateNo}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>{row.formData?.tags}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>{row.formData?.approvedDate}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>{row.formData?.date}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>{row.formData?.contact}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>{row.formData?.status}</td>


                   <td className="d-flex justify-content-between align-items-center">
                      <IconButton className="delete-button"
                        onClick={() => handleEditClick(row)}>
                      <EditIcon style={{ color: "blue", fontSize: 24 }}/>
                      </IconButton>
                      <IconButton className="delete-button"
                         onClick={() => handleDeleteClick(index)}>
                      <DeleteIcon style={{ color: 'red', fontSize: 24 }}/>
                       </IconButton>
                   </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className=" d-flex justify-content-end endtext-end align-items-end" style={{ height: '75vh' }}>
          <CustomButton
            className="back-button mb-3 me-3"
            onClick={() => {
              navigate("/");
            }}
          >
            back
          </CustomButton>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default Estimates;
