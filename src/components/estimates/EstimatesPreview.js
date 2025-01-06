import React, { useEffect , useState} from "react";
import { useNavigate, useParams  } from "react-router-dom";
import { useAppData } from "../AppContext";
import MultipleImageUpload from "../MultipleImageUpload";
import CustomButton from '../CustomButton';
import useAPiAuth from "../hooks/useApiAuth";


function EstimatesPreview () {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getData } = useAPiAuth();
  const [estimate, setEstimate] = useState([]);


  const getUser = () => {
    console.log("getting id", id);
    getData(
       `/estimates/get-estimate/${id}`,

      (data)=>{
        console.log("Fetched data:", data);
        setEstimate(data.data || {});
      },
      (error) => {
        console.error("Error fetching estimate:", error.message || error);
      },
    );
  };
  useEffect(() => {
    if (id) {
      getUser();
    } else {
      console.error("ID not found in URL parameters.");
    }
  }, [id]);
  

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
        {estimate ? (
          <tr>
            <td>{estimate.customerName || "N/A"}</td>
            <td>{estimate.estimateNumber || "N/A"}</td>
            <td>{estimate.tags || "N/A"}</td>
            <td>{estimate.approvedDate || "N/A"}</td>
            <td>{estimate.date || "N/A"}</td>
            <td>{estimate.contact || "N/A"}</td>
            <td>{estimate.status || "N/A"}</td>
          </tr>
        ) : (
          <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              )}
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
          {estimate?.items?.length > 0 ? (
            estimate.items.map((item, index) => (
               <tr key={index}>
                   <td>{item.item}</td>
                   <td>{item.qty}</td>
                   <td>{item.rate}</td>
                   <td>{item.qty * item.rate}</td>
               </tr>
                ))
              ) : (
                <tr>
                <td colSpan="4">No item details available</td>
              </tr>
            )}
              </tbody>
             </table>
              </div>

      {/* <MultipleImageUpload images={mainPayload.images} sowButton={false}/> */}

      <div className="d-flex justify-content-end">
        <CustomButton
           style={{WidthFull: "10vh"}}
          onClick={() => {
            navigate("/estimates");
          }}
        >
          back
        </CustomButton>
      </div>
    </div>
  );
}

export default EstimatesPreview;
