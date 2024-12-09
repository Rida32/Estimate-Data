import React, { useState  } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "./AppContext";
import DataPreview from "./DataPreview";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';




const Table = () => {
  const navigate = useNavigate();
  const { estimates, setmainPayload } = useAppData();
  const [isModalOpen, setModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
   
  // const deleteRow = (indexToDelete) => {
  //   estimates.splice(indexToDelete, 1);
  //   setmainPayload([...estimates]);
  // };
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
          <button
            className="back-button mb-3 me-3"
            onClick={() => {
              navigate("/");
            }}
          >
            back
          </button>
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

export default Table;
