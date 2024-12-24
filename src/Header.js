import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = () => {
    const navigate = useNavigate();
    const email = Cookies.get("email");
    const firstName = Cookies.get("firstName");
    const lastName = Cookies.get("lastName");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        Cookies.set("token", "");
        navigate("/");
    };
  
    return (
        <header style={styles.header}>
            <div style={styles.logo}> 
            </div>
            <nav style={styles.navGroup}>
                <a href="#" style={styles.navLink}>Home</a>
                <a href="#" style={styles.navLink}>About</a>
                <a href="#" style={styles.navLink}>Contact</a>
                <div
                style={styles.userInfo}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                    <div style={styles.userInitials}>
                        {firstName?.charAt(0)}{lastName?.charAt(0)}
                    </div>
                    {isDropdownOpen && (
                        <div style={styles.dropdown}>
                            <div style={styles.dropdownHeader}>
                                <div style={styles.userInitialsLarge}>
                                    {firstName?.charAt(0)}{lastName?.charAt(0)}
                                </div>
                                <div>
                                    <strong>{`${firstName} ${lastName}`}</strong>
                                    <br />
                                    <span>{email}</span>
                                </div>
                            </div>
                            <button
                                style={styles.logoutButton}
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
                {/* {firstName} {lastName}<br></br>
                {email}</div>
                <a href="#" onClick={() => {navigate("/") 
                Cookies.set("token", "")} 
                
                } style={styles.navLink}>
                <i className="fas fa-sign-out-alt"></i>
                </a> */}
            </nav>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    },
    logo: {
        fontSize: '20px',
        fontWeight: 'bold'
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    navLinkHover: {
        color: '#ddd'
    },
    navGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
        transition: 'color 0.3s ease',
    },
    userInfo: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        color: '#fff',
    },
    userInitials: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: '#4caf50',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontWeight: 'bold',
    },
    dropdown: {
        position: 'absolute',
        top: '40px',
        right: '0',
        backgroundColor: '#fff',
        color: '#333',
        borderRadius: '4px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: '10',
        width: '200px',
        padding: '10px',
    },
    dropdownHeader: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        marginBottom: '10px',
    },
    userInitialsLarge: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#4caf50',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '16px',
    },
    logoutButton: {
        width: '100%',
        padding: '8px 10px',
        backgroundColor: 'grey',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textAlign: 'center',
        fontWeight: 'bold',
    },
};

export default Header;
