import axios from "axios";
import React, { useEffect, useState } from "react";
import useAPi from "./hooks/useAPi";

const StaffManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getData } = useAPi();

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
    setTimeout(() => {
      getUser(); 
    }, 3000);

  }, []);
  return (
    <>
      <div style={{ padding: "20px", height: "100%" }}>
        <h2>Staff Management</h2>
        <table
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
            <tr>
              <th style={{ textAlign: "left" }}>User Type</th>
              <th style={{ textAlign: "left" }}>First Name</th>
              <th style={{ textAlign: "left" }}>Last Name</th>
              <th style={{ textAlign: "left" }}>Email</th>
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
    </>
  );
};

export default StaffManagement;
