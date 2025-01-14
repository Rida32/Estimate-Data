import React, { useEffect , useState} from "react";
import { useNavigate, useParams  } from "react-router-dom";
import useAPiAuth from "../hooks/useApiAuth";

const InvoicePreview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getData } = useAPiAuth();
  const [invoice, setInvoice] = useState([]);

  const getUser = () => {
    console.log("getting id", id);
    getData(
       `/invoices/get-invoice/${id}`,

      (data)=>{
        console.log("Fetched data:", data);
        setInvoice(data.data || {});
      },
      (error) => {
        console.error("Error fetching invoice:", error.message || error);
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
  <>
   <div className="preview">
      <div>
  <div className="customer-table">
    <h2 className="Estimate">Invioce Details</h2>
    <div className="table-responsive">
      <table className="customertab">
        <thead>
          <tr>
            <th>Customers</th>
            {/* <th>Estimate No</th> */}
            <th>Invoice Number</th>
            <th>Date</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
        {invoice ? (
          <tr>
            <td>{invoice.customerName || "N/A"}</td>
            {/* <td>{invoice.estimateNumber || "N/A"}</td> */}
            <td>{invoice.invoiceNumber || "N/A"}</td>
            <td>{invoice.dueDate || "N/A"}</td>
            <td>{invoice.contact || "N/A"}</td>
            <td>{invoice.status || "N/A"}</td>
            <td>{invoice.comments || "N/A"}</td>
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


      <div className="invoice-form-container mt-4">
          <h2>Item Details</h2>
          <div className="table-responsive">
          <table className="customertab">
            <thead>
            <tr>
           <th>Name</th>
           <th>Qty</th>
           <th>Rate</th>
           <th>Amount</th>
           </tr>
            </thead>
          <tbody>
          {invoice?.items?.length > 0 ? (
            invoice.items.map((item, index) => (
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
              </div>
    </div>
  </>
  )
}

export default InvoicePreview