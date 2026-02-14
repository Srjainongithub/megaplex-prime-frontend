// frontend/src/components/NearbyConnectivity.js

import React from 'react';
import './NearbyConnectivity.css';

const NearbyConnectivity = ({ content }) => {
    // Convert string to array (each line becomes an item)
    const connectivityItems = content.nearbyConnectivity.split('\n').filter(item => item.trim());

    return (
        <section className="nearby-connectivity">
            <div className="container">
                <h2 className="section-title">Nearby Connectivity</h2>
                <div className="connectivity-grid">
                    {connectivityItems.map((item, index) => (
                        <div key={index} className="connectivity-card">
                            <div className="icon">📍</div>
                            <p>{item.replace('•', '').trim()}</p>
                        </div>
                    ))}
                </div>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345!2d...!"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        title="location map"
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default NearbyConnectivity;