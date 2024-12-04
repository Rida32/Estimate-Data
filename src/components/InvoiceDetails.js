import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function InvoiceDetails({formData, setFormData,submitClicked}) {
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate=useNavigate()



  return (
    <>
    
    <div className="card">
        <div className="card-header">Estimate details</div>
        <div className="container">
          {/* Row 1 */}
          <div className="row">
            <div className="form-group">
              <label>
                Customers <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="customers"  
                value={formData.customers}
                onChange={handleChange}
              />
              {submitClicked && !formData.customers &&<span className="text-error">Please fill the filed above</span>}
            </div>
            <div className="form-group">
              <label> Estimate No</label>
              <input
                type="text"
                name="estimateNo"
                placeholder="Number"
                value={formData.estimateNo}
                onChange={handleChange}
                 />
            </div>
            <div className="form-group">
              <label>
                Tags 
              </label>
              <input
                type="text"
                name="tags"
                placeholder="Tags" 
                value={formData.tags}
                onChange={handleChange}  
                />
            </div>
            <div className="form-group">
              <label>
                Approved Date 
              </label>
              <input
                type="date"
                placeholder="dd/mm/yyyy"
                name="approvedDate"
                value={formData.approvedDate}
                onChange={handleChange}
                 />
            </div>
          </div>

          {/* Row 2 */}
          <div className="row">
            <div className="form-group">
              <label>Date <span className="text-danger">*</span></label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
               {submitClicked && !formData.date &&<span className="text-error">Please fill the filed above</span>}
            </div>
            <div className="form-group">
              <label>Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
            </div>
          </div>

       
        </div>
      </div>








    </>
  )
}

export default InvoiceDetails