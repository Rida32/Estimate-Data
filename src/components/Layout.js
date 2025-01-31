import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from 'react-router-dom';
import Header from "../Header";
import Footer from "../Footer";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const pathname = window.location.pathname;
         console.log('Current Path:', pathname);
      
      //    useEffect(() => {
      //    if (pathname === "/") { 
      //     if (token == null) { 
      //       navigate("/"); 
      //     }
      //   } else {
      //     if (token != null) { 
      //       navigate(pathname); 
      //     }
      //   }
      // }, [pathname]);
      useEffect(() => {
        if (!token) {
          navigate("/");
        } 
      }, [ pathname]);
    
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
    width: "15%",
    background: "#f4f4f4",
    borderRight: "1px solid #ddd",
  },
  mainContent: {
    width: "85%",
    // height: "100vh",
    overFlow: "auto"
  },
};

export default Layout;
