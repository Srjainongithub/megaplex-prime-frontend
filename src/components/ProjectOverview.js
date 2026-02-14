// frontend/src/components/ProjectOverview.js

import React from 'react';
import './ProjectOverview.css';

const ProjectOverview = ({ content }) => {
    return (
        <section id="overview" className="project-overview">
            <div className="container">
                <h2 className="section-title">Project Overview</h2>
                <div className="overview-content">
                    <div className="overview-image">
                        <img src="/images/project.jpg" alt="Project Overview" />
                    </div>
                    <div className="overview-text">
                        <p>{content.projectOverview}</p>
                        <div className="highlights">
                            <div className="highlight">
                                <h3>10+</h3>
                                <p>Acres Land</p>
                            </div>
                            <div className="highlight">
                                <h3>1200+</h3>
                                <p>Apartments</p>
                            </div>
                            <div className="highlight">
                                <h3>75%</h3>
                                <p>Open Space</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectOverview;