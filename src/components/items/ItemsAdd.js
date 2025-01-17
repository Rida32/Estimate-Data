import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppData } from "../AppContext";
import useAPiAuth from "../hooks/useApiAuth";
import CustomButton from '../CustomButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemsAdd = () => {
    const navigate = useNavigate();
    const { postData, getData } = useAPiAuth();
    const [errors, setErrors] = useState({});
    const {setSnackbar} =useAppData();
    const [searchParams] = useSearchParams();
    const customerId = searchParams.get("id");
    const [itemsData, setitemsData] = useState({
        item: "",
        description: "",
        qty: "",
        rate: "",
        costPrice: "",
    });
//     const [editItemId, setEditItemId] = useState(null);
//     const [editableField, setEditableField] = useState(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const navigate=useNavigate()
  
//     const handleInputChange = (e) => {
//       const { name, value } = e.target;
//       setNewItem((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     };
//     const handleEditField = (itemId, fieldName) => {
//       setEditItemId(itemId);
//       setEditableField(fieldName);
//     };
  
//     const handleBlur = () => {
//       setEditableField(null);
//     };
//     const handleSnackbarClose = () => {
//       setSnackbarOpen(false);
//     };
  
    
//     const addItem = () => {
//       if (
//         newItem.item &&
//         newItem.description &&
//         newItem.qty &&
//         newItem.rate &&
//         newItem.costPrice
//       ) {
//         if (editItemId !== null) {
//           setItems((prevItems) =>
//             prevItems.map((item) =>
//               item.id === editItemId
//                 ? {
//                     ...item,
//                     item: newItem.item,
//                     description: newItem.description,
//                     qty: parseInt(newItem.qty),
//                     rate: parseFloat(newItem.rate),
//                     amount: parseInt(newItem.qty) * parseFloat(newItem.rate),
//                     costPrice: parseFloat(newItem.costPrice),
//                   }
//                 : item
//             )
//           );
//           setEditItemId(null);
//         } else {
  
//         const newItemData = {
//           id: items.length + 1,
//           item: newItem.item,
//           description: newItem.description,
//           qty: parseInt(newItem.qty),
//           rate: parseFloat(newItem.rate),
//           amount: parseInt(newItem.qty) * parseFloat(newItem.rate),
//           costPrice: parseFloat(newItem.costPrice),
//           isMisc: false,
//         };
  
//         setItems((prevItems) => [...prevItems, newItemData]);
//       }
        
//         setNewItem({
//           item: "",
//           description: "",
//           qty: "",
//           rate: "",
//           costPrice: "",
//         });
        
//       } else {
//         setSnackbarOpen(true);
//       }
      
//     };
//     const handleEditValueChange = (e, itemId, fieldName) => {
//       const value = e.target.value;
    
//     setItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === itemId
//           ? {
//               ...item,
//               [fieldName]: fieldName === "qty" || fieldName === "rate" || fieldName === "costPrice"
//                 ? parseFloat(value)
//                 : value,
//             }
//           : item
//       )
//     );
//   };
  return (
    <>
        <div className="customers" style={{ height: "100%" }}>
        <div >
        <header className="customerhead">Items</header>

        <div className="container-customer">
        <header className="customerhead">Items Info</header>
        <div className="container-fluid">

  {/* Row 1 */}
  <div className="row gx-3 gy-2">

    <div className="col-12 col-md-6 mb-2 customersinfo">
      <label>First Name</label>
      <input type="text"
       name="firstName"
       placeholder="First Name" 
    //    value={customerData.firstName}
    //     onChange={handleChange}
          className="form-control w-100"
       />
              </div>
          <div className="col-12 col-md-6 mb-2 customersinfo">
            <label>Last Name</label>
             <input type="text" 
              name="lastName" 
               placeholder="Last Name"
            //    value={customerData.lastName}
            //    onChange={handleChange}
               className="form-control w-100"
         />
           </div>
            <div className="col-12 col-md-6 mb-2 customersinfo">
            <label>E-Mail <span className="text-danger">*</span></label>
             <input type="text"
              name="email" 
              placeholder="@gmail.com" 
            //    value={customerData.email}
            //    onChange={handleChange}
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
                //   value={customerData.address}
                //   onChange={handleChange}
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
               <CustomButton 
                // onClick={handleSave}
                >
                 Save
                </CustomButton>
                </div>
                </div>

             </div>
             </div>





        </div>

    </>
  )
}

export default ItemsAdd