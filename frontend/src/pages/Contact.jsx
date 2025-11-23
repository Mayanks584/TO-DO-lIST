import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate sending
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section" style={{textAlign: 'center', padding: '8rem 2rem 4rem', background: 'linear-gradient(135deg, #4a90e2 0%, #1eb6f9 100%)', color: 'white'}}>
        <h1 style={{fontSize: '3rem', marginBottom: '1rem', fontWeight: '300'}}>Get in Touch</h1>
        <p style={{fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </section>

      {/* Contact Content */}
      <div className="contact-container" style={{maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem'}}>
        {/* Contact Information */}
        <div className="contact-info" style={{background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(74, 144, 226, 0.15)'}}>
          <h2 style={{fontSize: '2rem', marginBottom: '2rem', color: '#4a90e2'}}>Contact Information</h2>
          
          <ContactItem icon="fas fa-map-marker-alt" title="Address" content={<>123 Business Street<br/>Tech City, TC 12345<br/>United States</>} />
          <ContactItem icon="fas fa-phone" title="Phone" content="+1 (555) 123-4567" />
          <ContactItem icon="fas fa-envelope" title="Email" content="support@taskflow.com" />
          <ContactItem icon="fas fa-clock" title="Business Hours" content={<>Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM<br/>Sunday: Closed</>} />
        </div>

        {/* Contact Form */}
        <div className="contact-form" style={{background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(74, 144, 226, 0.15)'}}>
          <h2 style={{fontSize: '2rem', marginBottom: '2rem', color: '#4a90e2'}}>Send us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#222'}}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '1rem'}} />
            </div>
            
            <div className="form-group" style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#222'}}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required style={{width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '1rem'}} />
            </div>
            
            <div className="form-group" style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#222'}}>Subject</label>
              <select name="subject" value={formData.subject} onChange={handleChange} required style={{width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '1rem'}}>
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="billing">Billing Question</option>
                <option value="feature">Feature Request</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="form-group" style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#222'}}>Message</label>
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us how we can help you..." required style={{width: '100%', padding: '1rem', border: '1px solid #ddd', borderRadius: '0.5rem', fontSize: '1rem', minHeight: '120px', resize: 'vertical'}}></textarea>
            </div>
            
            <button type="submit" disabled={status === 'sending'} style={{background: '#4a90e2', color: 'white', padding: '1rem 2rem', border: 'none', borderRadius: '2rem', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', width: '100%', opacity: status === 'sending' ? 0.7 : 1}}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'success' && <div style={{marginTop: '1rem', textAlign: 'center', color: '#2ecc71', fontWeight: '600'}}>Thank you for your message! We'll get back to you within 24 hours.</div>}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const ContactItem = ({ icon, title, content }) => (
  <div className="contact-item" style={{display: 'flex', alignItems: 'center', marginBottom: '2rem', padding: '1rem', background: '#f8fafd', borderRadius: '0.5rem'}}>
    <div className="contact-icon" style={{fontSize: '1.5rem', color: '#4a90e2', marginRight: '1rem', width: '40px', textAlign: 'center'}}>
      <i className={icon}></i>
    </div>
    <div className="contact-details">
      <h3 style={{fontSize: '1.1rem', marginBottom: '0.5rem', color: '#222'}}>{title}</h3>
      <p style={{color: '#666', margin: 0}}>{content}</p>
    </div>
  </div>
);

export default Contact;

