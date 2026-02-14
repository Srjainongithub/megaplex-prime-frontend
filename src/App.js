import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [page, setPage] = useState('home');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [content, setContent] = useState({});
    const [editContent, setEditContent] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/content');
            setContent(res.data);
            setEditContent(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    // LOGIN PAGE
    if (page === 'login') {
        return (
            <div style={styles.loginContainer}>
                <div style={styles.loginBox}>
                    <h2 style={styles.loginTitle}>Admin Login</h2>
                    <input 
                        placeholder="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    <button onClick={async () => {
                        const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
                        if (res.data.success) {
                            setIsLoggedIn(true);
                            setPage('admin');
                        } else {
                            alert('Invalid credentials');
                        }
                    }} style={styles.loginBtn}>
                        Login
                    </button>
                    <button onClick={() => setPage('home')} style={styles.backBtn}>
                        Back to Home
                    </button>
                    <div style={styles.loginInfo}>
                        <p>Use: admin@gmail.com / 1234</p>
                    </div>
                </div>
            </div>
        );
    }

    // ADMIN PANEL
    if (page === 'admin' && isLoggedIn) {
        return (
            <div style={styles.adminContainer}>
                <div style={styles.adminHeader}>
                    <h2>Edit Content</h2>
                    <button onClick={() => {
                        setIsLoggedIn(false);
                        setPage('home');
                    }} style={styles.logoutBtn}>
                        Logout
                    </button>
                </div>
                {Object.keys(editContent).map(key => (
                    <div key={key} style={styles.editSection}>
                        <label style={styles.label}>{key}</label>
                        <textarea
                            value={editContent[key] || ''}
                            onChange={(e) => setEditContent({...editContent, [key]: e.target.value})}
                            rows="3"
                            style={styles.textarea}
                        />
                    </div>
                ))}
                <button onClick={async () => {
                    await axios.put('http://localhost:5000/api/content', editContent);
                    setContent(editContent);
                    alert('Saved!');
                    setPage('home');
                }} style={styles.saveBtn}>
                    Save Changes
                </button>
            </div>
        );
    }

    // HOME PAGE - WITH ALL IMAGES
    return (
        <div style={styles.app}>
            {/* Navbar */}
            <nav style={styles.navbar}>
                <h2 style={styles.logo}>VIGHNAHARTA INFINITY</h2>
                <button onClick={() => setPage('login')} style={styles.adminBtn}>
                    Admin
                </button>
            </nav>

            {/* Hero Section with Image */}
            <div style={styles.hero}>
                <img src="/images/hero-bg.jpg" alt="hero" style={styles.heroImage} />
                <div style={styles.heroOverlay}>
                    <h1 style={styles.heroTitle}>THINKING OF A FANTASTIC VICINITY?</h1>
                    <p style={styles.heroSubtitle}>20+ PODIUM LUXURIOUS AMENITIES | SPACIOUS BALCONY HOMES*</p>
                    
                    <div style={styles.priceCards}>
                        <div style={styles.priceCard}>
                            <h3>SMART 1 BHK</h3>
                            <p style={styles.price}>@ 74.99 Lacs*</p>
                            <p style={styles.priceOld}>69.99 Lacs* onwards</p>
                        </div>
                        <div style={styles.priceCard}>
                            <h3>PREMIUM 2 BHK</h3>
                            <p style={styles.price}>@ 1.05 CR*</p>
                            <p style={styles.priceOld}>96.99 Lacs* onwards</p>
                        </div>
                    </div>

                    <p style={styles.location}>BLDG. NO. 223/224, CIRCLE: KANNAMWAR NAGAR I, VIKHIROLI (EAST)</p>
                </div>
            </div>

            {/* About Project */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>About Project</h2>
                <div style={styles.aboutGrid}>
                    <div style={styles.aboutText}>
                        <p>{content.about || 'At Vighnaharta Enclave, every detail reflects the grandeur of life...'}</p>
                        <p style={styles.aboutQuote}>"{content.aboutQuote || 'The moment I entered the house, it felt welcomed'}"</p>
                        <button style={styles.brochureBtn}>Download Brochure</button>
                    </div>
                    <img src="/images/about.jpg" alt="about" style={styles.aboutImg} />
                </div>
            </div>

            {/* Amenities with Images */}
            <div style={{...styles.section, backgroundColor: '#f8f9fa'}}>
                <h2 style={styles.sectionTitle}>Amenities</h2>
                <p style={styles.amenitiesSub}>Thoughtfully crafted surroundings that reflect tradition, comfort, and a human-centered design approach.</p>
                
                <div style={styles.amenitiesGrid}>
                    {[
                        { name: 'Gymnasium', img: 'gym.jpg' },
                        { name: 'Kids Play Area', img: 'kids.jpg' },
                        { name: 'Swimming Pool', img: 'pool.jpg' },
                        { name: 'Jogging Track', img: 'jogging.jpg' },
                        { name: 'Yoga Deck', img: 'yoga.jpg' },
                        { name: 'Garden', img: 'garden.jpg' }
                    ].map(item => (
                        <div key={item.name} style={styles.amenityCard}>
                            <img src={`/images/${item.img}`} alt={item.name} style={styles.amenityImg} />
                            <p>{item.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Buildings with Images */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Explore More Buildings in the Township</h2>
                <div style={styles.buildingsGrid}>
                    {[1,2,3].map(i => (
                        <div key={i} style={styles.buildingCard}>
                            <img src={`/images/building${i}.jpg`} alt="building" style={styles.buildingImg} />
                            <h3>Building {i}</h3>
                            <p style={styles.buildingTag}>Newly Launched</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Construction Updates with Images */}
            <div style={{...styles.section, backgroundColor: '#f8f9fa'}}>
                <h2 style={styles.sectionTitle}>Construction Updates</h2>
                <div style={styles.updatesGrid}>
                    {[1,2].map(i => (
                        <div key={i} style={styles.updateCard}>
                            <img src={`/images/construction${i}.jpg`} alt="update" style={styles.updateImg} />
                            <p>Completed House {i}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
                <div style={styles.faqList}>
                    {[1,2,3,4,5].map(i => (
                        <div key={i} style={styles.faqItem}>
                            <p>• What makes Beautiful Design so trusted?</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles = {
    app: { fontFamily: 'Arial, sans-serif' },
    
    navbar: {
        backgroundColor: '#1a237e',
        color: 'white',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    logo: { margin: 0, fontSize: '20px' },
    adminBtn: {
        backgroundColor: 'transparent',
        border: '1px solid white',
        color: 'white',
        padding: '5px 15px',
        cursor: 'pointer'
    },
    
    // Hero
    hero: {
        position: 'relative',
        height: '600px',
        color: 'white'
    },
    heroImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    heroOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px'
    },
    heroTitle: { fontSize: '36px', marginBottom: '10px' },
    heroSubtitle: { fontSize: '16px', marginBottom: '30px' },
    priceCards: {
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        margin: '40px 0'
    },
    priceCard: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: '20px',
        borderRadius: '8px',
        minWidth: '200px'
    },
    price: { fontSize: '24px', fontWeight: 'bold', color: '#ffd700' },
    priceOld: { textDecoration: 'line-through', fontSize: '14px' },
    location: { fontSize: '14px', marginTop: '20px' },
    
    // Common
    section: { padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' },
    sectionTitle: { fontSize: '28px', marginBottom: '20px' },
    
    // About
    aboutGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        alignItems: 'center'
    },
    aboutText: { lineHeight: '1.6' },
    aboutQuote: { 
        fontStyle: 'italic', 
        color: '#1a237e',
        margin: '20px 0',
        paddingLeft: '20px',
        borderLeft: '3px solid #1a237e'
    },
    aboutImg: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        borderRadius: '10px'
    },
    brochureBtn: {
        backgroundColor: '#1a237e',
        color: 'white',
        border: 'none',
        padding: '12px 30px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
    },
    
    // Amenities
    amenitiesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '25px',
        marginTop: '30px'
    },
    amenityCard: {
        backgroundColor: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    amenityImg: {
        width: '100%',
        height: '150px',
        objectFit: 'cover'
    },
    
    // Buildings
    buildingsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '30px',
        marginTop: '30px'
    },
    buildingCard: {
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        overflow: 'hidden'
    },
    buildingImg: {
        width: '100%',
        height: '200px',
        objectFit: 'cover'
    },
    buildingTag: {
        color: '#4caf50',
        fontSize: '14px',
        margin: '10px 0'
    },
    
    // Updates
    updatesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '30px',
        marginTop: '20px'
    },
    updateCard: {
        backgroundColor: 'white',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    updateImg: {
        width: '100%',
        height: '250px',
        objectFit: 'cover'
    },
    
    // FAQ
    faqList: { marginTop: '20px' },
    faqItem: { 
        padding: '15px', 
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f5f5f5',
        marginBottom: '5px',
        borderRadius: '5px'
    },

    // Login styles
    loginContainer: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a237e'
    },
    loginBox: {
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px'
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ddd',
        borderRadius: '4px'
    },
    loginBtn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#1a237e',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        margin: '10px 0'
    },
    backBtn: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    loginInfo: {
        textAlign: 'center',
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '4px'
    },

    // Admin panel styles
    adminContainer: {
        maxWidth: '800px',
        margin: '40px auto',
        padding: '20px'
    },
    adminHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
    },
    logoutBtn: {
        padding: '8px 16px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    editSection: { marginBottom: '20px' },
    label: { display: 'block', marginBottom: '5px', fontWeight: 'bold' },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px'
    },
    saveBtn: {
        padding: '12px 24px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};

export default App;