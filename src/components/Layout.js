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
// const styles = {
//   container: {
//     display: "flex",
//    flexDirection: "row", // Changed to column layout
//     minHeight: "100vh", // Ensure the layout spans the full viewport height
//   },
//   sidebar: {
//     width: "20%",
//     background: "#f4f4f4",
//     borderRight: "1px solid #ddd",
//   },
//   mainContent: {
//     flex: 1, // Allow main content to expand and push footer down
//     overflow: "auto",
//     width: "80%",
//     //     height: "100vh",
//   },
// };


const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    minHeight: "100vh",
  },
  sidebar: {
    width: "23%",
    background: "#f4f4f4",
    borderRight: "1px solid #ddd",
  },
  mainContent: {
    width: "84%",
    // height: "100vh",
    overFlow: "auto"
  },
};

export default Layout;
