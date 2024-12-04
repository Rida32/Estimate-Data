
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'


const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: '🏠' },
    { name: 'Customers', icon: '👤' },
    { name: 'Staff Management', icon: '👥' },
    { name: 'Map', icon: '📍' },
    { name: 'Service Requests', icon: '📋' },
    { name: 'Estimates', icon: '📊' },
    { name: 'Purchase Order', icon: '🛒' },
    { name: 'Bill', icon: '🧾' },
    { name: 'Invoice', icon: '📄' },
    { name: 'Items', icon: '📦' },
    { name: 'Wages', icon: '💰' },
    { name: 'Monthly Goals', icon: '🎯' },
  ];
  const navigate=useNavigate()

  return (
    <div className="sidebar">
      {menuItems.map((item, index) => (
        <div className="menu-item" key={index}>
          <span className="icon">{item.icon}</span>
          <span className="name">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
