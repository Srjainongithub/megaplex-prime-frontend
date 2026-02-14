// frontend/src/pages/AdminLogin.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

const AdminLogin = ({ setIsAdmin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/auth/login', {
                email,
                password
            });

            if (response.data.success) {
                setIsAdmin(true);
                sessionStorage.setItem('isAdmin', 'true');
                navigate('/admin');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}>
            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                width: '100%',
                maxWidth: '400px'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Admin Login</h2>
                
                {error && (
                    <div style={{
                        background: '#ffebee',
                        color: '#c62828',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '20px'
                    }}>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@gmail.com"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px'
                            }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="1234"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '5px'
                            }}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;