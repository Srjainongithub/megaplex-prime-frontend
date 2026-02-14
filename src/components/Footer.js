// frontend/src/components/Footer.js

import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>Megaplex Prime</h3>
                        <p>Where Luxury Meets Comfort</p>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#overview">Overview</a></li>
                            <li><a href="#amenities">Amenities</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#faq">FAQ</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <p>📞 +91 98765 43210</p>
                        <p>📧 info@megaplex.com</p>
                        <p>📍 Mumbai, Maharashtra</p>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024 Megaplex Prime. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
