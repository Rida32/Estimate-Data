import React, { useEffect, useState  } from "react";
import CustomButton from '../CustomButton'
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import useAPiAuth from "../hooks/useApiAuth";
import { useAppData } from "../AppContext";
import { formatDateToCustomString } from "../Utils";


const Invoice = () => {
    const navigate = useNavigate();
    const { getData } = useAPiAuth();
    const [invoice, setInvoice] = useState([]);
    const [editRowData, setEditRowData] = useState(null);
    const {  setmainPayload,  } = useAppData();

    const getUser = () => {
    
        getData(
          `/invoices/get-all`,
          (data)=>{
            console.log("test", data);

            const sortedInvoices = data.data.sort((a, b) => b.id - a.id);
            setInvoice(sortedInvoices);
            // setInvoice(data.data);
          },
          (error) => {
            console.error("user error:", error);
          },
        );
      };
      const handleEditClick = (id) => {
        const invoiceToEdit = invoice.find((inv) => inv.id === id);
        if (invoiceToEdit) {
            setEditRowData({
                ...invoiceToEdit,
                date: formatDateToCustomString(invoiceToEdit.dueDate),
            });
        }
        navigate(`/InvoiceAdd?id=${id}`);
    };
      useEffect(() => {
          getUser(); 
    
      }, []);
  return (
   <>
        <div>
        <div style={{ height: "100%" }}>
        <div className="data-form-container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginLeft: "25px" }}>
         <h2 style={{ fontSize: "25px", margin: 0, fontWeight:"bold", }}>Invoice Details</h2>
         <CustomButton className="button-add btn"
            onClick={() => {navigate("/InvoiceAdd");}}>
              Add
         </CustomButton>
        </div>
        <div className="customer-table">
          <div className="table-responsive">
            <table
            className="customertab "
             >
              <thead >
                <tr className="customer-row">
                  <th className="customer-header">ID</th>
                  <th className="customer-header">Customers</th>
                  <th className="customer-header">Invoice No</th>
                  <th className="customer-header">Due Date</th>
                  <th className="customer-header">Contact</th>
                  <th className="customer-header">Status</th>
                  <th className="customer-header">Action</th>
                </tr>
              </thead>
              <tbody>
              {invoice.map((row, index) => (
                <tr key={index}
                >
              <td 
              style={{ cursor: "pointer" }} key={row.id}
              // onClick={() => {navigate("/InvoicePreview");}}
              onClick={() => {setmainPayload(row);navigate(`/InvoicePreview/${row.id}`);}}
              > {row.id}</td>
              <td 
              style={{ cursor: "pointer" }} key={row.id}
              > {row.customerName}</td>
              <td 
              style={{ cursor: "pointer" }} key={row.id}
              > {row.invoiceNumber}</td>
              <td 
              style={{ cursor: "pointer" }} key={row.id}
              >{formatDateToCustomString(row.dueDate)}</td>
              <td 
              style={{ cursor: "pointer" }} key={row.id}
              > {row.contact}</td>
              <td 
              style={{ cursor: "pointer" }} key={row.id}
              > {row.status}</td>
              
              <td className=" d-flex justify-content-between align-items-center">
                   <IconButton className="edit-button"
                      onClick={() => handleEditClick(row.id)}
                    >
                          <EditIcon style={{ color: "blue", fontSize: 24 }} />
                        </IconButton>
                      {/* <IconButton className="delete-button"
                        // onClick={() => {setRowToDelete(row.id);
                        //   setModalOpen(true);}}
                         >
                      <DeleteIcon style={{ color: 'red', fontSize: 24 }}/>
                       </IconButton> */}
                   </td>
                   </tr>
                ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
        <div className=" d-flex justify-content-end endtext-end align-items-end" style={{ height: '75vh', minHeight:'20px' }}>
          {/* <CustomButton
            className="back-button mb-3 me-3"
            onClick={() => {
              navigate("/");
            }}
          >
            back
          </CustomButton> */}
        </div>
      </div>

            
        </div>
   </>
  )
}

export default Invoice