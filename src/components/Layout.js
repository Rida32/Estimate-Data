import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from 'react-router-dom';
import Header from "../Header";
import Footer from "../Footer";

const Layout = () => {
    return (
      <>
      <Header/>
    <div style={styles.container}>
       
      <aside style={styles.sidebar}>
        <Sidebar />
      </aside>
      <div style={styles.mainContent}>
      <Outlet/>
      <Footer/>
      </div>
      
    </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
  },
  sidebar: {
    width: "20%",
    background: "#f4f4f4",
    borderRight: "1px solid #ddd",
  },
  mainContent: {
    width: "80%",
    height: "100vh",
    overFlow: "auto"
  },
};

export default Layout;
