import React, { useEffect, useState  } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppData } from "../AppContext";
import useAPiAuth from "../hooks/useApiAuth";
import CustomButton from '../CustomButton';


const ItemsAdd = () => {
    const navigate = useNavigate();
    const { postData, getData } = useAPiAuth();
    const [errors, setErrors] = useState({});
    const {setSnackbar} =useAppData();
    const [searchParams] = useSearchParams();
    const itemsId = searchParams.get("id");
    const [itemsData, setItemsData] = useState({
        item: "",
        rate: "",
        costPrice: "",
        description: "",
    });

    const getCustomer =()=>{
      getData(
        `/items/get-item/${itemsId}`,
        (data) => {
          console.log(data)
          setItemsData({...data.data,})
        },
        (error) => {
          console.error("Error fetching customer data:", error);
        }
      );
     };
     useEffect(() => {
      getCustomer();
      console.log("getdata", itemsId)
       
      }, []);


    const handleChange = (e) => {
      const { name, value } = e.target;
      setItemsData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const validate = () => {
      const newErrors = {};
      if (!itemsData.item) newErrors.item = "Please fill all required fields";
  
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
   
        const payload = {
          id :itemsId,
          item: itemsData.item,
          rate: Number(itemsData.rate),  
          costPrice:Number(itemsData.costPrice),       
          description: itemsData.description,     
        };
        console.log("Payload to send:", payload);
        postData(
          `/items/add`,
          payload,
          (data)=>{
            console.log("test", data);
            setItemsData({
              item: "",
              rate: "",
              costPrice: "",
              description: "",
            });
            setErrors({});
            setSnackbar({
              open: true,
              message: data.message,
              severity: "success",
            });
            navigate("/ItemsRecord");
          },
          (error)=>{
            console.error("user error:", error);
            setSnackbar({
            open: true,
            message: "Failed to save Items",
            severity: "error",
          });
          },
        );

      }
    };


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
      <label>Items</label>
      <input type="text"
       name="item"
       value={itemsData.item}
        onChange={handleChange}
          className="form-control w-100"
       />{errors.item && <p className="error-text">{errors.item}</p>}
              </div>
          <div className="col-12 col-md-6 mb-2 customersinfo">
            <label>Rate</label>
             <input 
             type="number" 
              name="rate"
              value={itemsData.rate}
              onChange={handleChange}
               className="form-control w-100"
         />
           </div>
            <div className="col-12 col-md-6 mb-2 customersinfo">
            <label>Cost Price <span className="text-danger">*</span></label>
             <input 
             type="number"
              name="costprice" 
             value={itemsData.costPrice}
              onChange={handleChange}
               className="form-control w-100"
                /> 
           </div>
            </div>

             {/* Row 2 */}
              <div className="row gx-3 gy-2">

               <div className="col-12 col-md-6 mb-2 customersinfo">
                <label>Description</label>
                <input type="text"
                  name="description"
                  value={itemsData.description}
                 onChange={handleChange}
                  className="form-control w-100"
                  />
                 </div>
                 </div>

              {/* Row 3 */}
            <div className="textarea-with-button">
               <div></div>
               <CustomButton 
                 onClick={handleSave}
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