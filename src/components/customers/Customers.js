import React, { useEffect, useState  } from "react";
import CustomButton from '../CustomButton'
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppData } from "../AppContext";
import useAPiAuth from "../hooks/useApiAuth";

const Customers = () => {
  const navigate = useNavigate();
  const { postData, getData } = useAPiAuth();
  const [errors, setErrors] = useState({});
  const {setSnackbar} =useAppData();
  const [searchParams] = useSearchParams();
  const customerId = searchParams.get("id");
  const [customerData, setCustomerData] = useState({
    CustomerName: "",
    firstname: "",
    lastname: "",
    email: "",
    internalname: "",
    address: "",
    notes: "",
  });

   const getCustomer =()=>{
    getData(
      `/customers/get-customer/${customerId}`,
      (data) => {
        console.log(data)
        setCustomerData({...data.data,})
      },
      (error) => {
        console.error("Error fetching customer data:", error);
      }
    );
   };
   useEffect(() => {
    getCustomer();
    console.log("getdata", customerId)
     
    }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const validate = () => {
    const newErrors = {};
    if (!customerData.email) newErrors.email = "Please fill all required fields";

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
    
     
      // if (customerData.id !== undefined) {
      //   setCustomers((prevCustomers) =>
      //     prevCustomers.map((customer) =>
      //       customer.id === customerData.id
      //         ? { ...customer, ...customerData } 
      //         : customer
      //     )
      //   );
      // } else {
       
      //   const newCustomer = { ...customerData, id: customers.length + 1 }; 
      //   setCustomers((prevCustomers) => [...prevCustomers, newCustomer]);
      // }
      const payload = {
        id :customerId,
        firstName: customerData.firstName,
        lastName: customerData.lastName,  
        email: customerData.email,       
        address: customerData.address,     
      };
      console.log("Payload to send:", payload);
      postData(
        `/customers/add`,
        payload,
        (data)=>{
          console.log("test", data);
          setCustomerData({
            CustomerName: "",
            firstname: "",
            lastname: "",
            email: "",
            internalname: "",
            address: "",
            notes: "",
          });
          setErrors({});
          setSnackbar({
            open: true,
            message: data.message,
            severity: "success",
          });
          navigate("/customerRecord");
        },
        (error)=>{
          console.error("user error:", error);
          setSnackbar({
          open: true,
          message: "Failed to save customer",
          severity: "error",
        });
        },

      );
  

      
    }
  };

  return (
    <>
    <div className="customers" style={{ height: "100%" }}>
        <header className="customerhead">Customers</header>

        <div className="container-customer">
        <header className="customerhead">Customers Info</header>
        <div className="container-fluid">

  {/* Row 1 */}
  <div className="row gx-3 gy-2">

    <div className="col-12 col-md-6 mb-2 customersinfo">
      <label>First Name</label>
      <input type="text"
       name="firstName"
       placeholder="First Name" 
       value={customerData.firstName}
        onChange={handleChange}
          className="form-control w-100"
       />
    </div>
    <div className="col-12 col-md-6 mb-2 customersinfo">
      <label>Last Name</label>
      <input type="text" 
      name="lastName" 
      placeholder="Last Name"
      value={customerData.lastName}
      onChange={handleChange}
       className="form-control w-100"
       />
    </div>
    <div className="col-12 col-md-6 mb-2 customersinfo">
      <label>E-Mail <span className="text-danger">*</span></label>
      <input type="text"
       name="email" 
       placeholder="@gmail.com" 
       value={customerData.email}
       onChange={handleChange}
        className="form-control w-100"
       /> {errors.email && <p className="error-text">{errors.email}</p>}
    </div>
  </div>

  {/* Row 2 */}
  <div className="row gx-3 gy-2">

    <div className="col-12 col-md-6 mb-2 customersinfo">
      <label>Address</label>
      <input type="text"
       name="address"
       placeholder="Address"
       value={customerData.address}
        onChange={handleChange}
         className="form-control w-100"
        />
    </div>
  </div>

  {/* Row 3 */}
  <div className="textarea-with-button">
    {/* <textarea
      rows="4"
      className="customer-notes"
      name="notes"
      placeholder="Notes"
      value={customerData.notes}
      onChange={handleChange}
    ></textarea> */}
    <div></div>
    <CustomButton  onClick={handleSave}>
      Save
    </CustomButton>
  </div>
</div>

      </div>
     </div>
    </>
  )
}

export default Customers