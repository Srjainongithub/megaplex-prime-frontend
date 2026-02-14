import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProjectOverview from '../components/ProjectOverview';
// ... other imports
import axios from '../axios';

const Home = () => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const response = await axios.get('/content');
            setContent(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <Hero content={content} />
            <ProjectOverview content={content} />
            {/* other components */}
        </div>
    );
};

export default Home;