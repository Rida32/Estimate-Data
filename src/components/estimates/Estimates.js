import React, { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../AppContext";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomButton from '../CustomButton';
import useAPiAuth from "../hooks/useApiAuth";
import { formatDateToCustomString } from "../Utils";
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Button from '@mui/material/Button';
// import EditIcon from "@mui/icons-material/Edit";



const Estimates = () => {
  const navigate = useNavigate();
  const {  setmainPayload,  } = useAppData();
  const [estimates, setEstimates] = useState([]);
  const { getData } = useAPiAuth();
  // const [isModalOpen, setModalOpen] = useState(false);
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
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>
                    {row.id}</td>
                    <td  className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>
                    {row.customerName}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>{row.estimateNumber}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>{row.tags}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>{formatDateToCustomString(row.approvedDate)}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>{formatDateToCustomString(row.date)}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>{row.contact}</td>
                    <td className="table-cell"
                    style={{ cursor: "pointer" }} key={index}
                    onClick={() => {setmainPayload(row);navigate("/estimates/Preview");}}>{row.status}</td>


                   <td className="d-flex justify-content-between align-items-center">
                      {/* <IconButton className="delete-button"
                        onClick={() => handleEditClick(row)}>
                      <EditIcon style={{ color: "blue", fontSize: 24 }}/>
                      </IconButton> */}
                      <IconButton className="delete-button"
                        //  onClick={() => handleDeleteClick(index)}
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

      {/* Confirmation Modal */}
      {/* <Dialog
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
      </Dialog> */}

    </>
  );
};

export default Estimates;
