import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Customers", icon: "👤", path: "/customerRecord" },
    { name: "Staff Management", icon: "👥", path: "/staffmanagement" },
    { name: "Estimates", icon: "📊", path: "/estimates" },
    { name: "Sales", icon: "🛒" },
    { name: "Bill", icon: "🧾" },
    { name: "Invoice", icon: "📄" },
    { name: "Items", icon: "📦" },
  ];
  const navigate = useNavigate();

  return (
    <div 
    style={sidebarStyles.sidebar} 
    className="sidebar">
      {menuItems?.map((item, index) => (
        <div
          className="menu-item"
          key={index}
          onClick={() => navigate(item.path)}
          style={{ cursor: "pointer" }}
        >
          <span
             style={sidebarStyles.icon}
              className="icon fs-4"
          >
            {item.icon}
          </span>
          <span
             style={sidebarStyles.name}
            className="name ms-2 d-none d-md-inline"
          >
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};
const sidebarStyles = {
  container: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100vh",
  },
  sidebar: {
    width: "240px",
    color: "#ffffff",
    fontFamily: "'Roboto', sans-serif",
    borderRight: "1px solid #2a2a2a",
    padding: "10px 0",
    paddingTop: "35px", 
    zIndex: 2,
    
    
  },
  mainContent: {
    width: "calc(100% - 240px)",
    overflow: "auto",
  },
};

export default Sidebar;
