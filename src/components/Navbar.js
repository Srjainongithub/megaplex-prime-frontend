// frontend/src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    Megaplex Prime
                </Link>
                <ul className="nav-menu">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="#overview">Overview</Link></li>
                    <li><Link to="#amenities">Amenities</Link></li>
                    <li><Link to="#about">About</Link></li>
                    <li><Link to="#faq">FAQ</Link></li>
                    <li><Link to="/admin-login" className="admin-link">Admin</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;