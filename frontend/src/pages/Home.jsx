import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  // Animation logic converted to React hook
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll('.stat-number');
          statNumbers.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, ''));
            const suffix = finalValue.replace(/[\d,]/g, '');

            let currentValue = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
              currentValue += increment;
              if (currentValue >= numericValue) {
                stat.textContent = finalValue;
                clearInterval(timer);
              } else {
                stat.textContent = Math.floor(currentValue).toLocaleString() + suffix;
              }
            }, 30);
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="hero-section" style={{background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '80px'}}>
        <div className="container" style={{display: 'flex', flexWrap: 'wrap', minHeight: '100vh', maxWidth: '1400px', margin: '0 auto', alignItems: 'center', width: '100%'}}>
          <div className="left-section" style={{flex: '1 1 500px', padding: '2rem 3rem', maxWidth: '600px'}}>
            <div className="brand" style={{fontSize: '2rem', fontWeight: '700', color: '#4a90e2', marginBottom: '3rem', letterSpacing: '1px'}}>TaskFlow</div>

            <div className="hero-content">
              <div className="free-text" style={{fontSize: '4rem', fontWeight: '300', color: '#4a90e2', letterSpacing: '3px', marginBottom: '1rem', lineHeight: 1}}>FREE</div>

              <div className="main-heading" style={{fontSize: '4rem', fontWeight: '300', color: '#333', lineHeight: 1.1, marginBottom: '2rem', letterSpacing: '2px'}}>
                TASK<br />
                CHECKLIST<br />
                APP
              </div>

              <div className="description" style={{fontSize: '1.1rem', color: '#666', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '90%'}}>
                Organize and manage your team like a boss with TaskFlow, a free online task checklist app packing
                more capabilities than you can imagine.
              </div>

              <Link to="/register" className="get-started-btn" style={{background: '#4a90e2', color: 'white', padding: '1rem 2.5rem', border: 'none', borderRadius: '2rem', fontSize: '1.1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(74, 144, 226, 0.3)', textDecoration: 'none', display: 'inline-block'}}>
                Get Started
              </Link>
            </div>
          </div>

          <div className="right-section" style={{flex: '1 1 500px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', padding: '2rem'}}>
             {/* Placeholder for the dashboard mockup visualization - simplified for React */}
             <div style={{width: '100%', maxWidth: '600px', height: '400px', background: 'white', borderRadius: '1rem', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '1rem'}}>
                <div style={{width: '100%', height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexDirection: 'column'}}>
                    <i className="fas fa-tasks" style={{fontSize: '5rem', marginBottom: '1rem'}}></i>
                    <span style={{fontSize: '1.5rem', fontWeight: 'bold'}}>Productivity Awaits</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section features-section" style={{padding: '5rem 0', background: 'white'}}>
        <div className="features-container" style={{maxWidth: '1200px', margin: '0 auto', padding: '0 2rem'}}>
          <h2 className="section-title" style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: '#333'}}>Why Choose TaskFlow?</h2>
          <div className="features-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
            <FeatureCard icon="fas fa-tasks" title="Smart Task Management" description="Create, organize, and track tasks with ease. Set due dates, priorities, and categories to stay on top of your work." />
            <FeatureCard icon="fas fa-users" title="Team Collaboration" description="Work together seamlessly with your team. Share tasks, assign responsibilities, and track progress in real-time." />
            <FeatureCard icon="fas fa-mobile-alt" title="Mobile Ready" description="Access your tasks anywhere, anytime. Our responsive design works perfectly on all devices and screen sizes." />
            <FeatureCard icon="fas fa-chart-line" title="Progress Tracking" description="Monitor your productivity with detailed analytics and reports. See what's working and what needs improvement." />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section" style={{padding: '5rem 0', background: '#4a90e2', color: 'white'}}>
        <div className="stats-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto', padding: '0 2rem'}}>
          <StatItem number="50K+" label="Active Users" />
          <StatItem number="1M+" label="Tasks Completed" />
          <StatItem number="99.9%" label="Uptime" />
          <StatItem number="24/7" label="Support" />
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card" style={{background: '#f8fafd', padding: '2rem', borderRadius: '1rem', textAlign: 'center', boxShadow: '0 8px 32px rgba(74, 144, 226, 0.15)'}}>
    <div className="feature-icon" style={{fontSize: '3rem', color: '#4a90e2', marginBottom: '1rem'}}>
      <i className={icon}></i>
    </div>
    <h3 style={{fontSize: '1.3rem', marginBottom: '1rem', color: '#333'}}>{title}</h3>
    <p style={{color: '#666', lineHeight: 1.6}}>{description}</p>
  </div>
);

const StatItem = ({ number, label }) => (
  <div className="stat-item" style={{textAlign: 'center'}}>
    <div className="stat-number" style={{fontSize: '3rem', fontWeight: '700', marginBottom: '0.5rem'}}>{number}</div>
    <div className="stat-label" style={{fontSize: '1.1rem', opacity: 0.9}}>{label}</div>
  </div>
);

export default Home;
