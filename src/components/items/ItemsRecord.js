import React, { useEffect, useState  } from "react";
import { useNavigate , useSearchParams } from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import EditIcon from "@mui/icons-material/Edit";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppData } from "../AppContext";
import useAPiAuth from "../hooks/useApiAuth";
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ItemsRecord = () => {
  const navigate = useNavigate();
  const [itemsData, setitemsData] =useState([]);
  const { getData } = useAPiAuth();
  const [isModalOpen, setModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const {setSnackbar} =useAppData();

  const closeModal = () => {
    setModalOpen(false);
    setRowToDelete(null);
  };
  
  const confirmDelete = () => {
    if (rowToDelete !== null) {
      getData(
        `/items/delete-item/${rowToDelete}`, 
        () => {
          setSnackbar("Customer deleted successfully!", "success");
          getUser();
          closeModal(); 
        },
        (error) => {
          setSnackbar("Failed to delete customer. Please try again.", "error");
          console.error("Error deleting customer:", error);
        }
      );
    }
    
  };
  const handleEditClick = (id) => {
    navigate(`/ItemsAdd?id=${id}`); 
};
  const handleDeleteClick = (id) => {
    setModalOpen(true);
    setRowToDelete(id);
      
};

  const getUser = () => {
    getData(
      `/items/get-all`,
      (data) => {
        console.log("test", data);
        setitemsData(data.data);
        
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
                Items Record
              </h2>
              <button
                className="customer-btn"
                onClick={() => {
                  navigate("/ItemsAdd");
                }}
              >
                + Add Items
              </button>
            </div>
            <div className="customer-table">
              <table className="customertab">
                <thead>
                  <tr className="customer-row ">
                    <th className="customer-header col-1 justify-content-left">
                      ID
                    </th>
                    <th className="customer-header col-3">Items</th>
                    <th className="customer-header col-4">Description</th>
                    <th className="customer-header col-1">Rate</th>
                    <th className="customer-header col-2">Cost Price</th>
                    <th className="customer-header col-1">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsData.map((items, index) => {
                    return (
                      <tr key= {index}>
                        <td> {items.id} </td>
                        <td> {items.item || "N/A"} </td>
                        <td> {items.description} </td>
                        <td> {items.costPrice} </td>
                        <td> {items.rate} </td>

                        <td 
                        className="d-flex justify-content-between align-items-center">
                      <IconButton className="delete-button"
                         onClick={() => handleEditClick( items.id)}
                        >
                      <EditIcon style={{ color: "blue", fontSize: 24 }}/>
                      </IconButton>
                      <IconButton className="delete-button"
                        onClick={() => handleDeleteClick(items.id)}
                         >
                      <DeleteIcon style={{ color: 'red', fontSize: 24 }}/>
                       </IconButton>
                       </td>

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
  )
}

export default ItemsRecord