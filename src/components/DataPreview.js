import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "./AppContext";
import MultipleImageUpload from "./MultipleImageUpload";
import CustomButton from './CustomButton';
import { WidthFull } from "@mui/icons-material";



function DataPreview() {
  const navigate = useNavigate();
  const { mainPayload } = useAppData();

  useEffect(() => {
    console.log("test", mainPayload);
  }, []);

  return (
    <div className="preview">
      <div>
  <div className="data-form-container">
    <h2 className="Estimate">Estimate Details</h2>
    <div className="table-responsive">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Customers</th>
            <th>Estimate No</th>
            <th>Tags</th>
            <th>Approved Date</th>
            <th>Date</th>
            <th>Contact</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{mainPayload.formData?.customers}</td>
            <td>{mainPayload.formData?.estimateNo}</td>
            <td>{mainPayload.formData?.tags}</td>
            <td>{mainPayload.formData?.approvedDate}</td>
            <td>{mainPayload.formData?.date}</td>
            <td>{mainPayload.formData?.contact}</td>
            <td>{mainPayload.formData?.status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>


      <div className="invoice-form-container">
          <h2>Item Details</h2>
          <table className="invoice-items-table">
            <thead>
            <tr>
           <th>Name</th>
           <th>Qty</th>
           <th>Rate</th>
           <th>Amount</th>
           </tr>
            </thead>
          <tbody>
               {mainPayload?.items.map((item, index) => (
               <tr key={index}>
                   <td>{item.item}</td>
                   <td>{item.qty}</td>
                   <td>{item.rate}</td>
                   <td>{item.qty * item.rate}</td>
               </tr>
                ))}
              </tbody>
             </table>
              </div>

      <MultipleImageUpload images={mainPayload.images} sowButton={false}/>

      <div className="d-flex justify-content-end">
        <CustomButton
           style={{WidthFull: "10vh"}}
          onClick={() => {
            navigate("/table");
          }}
        >
          back
        </CustomButton>
      </div>
    </div>
  );
}

export default DataPreview;
