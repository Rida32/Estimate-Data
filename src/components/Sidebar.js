
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'


const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: '🏠',  },
    { name: 'Customers', icon: '👤',  },
    { name: 'Staff Management', icon: '👥',  },
    ,
    { name: 'Estimates', icon: '📊', path: '/' },
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
          <span className="icon">{item.icon}</span>
          <span className="name">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
