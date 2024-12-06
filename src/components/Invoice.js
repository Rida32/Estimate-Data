import React, { useEffect, useState } from "react";
import InvoiceDetails from "./InvoiceDetails";
import Items from "./Items";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppData } from "./AppContext";
import MultipleImageUpload from "./MultipleImageUpload";





function Invoice() {
  const [formData, setFormData] = useState({
        customers: "",
        estimateNo: "",
        tags: "",
        approvedDate: "",
        date: "",
        contact:"",
        status:"",
        comments: "",
  });
  const [items, setItems] = useState([]);
  const [images, setImages] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const navigate = useNavigate();
  const { mainPayload ,setmainPayload,setEstimates,estimates,snackbar, setSnackbar} = useAppData();
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setSubmitClicked(false);
  }, [formData]);

  const handleSubmit = () => {
    setSubmitClicked(true);
    if (
      !formData.customers ||
      !formData.date
    ) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields",
        severity: "error",
      });

      return;
    }
    if (items.length <= 0) {
      setSnackbar({
        open: true,
        message: "Please fill at least one row",
        severity: "error",
      });
      return;
    }

    const estimate = {
      formData,
      items,
      images,
    };

    setEstimates([...estimates,estimate]);
    navigate("/");
    setSnackbar({
      open: true,
      message: "Estimate saved successfully!",
      severity: "success",
    });
  
    setFormData({
      customers: "",
      estimateNo: "",
      tags: "",
      approvedDate: "",
      date: "",
      contact: "",
      status: "",
      comments: "",
    });
    setItems([]);
    setImages([]);

    // const mainPayload = {
    //   formData: formData,
    //   itemsData: items,
    //   images: images,
    // };
    // setmainPayload(mainPayload)
    // navigate("/table");
    // console.log("mainPayload is:", mainPayload);
    // alert("Form Submitted Successfully");
    // setItems([]);
    // setFormData({
    //   customers: "",
    //     estimateNo: "",
    //     tags: "",
    //     approvedDate: "",
    //     date: "",
    //     contact:"",
    //     status:"",
    // });
  };

  return (
    <>
      <header className="Invoice">Add Estimate </header>
      <InvoiceDetails
        formData={formData}
        setFormData={setFormData}
        submitClicked={submitClicked}
      />
      <Items items={items} setItems={setItems} />
      <div className="form-group customer-message-container mt-3 card mb-5">
        <div className="card-body">
          <div className="row justify-content-between">
            <div className="col-md-4">

              <label>Comments</label>
              <div className="textarea-with-button">
                <textarea
                  rows="4"
                  placeholder="Comments"
                  className="customer-message"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                ></textarea>
                
              </div>{" "}
              <MultipleImageUpload images={images} setImages={setImages}/>
            </div>
            
            <div className="col-md-2  d-flex flex-column justify-content-end align-items-end">
              <button className="btn btn-primary align-items-center" onClick={handleSubmit}>
                Save
              </button>{" "}<br></br>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Invoice;
