import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css'; 
import logo from '../assets/qbn.png'; 

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
