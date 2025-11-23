import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Privacy = () => {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section" style={{textAlign: 'center', padding: '8rem 2rem 4rem', background: 'linear-gradient(135deg, #4a90e2 0%, #1eb6f9 100%)', color: 'white'}}>
        <h1 style={{fontSize: '3rem', marginBottom: '1rem', fontWeight: '300'}}>Privacy Policy</h1>
        <p style={{fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>Your privacy is important to us. Learn how we collect, use, and protect your information.</p>
      </section>

      {/* Privacy Content */}
      <div className="privacy-container" style={{maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem'}}>
        <div className="privacy-content" style={{background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(74, 144, 226, 0.15)'}}>
          <div className="last-updated" style={{background: '#f8fafd', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', textAlign: 'center', fontStyle: 'italic', color: '#666'}}>
            Last updated: January 15, 2025
          </div>

          <Section title="1. Introduction">
            <p>Welcome to TaskFlow ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our task management application and related services.</p>
            <p>By using our service, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.</p>
          </Section>

          <Section title="2. Information We Collect">
            <h3 style={{fontSize: '1.3rem', marginBottom: '1rem', marginTop: '2rem', color: '#222'}}>Personal Information</h3>
            <p>We may collect the following types of personal information:</p>
            <ul style={{marginBottom: '1.5rem', marginLeft: '2rem', color: '#555'}}>
              <li>Name and email address when you create an account</li>
              <li>Profile information you choose to provide</li>
              <li>Communication preferences</li>
              <li>Payment information for paid subscriptions</li>
            </ul>

            <h3 style={{fontSize: '1.3rem', marginBottom: '1rem', marginTop: '2rem', color: '#222'}}>Usage Information</h3>
            <p>We automatically collect certain information about your use of our service:</p>
            <ul style={{marginBottom: '1.5rem', marginLeft: '2rem', color: '#555'}}>
              <li>Tasks you create, edit, and manage</li>
              <li>Application usage patterns and preferences</li>
              <li>Device information and browser type</li>
              <li>IP address and location data</li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the collected information for various purposes:</p>
            <ul style={{marginBottom: '1.5rem', marginLeft: '2rem', color: '#555'}}>
              <li>To provide and maintain our service</li>
              <li>To notify you about changes to our service</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information to improve our service</li>
              <li>To monitor the usage of our service</li>
            </ul>
          </Section>

          <Section title="4. Data Storage and Security">
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is stored on secure servers with encryption both in transit and at rest.</p>
            <p>However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.</p>
          </Section>

          <Section title="5. Your Rights and Choices">
            <p>You have the following rights regarding your personal information:</p>
            <ul style={{marginBottom: '1.5rem', marginLeft: '2rem', color: '#555'}}>
              <li>Access: Request a copy of your personal data</li>
              <li>Correction: Update or correct inaccurate information</li>
              <li>Deletion: Request deletion of your personal data</li>
              <li>Opt-out: Unsubscribe from marketing communications</li>
            </ul>
          </Section>

          <div className="contact-info" style={{background: '#4a90e2', color: 'white', padding: '2rem', borderRadius: '1rem', marginTop: '2rem', textAlign: 'center'}}>
            <h3 style={{marginBottom: '1rem'}}>Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br/><br/>
              Email: <a href="mailto:privacy@taskflow.com" style={{color: 'white', textDecoration: 'underline'}}>privacy@taskflow.com</a>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const Section = ({ title, children }) => (
  <div style={{marginBottom: '2rem'}}>
    <h2 style={{fontSize: '1.8rem', marginBottom: '1.5rem', color: '#4a90e2', borderBottom: '2px solid #4a90e2', paddingBottom: '0.5rem'}}>{title}</h2>
    <div style={{color: '#555', lineHeight: '1.6'}}>
      {children}
    </div>
  </div>
);

export default Privacy;

