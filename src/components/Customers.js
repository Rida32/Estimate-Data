
import CustomButton from './CustomButton'
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAppData } from "./AppContext";

const Customers = () => {
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    CustomerName: "",
    firstname: "",
    lastname: "",
    email: "",
    internalname: "",
    address: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const { snackbar, setSnackbar, handleSnackbarClose , customers, setCustomers} = useAppData();
 

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  
  const validate = () => {
    const newErrors = {};
    if (!customerData.CustomerName) newErrors.CustomerName = "Please fill all required fields";
    if (!customerData.email) newErrors.email = "Please fill all required fields";
    if (!customerData.internalname) newErrors.internalname = "Please fill all required fields";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields",
        severity: "error",
      });
    }
    return Object.keys(newErrors).length === 0; 
  };

 
  const handleSave = () => {
    if (validate()) {
      setSnackbar({
        open: true,
        message: "Customer details saved successfully!",
        severity: "success",
      });
      setCustomers([...customers, customerData])

      setCustomerData({
        CustomerName: "",
        firstname: "",
        lastname: "",
        email: "",
        internalname: "",
        address: "",
        notes: "",
      });
      navigate("/customerRecord")

      setErrors({});
    }
  };

  return (
    <>
    <div className="customers" style={{ height: "100%" }}>
        <header className="customerhead">Customers</header>

        <div className="container-customer">
        <header className="customerhead">Customers Info</header>

  {/* Row 1 */}
  <div className="row">
    <div className="customersinfo">
      <label>Customers Name <span className="text-danger">*</span></label>
      <input type="text"
       name="CustomerName" 
       placeholder="Customer Name"
       value={customerData.CustomerName}
       onChange={handleChange}
        />{errors.CustomerName && <p className="error-text">{errors.CustomerName}</p>}
    </div>
    <div className="customersinfo">
      <label>First Name</label>
      <input type="text"
       name="firstname"
       placeholder="First Name" 
       value={customerData.firstname}
        onChange={handleChange}

       />
    </div>
    <div className="customersinfo">
      <label>Last Name</label>
      <input type="text" 
      name="lastname" 
      placeholder="Last Name"
      value={customerData.lastname}
      onChange={handleChange}
       />
    </div>
    <div className="customersinfo">
      <label>E-Mail <span className="text-danger">*</span></label>
      <input type="text"
       name="email" 
       placeholder="@gmail.com" 
       value={customerData.email}
       onChange={handleChange}
       /> {errors.email && <p className="error-text">{errors.email}</p>}
    </div>
  </div>

  {/* Row 2 */}
  <div className="row">
    <div className="customersinfo">
      <label>Internal Customers Name <span className="text-danger">*</span></label>
      <input type="text" 
      name="internalname" 
      placeholder="Customer Display Name" 
      value={customerData.internalname}
      onChange={handleChange}
      />{errors.internalname && <p className="error-text">{errors.internalname}</p>}
    </div>
    <div className="customersinfo">
      <label>Address</label>
      <input type="text"
       name="address"
       placeholder="Address"
       value={customerData.address}
        onChange={handleChange}
        />
    </div>
  </div>

  {/* Row 3 */}
  <div className="textarea-with-button">
    <textarea
      rows="4"
      className="customer-notes"
      name="notes"
      placeholder="Notes"
      value={customerData.notes}
      onChange={handleChange}
    ></textarea>
    <CustomButton  onClick={handleSave}>
      Save
    </CustomButton>
  </div>
</div>

      </div>
     
    </>
  )
}

export default Customers