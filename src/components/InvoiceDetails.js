import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import { useAppData } from './AppContext';


function InvoiceDetails ({formData, setFormData,submitClicked}) {
  const navigate=useNavigate()
  const { customers } = useAppData();
  const customerOptions = customers.map((customer) => customer.CustomerName); 
  const tagOptions = ['Urgent', 'Pending', 'Approved'];
  const statusOptions = ['Draft', 'Sent', 'Paid'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAutocompleteChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

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
              <Autocomplete
                options={customerOptions}
                value={formData.customers}
                freeSolo
                onChange={(event, newValue) => handleAutocompleteChange('customers', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Name"
                    error={submitClicked && !formData.customers}
                    helperText={submitClicked && !formData.customers ? 'Please fill the above field' : ''}
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused': {
                        '& fieldset': {
                          borderColor: 'black',
                        },
                      },
                    }}
                  />
                )}
              />
            </div>
              {/* <input
                type="text"
                placeholder="Name"
                name="customers"  
                value={formData.customers}
                onChange={handleChange}
              />
              {submitClicked && !formData.customers &&<span className="text-error">Please fill the above filed</span>}
            </div> */}
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
              <label> Tags </label>
              <Autocomplete
                multiple
                options={tagOptions}
                value={formData.tags || []}
                freeSolo
                onChange={(event, newValue) => handleAutocompleteChange('tags', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Tags"
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused': {
                        '& fieldset': {
                          borderColor: 'black',
                        },
                      },
                    }}
                  />
                )}
              />
            </div>
              {/* <input
                type="text"
                name="tags"
                placeholder="Tags" 
                value={formData.tags}
                onChange={handleChange}  
                />
            </div> */}
            <div className="form-group">
              <label>
                Approved Date 
              </label>
              <input
                type="date"
                placeholder="yyyy/mm/dd"
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
                placeholder="yyyy/mm/dd"
                value={formData.date}
                onChange={handleChange}
              />
               {submitClicked && !formData.date &&<span className="text-error">Please fill the above filed</span>}
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
              <Autocomplete
                options={statusOptions}
                value={formData.status}
                freeSolo
                onChange={(event, newValue) => handleAutocompleteChange('status', newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select Status"
                    sx={{
                      '& .MuiOutlinedInput-root.Mui-focused': {
                        '& fieldset': {
                          borderColor: 'black',
                        },
                      },
                    }}
                  />
                )}
              />
            </div>
              {/* <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleChange}
              />
            </div> */}
          </div>

       
        </div>
      </div>








    </>
  )
}

export default InvoiceDetails