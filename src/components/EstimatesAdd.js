import React, { useEffect, useState } from "react";
import InvoiceDetails from "./InvoiceDetails";
import Items from "./Items";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppData } from "./AppContext";
import MultipleImageUpload from "./MultipleImageUpload";
import CustomButton from './CustomButton';




function EstimatesAdd() {
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
  const { mainPayload ,setmainPayload,setEstimates,estimates,snackbar, setSnackbar, estimateData, setEstimateData} = useAppData();

  useEffect(() => {
    if (estimateData) {
      setFormData(estimateData.formData || {}); // Fill form data
      setItems( estimateData.items || []); // Fill items
      setImages(estimateData.images || []); // Fill images
    }
  }, [estimateData]);
    

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

  const total = items.reduce((sum, item) => sum + (item.qty * item.rate || 0), 0);
  const totalExpenses = items.reduce((sum, item) => sum + (item.qty * item.costPrice || 0), 0);

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
    const updatedEstimate = {
      formData,
      items,
      images,
      id: estimateData.id || estimates.length + 1,
    };
    if (estimateData.id) {
      setEstimates((prevEstimates) =>
        prevEstimates.map((estimate) =>
          estimate.id === estimateData.id ? updatedEstimate : estimate
        )
      );
    } else {
      // Add new estimate to the array
      setEstimates((prevEstimates) => [...prevEstimates, updatedEstimate]);
    }
    
    setSnackbar({
      open: true,
      message: "Estimate saved successfully!",
      severity: "success",
    });
    navigate("/estimates");
  
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
              <div className="left-align">
              <MultipleImageUpload images={images} setImages={setImages}/>
            </div>
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
              <CustomButton className="savee-button btn align-items-center" onClick={handleSubmit}
              >
                Save
              </CustomButton>
            </div>
            
            
          </div>
        </div>
      </div>
     
    </>
  );
}

export default EstimatesAdd;
