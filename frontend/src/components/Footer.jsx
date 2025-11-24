import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" style={{background: '#2c3e50', color: '#ecf0f1', padding: '3rem 0 1rem'}}>
      <div className="footer-content" style={{maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', padding: '0 2rem'}}>
        <div className="footer-section">
          <h3 style={{color: '#4a90e2', marginBottom: '1rem', fontSize: '1.3rem'}}>TaskFlow</h3>
          <p style={{lineHeight: 1.6, marginBottom: '1.5rem'}}>The ultimate task management solution for teams and individuals. Organize your work, collaborate with your team, and achieve your goals.</p>
          <div className="social-links" style={{display: 'flex', gap: '1rem'}}>
            {['facebook', 'twitter', 'linkedin', 'github'].map(social => (
              <a key={social} href="#" aria-label={social} style={{display: 'inline-block', width: '40px', height: '40px', background: '#4a90e2', color: 'white', textAlign: 'center', lineHeight: '40px', borderRadius: '50%', transition: 'all 0.3s'}}>
                <i className={`fab fa-${social}`}></i>
              </a>
            ))}
          </div>
        </div>
        
        <div className="footer-section">
          <h4 style={{color: '#bdc3c7', marginBottom: '1rem', fontSize: '1.1rem'}}>Product</h4>
          <ul style={{listStyle: 'none', padding: 0}}>
            <li style={{marginBottom: '0.5rem'}}><Link to="/features" style={{color: '#bdc3c7', textDecoration: 'none'}}>Features</Link></li>
            <li style={{marginBottom: '0.5rem'}}><Link to="/pricing" style={{color: '#bdc3c7', textDecoration: 'none'}}>Pricing</Link></li>
            <li style={{marginBottom: '0.5rem'}}><Link to="/dashboard" style={{color: '#bdc3c7', textDecoration: 'none'}}>Dashboard</Link></li>
            <li style={{marginBottom: '0.5rem'}}><Link to="/register" style={{color: '#bdc3c7', textDecoration: 'none'}}>Get Started</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 style={{color: '#bdc3c7', marginBottom: '1rem', fontSize: '1.1rem'}}>Company</h4>
          <ul style={{listStyle: 'none', padding: 0}}>
            <li style={{marginBottom: '0.5rem'}}><Link to="/about" style={{color: '#bdc3c7', textDecoration: 'none'}}>About Us</Link></li>
            <li style={{marginBottom: '0.5rem'}}><Link to="/contact" style={{color: '#bdc3c7', textDecoration: 'none'}}>Contact</Link></li>
            <li style={{marginBottom: '0.5rem'}}><Link to="/help" style={{color: '#bdc3c7', textDecoration: 'none'}}>Help Center</Link></li>
            <li style={{marginBottom: '0.5rem'}}><Link to="/privacy" style={{color: '#bdc3c7', textDecoration: 'none'}}>Privacy Policy</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 style={{color: '#bdc3c7', marginBottom: '1rem', fontSize: '1.1rem'}}>Resources</h4>
          <ul style={{listStyle: 'none', padding: 0}}>
            <li style={{marginBottom: '0.5rem'}}><Link to="/help" style={{color: '#bdc3c7', textDecoration: 'none'}}>Documentation</Link></li>
            <li style={{marginBottom: '0.5rem'}}><Link to="/contact" style={{color: '#bdc3c7', textDecoration: 'none'}}>Support</Link></li>
            <li style={{marginBottom: '0.5rem'}}><Link to="/help" style={{color: '#bdc3c7', textDecoration: 'none'}}>Tutorials</Link></li>
            <li style={{marginBottom: '0.5rem'}}><Link to="/help" style={{color: '#bdc3c7', textDecoration: 'none'}}>API</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom" style={{textAlign: 'center', padding: '1.5rem 0', borderTop: '1px solid #34495e', marginTop: '2rem'}}>
        <p>&copy; 2025 TaskFlow. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

