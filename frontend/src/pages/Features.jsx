import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Features = () => {
  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section" style={{textAlign: 'center', padding: '8rem 2rem 4rem', background: 'linear-gradient(135deg, #4a90e2 0%, #1eb6f9 100%)', color: 'white'}}>
        <h1 style={{fontSize: '3rem', marginBottom: '1rem', fontWeight: '300'}}>Powerful Features for Better Productivity</h1>
        <p style={{fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>Discover all the tools you need to manage tasks, collaborate with your team, and achieve your goals efficiently.</p>
      </section>

      {/* Features Grid */}
      <div className="features-container" style={{maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem'}}>
        <div className="features-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem'}}>
          <FeatureCard 
            icon="fas fa-tasks" 
            title="Task Management" 
            description="Create, organize, and track tasks with ease. Set due dates, priorities, and categories to stay on top of your work." 
          />
          <FeatureCard 
            icon="fas fa-users" 
            title="Team Collaboration" 
            description="Work together seamlessly with your team. Share tasks, assign responsibilities, and track progress in real-time." 
          />
          <FeatureCard 
            icon="fas fa-chart-line" 
            title="Progress Tracking" 
            description="Monitor your productivity with detailed analytics and reports. See what's working and what needs improvement." 
          />
          <FeatureCard 
            icon="fas fa-mobile-alt" 
            title="Mobile Responsive" 
            description="Access your tasks anywhere, anytime. Our responsive design works perfectly on all devices and screen sizes." 
          />
          <FeatureCard 
            icon="fas fa-filter" 
            title="Smart Filtering" 
            description="Find what you need quickly with powerful search and filtering options. Sort by date, category, or status." 
          />
          <FeatureCard 
            icon="fas fa-bell" 
            title="Notifications" 
            description="Never miss a deadline with smart notifications and reminders. Stay informed about important updates." 
          />
          <FeatureCard 
            icon="fas fa-cloud" 
            title="Cloud Sync" 
            description="Your data is automatically synced across all devices. Access your tasks from anywhere with internet connection." 
          />
          <FeatureCard 
            icon="fas fa-shield-alt" 
            title="Secure & Private" 
            description="Your data is protected with enterprise-grade security. We respect your privacy and never share your information." 
          />
          <FeatureCard 
            icon="fas fa-palette" 
            title="Customizable" 
            description="Personalize your workspace with custom categories, themes, and layouts that match your workflow." 
          />
        </div>
      </div>

      {/* CTA Section */}
      <section className="cta-section" style={{background: '#4a90e2', color: 'white', textAlign: 'center', padding: '3rem 2rem', marginTop: '4rem'}}>
        <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>Ready to Get Started?</h2>
        <p style={{marginBottom: '2rem'}}>Join thousands of users who are already boosting their productivity with TaskFlow.</p>
        <a href="/register" className="cta-btn" style={{display: 'inline-block', padding: '1rem 2rem', background: 'white', color: '#4a90e2', textDecoration: 'none', borderRadius: '2rem', fontWeight: '600', transition: 'transform 0.3s'}}>Start Free Trial</a>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card" style={{background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(74, 144, 226, 0.15)', textAlign: 'center', transition: 'transform 0.3s'}}>
    <div className="feature-icon" style={{fontSize: '3rem', color: '#4a90e2', marginBottom: '1rem'}}>
      <i className={icon}></i>
    </div>
    <h3 style={{fontSize: '1.5rem', marginBottom: '1rem', color: '#222'}}>{title}</h3>
    <p style={{color: '#666', lineHeight: '1.6'}}>{description}</p>
  </div>
);

export default Features;

