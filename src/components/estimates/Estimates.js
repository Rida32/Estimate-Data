import React, { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../AppContext";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '../CustomButton';
import useAPiAuth from "../hooks/useApiAuth";
import { formatDateToCustomString } from "../Utils";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from "@mui/icons-material/Edit";
import DialogContentText from '@mui/material/DialogContentText';



const Estimates = () => {
  const navigate = useNavigate();
  const {  setmainPayload,  } = useAppData();
  const [estimates, setEstimates] = useState([]);
  const { getData } = useAPiAuth();
  const [isEditModalOpen, setEditModalOpen] = useState(false); 
  const [editRowData, setEditRowData] = useState(null);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const {setSnackbar} =useAppData();
  // const [rowToDelete, setRowToDelete] = useState(null);
  // const [estimateData, setEstimateData] =useState([]);

  // const handleDeleteClick = (index) => {
  //   setRowToDelete(index);
  //   setModalOpen(true);
  // };

  // const closeModal = () => {
  //   setModalOpen(false);
  //   setRowToDelete(null);
  // };

  // const confirmDelete = () => {
  //   if (rowToDelete !== null) {
  //     estimates.splice(rowToDelete, 1);
  //     setmainPayload([...estimates]);
  //   }
  //   closeModal();
  // };

  // const handleEditClick = (row) => {
  //   setEstimateData(row); 
  //   navigate("/estimates/add"); 
  // };

  
  const getUser = () => {
    
    getData(
      `/estimates/get-all`,
      (data)=>{
        console.log("test", data);
        setEstimates(data.data);
      },
      (error) => {
        console.error("user error:", error);
      },
    );
  };
  useEffect(() => {
      getUser(); 

  }, []);

  const handleEditClick = (row) => {
    setEditRowData({ ...row }); 
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (editRowData) {
      const updatedEstimates = estimates.map((row) =>
        row.id === editRowData.id ? editRowData : row
      );
      setEstimates(updatedEstimates); 
    }
    setEditModalOpen(false); 
  };
  const closeModal = () => {
    setModalOpen(false);
    setRowToDelete(null);
  };
  
  const confirmDelete = () => {
    if (rowToDelete !== null) {
      getData(
        `/estimates/delete-estimate/${rowToDelete}`, 
        () => {
          setSnackbar("Estimates deleted successfully!", "success");
          setRowToDelete(null);
          getUser();
          closeModal(); 
        },
        (error) => {
          setSnackbar("Failed to delete estimates. Please try again.", "error");
          console.error("Error deleting estimates:", error);
        }
      );
    }
    
  };

  
  return (
    <>
      <div style={{ height: "100%" }}>
        <div className="data-form-container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginLeft: "25px" }}>
         <h2 style={{ fontSize: "25px", margin: 0, fontWeight:"bold", }}>Estimates</h2>
         <CustomButton className="button-add btn"
            onClick={() => {navigate("/estimates/add");}}>
              Add
         </CustomButton>
        </div>
        <div className="customer-table">
          <div className="table-responsive">
            <table
            className="customertab "
            //  className="estimate table table-bordered" 
             >
              <thead >
                <tr className="customer-row">
                  <th className="customer-header">ID</th>
                  <th className="customer-header">Customers</th>
                  <th className="customer-header">Estimate No</th>
                  <th className="customer-header">Tags</th>
                  <th className="customer-header">Approved Date</th>
                  <th className="customer-header">Date</th>
                  <th className="customer-header">Contact</th>
                  <th className="customer-header">Status</th>
                  <th className="customer-header">Action</th>
                </tr>
              </thead>
              <tbody>
                {estimates.map((row, index) => (
                  <tr key={index}>
                  <td  className="table-cell"
                    style={{ cursor: "pointer" }} key={row.id}
                    onClick={() => {setmainPayload(row);navigate(`/estimates/Preview/${row.id}`);}}>
                    {row.id}</td>
                    <td  className="table-cell"
                    style={{ cursor: "pointer" }} key={row.id}
                    onClick={() => {setmainPayload(row);navigate(`/estimates/Preview/${row.id}`);}}>
                    {row.customerName}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={row.id}
                    onClick={() => {setmainPayload(row);navigate(`/estimates/Preview?id=${row.id}`);}}>{row.estimateNumber}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={row.id}
                    onClick={() => {setmainPayload(row);navigate(`/estimates/Preview?id=${row.id}`);}}>{row.tags}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={row.id}
                    onClick={() => {setmainPayload(row);navigate(`/estimates/Preview?id=${row.id}`);}}>{formatDateToCustomString(row.approvedDate)}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={row.id}
                    onClick={() => {setmainPayload(row);navigate(`/estimates/Preview?id=${row.id}`);}}>{formatDateToCustomString(row.date)}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={row.id}
                    onClick={() => {setmainPayload(row);navigate(`/estimates/Preview?id=${row.id}`);}}>{row.contact}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={row.id}
                    onClick={() => {setmainPayload(row);navigate(`/estimates/Preview?id=${row.id}`);}}>{row.status}</td>


                   <td className="d-flex justify-content-between align-items-center">
                   <IconButton className="edit-button" onClick={() => handleEditClick(row)}>
                          <EditIcon style={{ color: "blue", fontSize: 24 }} />
                        </IconButton>
                      <IconButton className="delete-button"
                        onClick={() => {setRowToDelete(row.id);
                          setModalOpen(true);}
                        }
                         >
                      <DeleteIcon style={{ color: 'red', fontSize: 24 }}/>
                       </IconButton>
                   </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
        <div className=" d-flex justify-content-end endtext-end align-items-end" style={{ height: '75vh', minHeight:'20px' }}>
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

      <Dialog open={isEditModalOpen} onClose={() => setEditModalOpen(false)}>
        <DialogTitle>Edit Estimate</DialogTitle>
        <DialogContent>
          {editRowData && (
            <>
              <TextField
                fullWidth
                label="Customers"
                value={editRowData.customerName || ''}
                onChange={(e) => setEditRowData({ ...editRowData, customerName: e.target.value })}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Estimate No"
                value={editRowData.estimateNumber || ''}
                onChange={(e) => setEditRowData({ ...editRowData, estimateNumber: e.target.value })}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Tags"
                value={editRowData.tags || ''}
                onChange={(e) => setEditRowData({ ...editRowData, tags: e.target.value })}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Approved Date"
                value={editRowData.approvedDate || ''}
                onChange={(e) => setEditRowData({ ...editRowData, approvedDate: e.target.value })}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Date"
                value={editRowData.date || ''}
                onChange={(e) => setEditRowData({ ...editRowData, date: e.target.value })}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Contact"
                value={editRowData.contact || ''}
                onChange={(e) => setEditRowData({ ...editRowData, contact: e.target.value })}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Status"
                value={editRowData.status || ''}
                onChange={(e) => setEditRowData({ ...editRowData, status: e.target.value })}
                margin="dense"
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
