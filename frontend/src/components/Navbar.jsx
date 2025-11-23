import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="nav-content">
        <Link to="/" className="nav-brand" onClick={() => setIsOpen(false)}>
          TaskFlow <span style={{fontSize: '1rem', verticalAlign: 'super', marginLeft: '2px'}}>©</span>
        </Link>
        
        <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
          <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>

        {/* Menu */}
        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-link ${isActive('/')}`} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/features" className={`nav-link ${isActive('/features')}`} onClick={() => setIsOpen(false)}>Features</Link>
          <Link to="/pricing" className={`nav-link ${isActive('/pricing')}`} onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link to="/help" className={`nav-link ${isActive('/help')}`} onClick={() => setIsOpen(false)}>Help</Link>
          <Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={() => setIsOpen(false)}>Contact</Link>
          
          <Link to="/dashboard" className="nav-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
          <Link to="/login" className="nav-link" style={{fontWeight: '600', color: 'var(--primary-600)'}} onClick={() => setIsOpen(false)}>Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
