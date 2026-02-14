// frontend/src/components/AboutUs.js

import React from 'react';
import './AboutUs.css';

const AboutUs = ({ content }) => {
    return (
        <section id="about" className="about-us">
            <div className="container">
                <div className="about-content">
                    <div className="about-image">
                        <img src="/images/about.jpg" alt="About Us" />
                    </div>
                    <div className="about-text">
                        <h2 className="section-title">About Us</h2>
                        <p>{content.aboutUs}</p>
                        <div className="stats">
                            <div className="stat">
                                <h4>25+</h4>
                                <p>Years Experience</p>
                            </div>
                            <div className="stat">
                                <h4>50+</h4>
                                <p>Projects</p>
                            </div>
                            <div className="stat">
                                <h4>10000+</h4>
                                <p>Happy Families</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;