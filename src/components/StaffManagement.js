import React, { useEffect, useState } from "react";
import useAPiAuth from "./hooks/useApiAuth";


const StaffManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getData } = useAPiAuth();

  const getUser = () => {
    getData(
      `/auth/users`,
      (data) => {
        console.log("test", data);
        setUsers(data.data);
        setLoading(false);
      },
      (error) => {
        console.error("user error:", error);
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    // setTimeout(() => {
      getUser(); 
    // }, 1000);

  }, []);
  return (
    <>
      <div className="record-container" style={{ padding: "20px", height: "100%" }}>
        <h2>Staff Management</h2>
        <div className="customer-table">
        <table className="customertab"
          border="1"
          cellPadding="8"
          cellSpacing="0"
          style={{
            width: "100%",
            textAlign: "left",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr className="customer-row ">
              <th className="customer-header" style={{ textAlign: "left" }}>User Type</th>
              <th className="customer-header" style={{ textAlign: "left" }}>First Name</th>
              <th className="customer-header" style={{ textAlign: "left" }}>Last Name</th>
              <th className="customer-header" style={{ textAlign: "left" }}>Email</th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  <div className="loader"></div>
                </td>
              </tr>
            ) : (
               users.map((user, index) => (
              <tr key={index}>
                <td>{user.userType || "N/A"}</td>
                <td>{user.firstName || "N/A"}</td>
                <td>{user.lastName || "N/A"}</td>
                <td>{user.email || "N/A"}</td>
              </tr>
            ))
          )}
          </tbody>
        </table>
        </div>
      </div>
    </>
  );
};

export default StaffManagement;
