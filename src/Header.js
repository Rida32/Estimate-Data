import React from 'react';

const Header = () => {
    return (
        <header style={styles.header}>
            <div style={styles.logo}>MyLogo</div>
            <nav style={styles.nav}>
                <a href="#" style={styles.navLink}>Home</a>
                <a href="#" style={styles.navLink}>About</a>
                <a href="#" style={styles.navLink}>Contact</a>
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
        gap: '15px'
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontSize: '16px',
        transition: 'color 0.3s ease',
    },
    navLinkHover: {
        color: '#ddd'
    }
};

export default Header;
