import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div>
      <Navbar />
      
      <section className="hero-section" style={{textAlign: 'center', padding: '8rem 2rem 4rem', background: 'linear-gradient(135deg, #4a90e2 0%, #1eb6f9 100%)', color: 'white'}}>
        <h1 style={{fontSize: '3rem', marginBottom: '1rem', fontWeight: '300'}}>About TaskFlow</h1>
        <p style={{fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>We're on a mission to make task management simple, efficient, and accessible for everyone.</p>
      </section>

      <div style={{maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem', textAlign: 'center'}}>
        <p style={{fontSize: '1.2rem', color: '#666', marginBottom: '3rem', lineHeight: '1.8'}}>
          Founded in 2020, TaskFlow was born from a simple observation: most task management
          tools were either too complex for everyday users or too simple for growing teams.
          We set out to build a solution that bridges this gap.
        </p>
        
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.5rem', color: '#4a90e2', marginBottom: '0.5rem'}}>🚀</div>
            <h4 style={{marginBottom: '0.5rem'}}>Innovation</h4>
            <p style={{color: '#666', fontSize: '0.9rem'}}>Cutting-edge technology for productivity</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.5rem', color: '#4a90e2', marginBottom: '0.5rem'}}>👥</div>
            <h4 style={{marginBottom: '0.5rem'}}>User-Centric</h4>
            <p style={{color: '#666', fontSize: '0.9rem'}}>Every decision guided by user needs</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.5rem', color: '#4a90e2', marginBottom: '0.5rem'}}>💡</div>
            <h4 style={{marginBottom: '0.5rem'}}>Simplicity</h4>
            <p style={{color: '#666', fontSize: '0.9rem'}}>Powerful tools that are simple to use</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '2.5rem', color: '#4a90e2', marginBottom: '0.5rem'}}>🔒</div>
            <h4 style={{marginBottom: '0.5rem'}}>Trust</h4>
            <p style={{color: '#666', fontSize: '0.9rem'}}>Highest security standards for your data</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
