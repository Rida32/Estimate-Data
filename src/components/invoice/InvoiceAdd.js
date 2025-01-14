import React, { useEffect, useState } from "react";
import CustomButton from '../CustomButton'
import Items from "../Items";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import useAPiAuth from "../hooks/useApiAuth";
import { useAppData } from "../AppContext";
import { Button } from '@mui/material';




const InvoiceAdd = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [submitClicked, setSubmitClicked] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [searchParams] = useSearchParams(); 
    const invoiceId = searchParams.get("id"); 

    const {setSnackbar} =useAppData();
    const { postData, getData } = useAPiAuth();
    const statusOptions = ["Draft", "Sent", "Paid"];
    const [invoice, setInvoice] = useState({
        customerName: "",
        estimateNumber: "",
        invoiceNumber: "",
        dueDate: "",
        contact:"",
        status:"",
        comments: "",
    });

  const handleChange  = (e) => {
    const { name, value } = e.target;
    setInvoice((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
      
  const total = items.reduce((sum, item) => sum + (item.qty * item.rate || 0), 0);
  const totalExpenses = items.reduce((sum, item) => sum + (item.qty * item.costPrice || 0), 0);

  const handleSave  = () => {
    setIsLoading(true);
    const dataToSave = {
      invoice,
      items,
    };
    const validationErrors = {};
    if (!formData.customerId) {
        validationErrors.customerName = "Customer name is required.";
    }
    if (!invoice.invoiceNumber) {
        validationErrors.invoiceNumber = "Invoice number is required.";
    }
    if (items.length === 0) {
        validationErrors.items = "At least one item is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);

        const errorMessage =
            validationErrors.customerName ||
            validationErrors.invoiceNumber ||
            validationErrors.items;
        setSnackbar({
            message: errorMessage,
            severity: "error",
            open: true,
        });
        setIsLoading(false);
        return;
    }
    const payload = {
      id: invoice.id || undefined, // Optional field
      invoiceNumber: invoice.invoiceNumber,
      estimateNumber: invoice.estimateNumber ,
      estimateId: invoice.estimateId || undefined,
      customerName: formData.customerName,
      customerId: formData.customerId, 
      contact: invoice.contact ,
      dueDate: invoice.dueDate,
      comments: invoice.comments ,
      status: invoice.status ,
      items: items.map((item) => ({
        item: item.item,
        description:item.description,
        qty: item.qty,
        rate: item.rate,
        costPrice: item.costPrice,
      })), 
    };
  
    console.log("Saving Data:", dataToSave);
    postData(
      `/invoices/add`,
      payload,
      (data)=>{
        console.log("API Success:", data)
        setSnackbar({
          open: true,
          message:data.message,
          severity: "success",
        });
        setInvoice({
          customerName: "",
          estimateNumber: "",
          invoiceNumber: "",
          dueDate: "",
          contact:"",
          status:"",
          comments: "",
        });
        setItems([]);
          setIsLoading(false);
        navigate("/Invoice");
      },

    );
  };
  const handleDelete = () => {
    if (invoiceId) {
        getData(
            `/invoices/delete-invoice/${invoiceId}`,
            (data) => {
                console.log("Delete Success:", data);
                setSnackbar({
                    open: true,
                    message: "Invoice deleted successfully.",
                    severity: "success",
                });
                navigate("/Invoice"); 
            },
            (error) => {
                console.error("Delete Error:", error);
                setSnackbar({
                    open: true,
                    message: "Failed to delete the invoice.",
                    severity: "error",
                });
            }
        );
    }
};
  const [customers, setCustomers] = useState([])
  
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
  const getInvoice = () => {
    getData(
        `/invoices/get-invoice/${invoiceId}`, 
        (data) => {
            console.log("Invoice data:", data);
            const invoiceData = { ...data.data };
            // setInvoice(invoiceData);
            const mappedItems = (invoiceData.items || []).map((item) => ({
              ...item,
              quantity: item.quantity || 0, 
              amount: (item.quantity || 0) * (item.price || 0), 
            })); 
            setInvoice({
              ...invoiceData,
              dueDate: invoiceData.dueDate ? invoiceData.dueDate.split("T")[0] : "", 
            });
            setItems(mappedItems);
            setFormData({
              customerId: invoiceData.customerId,
              customerName: invoiceData.customerName,
            });
            setItems(data.data.items || []); 
        },
        (error) => {
            console.error("Error fetching invoice data:", error);
        }
    );
};
    useEffect(() => {
      if (invoiceId) {
      getInvoice(); 
  }
     }, [invoiceId]);


    const handleAutocompleteChange = (name, value) => {
      setInvoice((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };



  return (
    <> 
    <div className="customers" style={{ height: "100%" }}>
    <div>
    <div>
        <header className="customerhead">Invoice</header>

        <div className="container-customer">
        <header className="card-header">Invoice Detail</header>
        <div className="container-fluid">

  {/* Row 1 */}
  <div className="row gx-3 gy-2">
     
    <div className="form-group col-12 col-md-6 mb-2 ">
      <label>Customer Name
      <span className="text-danger">*</span></label>
      <Autocomplete

                size="small"
                options={customers || []}
                value={
                  formData?.customerId
                    ? customers.find(
                        (customer) => customer.id === formData.customerId
                      )
                    : null
                }
                getOptionLabel={(option) =>
                  option.firstName ? option.firstName : ""
                }
                onChange={(event, newValue) => {
                  console.log("value", newValue);
                  setFormData((prevData) => ({
                    ...prevData,
                    customerId: newValue?.id,
                    customerName: newValue?.firstName,
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                  size="small"
                    {...params}
                    placeholder="Name"
                    error={submitClicked && !formData?.customerId}
                    className="form-control"
                    
                  />
                )}
                  />
       </div>
           <div className="form-group col-12 col-md-6 mb-2 customersinfo">
               <label>Invoice Number
                   <span className="text-danger">*</span></label>
                    <input
                type="text"
                name="invoiceNumber" 
                onChange={handleChange}
                value={invoice.invoiceNumber || ""}
                className="form-control w-100"
                /> 
               {errors.invoiceNumber && <p className="error-text">{errors.invoiceNumber}</p>}
               </div>

                  <div className="form-group col-12 col-md-6 mb-2 customersinfo">
                  <label>contact</label>
                   <input 
                   type="number" 
                   name="contact" 
                   value={invoice.contact || ""}
                   onChange={handleChange}
                   placeholder="+92  "
                  className="form-control w-100"
                    />
                  </div>
   
                 </div>

  {/* Row 2 */}
  <div className=" row gx-3 gy-2">

    <div className="form-group col-12 col-md-6 mb-2 customersinfo">
      <label>Due Date</label>
      <input type="date"
       name="dueDate"
       value={invoice.dueDate || ""}
       onChange={handleChange}
       placeholder="mm/dd/yyyy"
       className="form-control"
        />
    </div>
    <div className="form-group col-12 col-md-6 mb-2 ">
  
              <label>Status</label>
              <Autocomplete
                  size="small"
                options={statusOptions}
                // value={items.status}
                value={invoice.status || ""}
                freeSolo
                onChange={(event, newValue) =>
                  handleAutocompleteChange("status", newValue)
                }
                renderInput={(params) => (
                  <TextField
                  size="small"
                    {...params}
                    placeholder="Select Status"
                     />
                )}
              />
            </div>
  </div>

</div>

      </div>
     </div>
     <Items items={items} setItems={setItems} />
     </div>
     <div className="form-group customer-message-container mt-3 card mb-5">
        <div className="card-body">  
          <div className="row justify-content-between">        
            <div className="col-md-4">
              <label>Comments</label>
              <div className="textarea-with-button">
                <textarea
                  rows="4"
                  className="customer-notes"
                  name="comments"
                  value={invoice.comments || ""} 
                  placeholder="comments"
                  onChange={handleChange}
                ></textarea>
                
              </div>{" "}

            </div>
            {/* Calculation box on the right side */}
            <div className="col-md-4 text-end">
              <div className="calculation-box card p-3 mb-4">
                <h5 className="text-center">Calculations</h5>
                <div className="d-flex justify-content-right">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Total Expenses:</span>
                  <span>${totalExpenses.toFixed(2)}</span>
                </div>
              </div>
              {invoiceId && (
                        <Button
                            className="btn align-items-center"
                            onClick={handleDelete}
                            style={{
                               backgroundColor: "red", 
                               color: "white", 
                               borderRadius: "8px", 
                               padding: "10px 10px", 
                               fontSize: "14px", 
                              //  fontWeight: "bold", 
                               marginRight: "5px",
                               border: "none",
                               cursor: "pointer",
                                 }}
                              >
                            Delete
                        </Button>
                    )}
                    
              <CustomButton className="savee-button btn align-items-center"
               onClick={handleSave}
               disabled={isLoading} 
              >
              {isLoading ? <span 
               className="spinner-border spinner-border-sm text-light"
               role="status"
               aria-hidden="true"></span> : "Save"}
              </CustomButton>
            </div>
            
            
          </div>
        </div>
      </div>

     <div className="d-flex justify-content-end mt-3">
    
              </div>
             
     </div>
    </>
  )
}

export default InvoiceAdd