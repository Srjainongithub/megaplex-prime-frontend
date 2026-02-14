// frontend/src/components/ConstructionUpdates.js

import React from 'react';
import './ConstructionUpdates.css';

const ConstructionUpdates = ({ content }) => {
    const updates = content.constructionUpdates.split('\n').filter(item => item.trim());

    return (
        <section className="construction-updates">
            <div className="container">
                <h2 className="section-title">Construction Updates</h2>
                <div className="updates-grid">
                    {updates.map((update, index) => (
                        <div key={index} className="update-card">
                            <div className="update-date">
                                {new Date().toLocaleDateString()}
                            </div>
                            <p>{update}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ConstructionUpdates;
