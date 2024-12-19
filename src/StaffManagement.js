import axios from "axios";
import React, { useEffect, useState  } from "react";


const StaffManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
      
      const fetchUsers = async () => {
        try {
            const response = await axios.get("http://192.168.18.35:9000/api/v2/auth/users"
            );
            console.log("test", response.data)
            setUsers(response.data.data)
            
          } catch (error) {
      
            console.error("user error:", error);
          }


      };
  
      fetchUsers();
    }, []);
  return (
    <>
    <div style={{ padding: '20px', height: '100%' }}>
      <h2>Staff Management</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>User Type</th>
            <th style={{ textAlign: 'left' }}>First Name</th>
            <th style={{ textAlign: 'left' }}>Last Name</th>
            <th style={{ textAlign: 'left' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.userType || "N/A"}</td>
              <td>{user.firstName || "N/A"}</td>
              <td>{user.lastName || "N/A"}</td>
              <td>{user.email || "N/A"}</td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>


    </>
  )
}

export default StaffManagement