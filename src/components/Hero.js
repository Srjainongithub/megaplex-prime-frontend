// frontend/src/components/Hero.js

import React from 'react';
import './Hero.css';

const Hero = ({ content }) => {
    return (
        <section className="hero" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/hero-bg.jpg')`
        }}>
            <div className="hero-content">
                <h1 className="hero-title">{content.heroTitle}</h1>
                <p className="hero-subtitle">{content.heroSubtitle}</p>
                <div className="hero-buttons">
                    <button className="btn-primary">Enquire Now</button>
                    <button className="btn-secondary">Download Brochure</button>
                </div>
            </div>
        </section>
    );
};

export default Hero;