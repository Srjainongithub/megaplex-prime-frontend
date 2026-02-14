// frontend/src/components/Amenities.js

import React from 'react';
import './Amenities.css';

const Amenities = ({ content }) => {
    const amenitiesList = content.amenities.split(',').map(item => item.trim());

    return (
        <section id="amenities" className="amenities">
            <div className="container">
                <h2 className="section-title">Amenities</h2>
                <div className="amenities-grid">
                    {amenitiesList.map((amenity, index) => (
                        <div key={index} className="amenity-card">
                            <img src={`/images/amenity-${(index % 2) + 1}.jpg`} alt={amenity} />
                            <h3>{amenity}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Amenities;