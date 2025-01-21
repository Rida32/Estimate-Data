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
        // Cookies.remove("token");
        navigate("/");
    };
  
    return (
        <header style={styles.header}>
            <div style={styles.logo}> 
            <img 
                    src="https://lh3.googleusercontent.com/kKaWGqBLttri7RicHIgIiroIE3ufOjGdcEckhMKji4BlT_jlEYxUwUFtFrCoFqHqJE9f6DgFTSrTh4Tz3ykcoW56P_ZuDmC_IUu8LSFY7JzkpE4Ul0FD" 
                    alt="Google Logo" 
                    style={styles.logoImage} 
                />
            </div>
            {/* <nav style={styles.navGroup}>
            <span style={styles.userName}>{`${firstName} ${lastName}`}</span> */}
          
            <div style={{ position: 'relative', marginLeft: '90%', marginRight: '1px' }}>
      <nav style={styles.navGroup}>
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
            </nav>
            </div>
            <div style={styles.userInfoRight}>
        <div style={styles.userName}>{`${firstName} ${lastName}`}</div>
        <div style={styles.userEmail}>{email}</div>
      </div>
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
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
    },
    // Added styles for the Google logo image
    logoImage: {
        width: '32px',
        height: '32px',
    },
    navGroup: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    userInfoRight: {
        display: 'flex',
        flexDirection: 'column', // Stack name and email
        alignItems: 'flex-end', // Align to the right
        marginLeft: 'auto', // Push to the far right
        marginRight: '15px', // Add spacing from dropdown
        color: '#fff',
    },
    // Added styles for the user's full name
    userName: {
        fontSize: '16px',
        color: '#fff',
    },
    userEmail: {
        fontSize: '12px', // Smaller font size for email
        color: '#ddd', // Slightly lighter color
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
