import React from 'react';
import './NavBar.css';
import cfpb_small_logo from '../cfpb_logo.png';

const NavBar: React.FC = () => {
  return (
    <nav className="nav-bar">
      <img src={cfpb_small_logo} className="nav-logo" alt="logo" />
      <ul className="nav-links">
        <li><a href="#section1">Complaint Details</a></li>
        <li><a href="#section2">Complaints</a></li>
        <li><a href="#section3">Companies</a></li>
        <li><a href="#section4">Zip Codes</a></li>
      </ul>
    </nav>
  );
}

export default NavBar;