
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'


const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: '🏠',  },
    { name: 'Customers', icon: '👤', path: '/customerRecord' },
    { name: 'Staff Management', icon: '👥',  },
    { name: 'Estimates', icon: '📊', path: '/estimates' },
    { name: 'Sales', icon: '🛒',  },
    { name: 'Bill', icon: '🧾' },
    { name: 'Invoice', icon: '📄' },
    { name: 'Items', icon: '📦' },
   
  ];
  const navigate=useNavigate()

  return (
    <div className="sidebar">
      {menuItems?.map((item, index) => (
        <div className="menu-item"
         key={index}
         onClick={() => navigate(item.path)}
         style={{ cursor: 'pointer' }}>
          <span className="icon fs-4">{item.icon}</span>
          <span className="name ms-2 d-none d-md-inline">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
