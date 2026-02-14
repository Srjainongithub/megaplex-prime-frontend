// frontend/src/pages/AdminPanel.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const AdminPanel = ({ setIsAdmin }) => {
    const [content, setContent] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/admin-login');
            return;
        }
        fetchContent();
    }, [navigate]);

    const fetchContent = async () => {
        try {
            const response = await axios.get('/content');
            setContent(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching content:', error);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setContent({
            ...content,
            [e.target.name]: e.target.value
        });
    };

    const handleSave = async () => {
        setSaving(true);
        setMessage('');
        
        try {
            await axios.put('/content', content);
            setMessage({ type: 'success', text: 'Content updated successfully!' });
        } catch (error) {
            setMessage({ type: 'error', text: 'Error updating content' });
        } finally {
            setSaving(false);
            setTimeout(() => setMessage(''), 3000);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAdmin');
        setIsAdmin(false);
        navigate('/');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px'
            }}>
                <h1>Admin Panel - Megaplex Prime</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
            
            {message && (
                <div style={{
                    padding: '10px',
                    background: message.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: message.type === 'success' ? '#155724' : '#721c24',
                    borderRadius: '5px',
                    marginBottom: '20px'
                }}>
                    {message.text}
                </div>
            )}
            
            <div style={{ maxWidth: '800px' }}>
                {Object.keys(content).map(key => (
                    <div key={key} style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                            {key}
                        </label>
                        <textarea
                            name={key}
                            value={content[key] || ''}
                            onChange={handleChange}
                            rows="4"
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px'
                            }}
                        />
                    </div>
                ))}
                
                <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{
                        padding: '10px 20px',
                        background: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    {saving ? 'Saving...' : 'Save All Changes'}
                </button>
            </div>
        </div>
    );
};

export default AdminPanel;