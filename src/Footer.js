import React from 'react';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.footerContent}>
                <p style={styles.text}>&copy; {new Date().getFullYear()} Eazisols. All rights reserved.</p>
                <nav style={styles.nav}>
                    <a href="/about" style={styles.navLink}>About</a>
                    <a href="/contact" style={styles.navLink}>Contact</a>
                    <a href="/privacy" style={styles.navLink}>Privacy Policy</a>
                </nav>
            </div>
        </footer>
    );
};

// const styles = {
//     footer: {
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: '20px',
//         backgroundColor: '#333',
//         color: '#fff',
//         boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)'
//     },
//     footerContent: {
//         textAlign: 'center'
//     },
//     text: {
//         marginBottom: '10px',
//         fontSize: '14px'
//     },
//     nav: {
//         display: 'flex',
//         gap: '15px',
//         justifyContent: 'center'
//     },
//     navLink: {
//         color: '#fff',
//         textDecoration: 'none',
//         fontSize: '14px',
//         transition: 'color 0.3s ease',
//     },
//     navLinkHover: {
//         color: '#ddd'
//     }
// };
const styles = {
    footer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#333",
      color: "#fff",
      boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
      position: "relative", // Ensure it's part of the flow
      width: "100%", // Take the full width
    },
    footerContent: {
      textAlign: "center",
    },
    text: {
      marginBottom: "10px",
      fontSize: "14px",
    },
    nav: {
      display: "flex",
      gap: "15px",
      justifyContent: "center",
    },
    navLink: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "14px",
      transition: "color 0.3s ease",
    },
    navLinkHover: {
      color: "#ddd",
    },
  };
  

export default Footer;
