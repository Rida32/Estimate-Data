import React, { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "./AppContext";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Cookies from "js-cookie";
import useAPiAuth from "./hooks/useApiAuth";

const CustomerRecord = () => {
  const navigate = useNavigate();
  const { customers, setCustomers, customerChange, setCustomerChange } = useAppData();
  const [isModalOpen, setModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  // const token = Cookies.get("token");
  const { getData } = useAPiAuth();
  
   

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
      const updatedCustomers = customers.filter((_, index) => index !== rowToDelete);
      setCustomers(updatedCustomers);
    }
    closeModal();
  };
  


  const handleEditClick = (row, id) => {
    setCustomerChange({ ...row, id: row.id });
    navigate("/customers");
  };

  const getUser = () => {
    getData(
      `/customers/get-all`,
      (data) => {
        console.log("test", data);
        setCustomers(data.data);
        
      },
      (error) => {
        console.error("user error:", error);
      }
    );
  };

  useEffect(() => {
      getUser(); 

  }, []);
  
  

  return (
    <>
    {/* <h5>{token}token</h5> */}
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
                        <td>{index + 1} </td>
                        <td>{customer.firstName || "N/A"} </td>
                        <td>{customer.email} </td>

                        <td 
                        className="d-flex justify-content-between align-items-center">
                      <IconButton className="delete-button"
                        onClick={() => handleEditClick(customer)}>
                      <EditIcon style={{ color: "blue", fontSize: 24 }}/>
                      </IconButton>
                      <IconButton className="delete-button"
                         onClick={() => handleDeleteClick(index)}>
                      <DeleteIcon style={{ color: 'red', fontSize: 24 }}/>
                       </IconButton></td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

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

export default CustomerRecord;
