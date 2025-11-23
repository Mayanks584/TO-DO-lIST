import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Pricing = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section" style={{textAlign: 'center', padding: '8rem 2rem 4rem', background: 'linear-gradient(135deg, #4a90e2 0%, #1eb6f9 100%)', color: 'white'}}>
        <h1 style={{fontSize: '3rem', marginBottom: '1rem', fontWeight: '300'}}>Simple, Transparent Pricing</h1>
        <p style={{fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>Choose the plan that's right for you. Start free and upgrade as you grow.</p>
      </section>

      {/* Pricing Grid */}
      <div className="pricing-container" style={{maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem'}}>
        <div className="pricing-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem'}}>
          
          {/* Free Plan */}
          <PricingCard 
            name="Free" 
            price="0" 
            description="Perfect for individuals getting started"
            features={[
              { text: 'Up to 10 tasks', included: true },
              { text: 'Basic task management', included: true },
              { text: 'Mobile access', included: true },
              { text: 'Team collaboration', included: false },
              { text: 'Advanced analytics', included: false },
              { text: 'Priority support', included: false }
            ]}
            buttonText="Get Started Free"
            isSecondary={true}
          />

          {/* Pro Plan */}
          <PricingCard 
            name="Pro" 
            price="9" 
            description="Great for small teams and professionals"
            isPopular={true}
            features={[
              { text: 'Unlimited tasks', included: true },
              { text: 'Team collaboration', included: true },
              { text: 'Advanced filtering', included: true },
              { text: 'File attachments', included: true },
              { text: 'Email notifications', included: true },
              { text: 'Advanced analytics', included: false }
            ]}
            buttonText="Start Pro Trial"
          />

          {/* Business Plan */}
          <PricingCard 
            name="Business" 
            price="19" 
            description="Perfect for growing businesses"
            features={[
              { text: 'Everything in Pro', included: true },
              { text: 'Advanced analytics', included: true },
              { text: 'Custom workflows', included: true },
              { text: 'API access', included: true },
              { text: 'Priority support', included: true },
              { text: 'Custom integrations', included: true }
            ]}
            buttonText="Start Business Trial"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <section className="faq-section" style={{background: 'white', padding: '4rem 2rem', marginTop: '4rem'}}>
        <div className="faq-container" style={{maxWidth: '800px', margin: '0 auto'}}>
          <h2 className="faq-title" style={{textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: '#222'}}>Frequently Asked Questions</h2>
          
          <FaqItem 
            question="Can I change my plan anytime?" 
            answer="Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
            isOpen={activeFaq === 0}
            onClick={() => toggleFaq(0)}
          />
          <FaqItem 
            question="Is there a free trial for paid plans?" 
            answer="Yes, we offer a 14-day free trial for all paid plans. No credit card required to start your trial."
            isOpen={activeFaq === 1}
            onClick={() => toggleFaq(1)}
          />
          <FaqItem 
            question="What payment methods do you accept?" 
            answer="We accept all major credit cards (Visa, MasterCard, American Express) and PayPal."
            isOpen={activeFaq === 2}
            onClick={() => toggleFaq(2)}
          />
          <FaqItem 
            question="Can I cancel my subscription anytime?" 
            answer="Absolutely! You can cancel your subscription at any time. You'll continue to have access until the end of your current billing period."
            isOpen={activeFaq === 3}
            onClick={() => toggleFaq(3)}
          />
        </div>
      </section>

      <Footer />
    </div>
  );
};

const PricingCard = ({ name, price, description, features, buttonText, isPopular, isSecondary }) => (
  <div className={`pricing-card ${isPopular ? 'popular' : ''}`} style={{
    background: 'white', 
    padding: '2rem', 
    borderRadius: '1rem', 
    boxShadow: '0 8px 32px rgba(74, 144, 226, 0.15)', 
    textAlign: 'center', 
    position: 'relative', 
    border: isPopular ? '3px solid #4a90e2' : 'none',
    transform: isPopular ? 'scale(1.05)' : 'none'
  }}>
    {isPopular && (
      <div className="popular-badge" style={{
        position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', 
        background: '#4a90e2', color: 'white', padding: '0.5rem 1rem', 
        borderRadius: '1rem', fontSize: '0.9rem', fontWeight: '600'
      }}>
        Most Popular
      </div>
    )}
    <div className="plan-name" style={{fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#222'}}>{name}</div>
    <div className="plan-price" style={{fontSize: '3rem', fontWeight: '300', color: '#4a90e2', marginBottom: '0.5rem'}}>
      ${price}<span style={{fontSize: '1rem', color: '#666'}}>/month</span>
    </div>
    <div className="plan-description" style={{color: '#666', marginBottom: '2rem'}}>{description}</div>
    <ul className="plan-features" style={{listStyle: 'none', marginBottom: '2rem', padding: 0}}>
      {features.map((feature, index) => (
        <li key={index} style={{padding: '0.5rem 0', borderBottom: index !== features.length - 1 ? '1px solid #eee' : 'none'}}>
          <i className={`fas ${feature.included ? 'fa-check' : 'fa-times'}`} style={{color: feature.included ? '#2ecc71' : '#ccc', marginRight: '0.5rem'}}></i>
          <span style={{color: feature.included ? '#222' : '#ccc'}}>{feature.text}</span>
        </li>
      ))}
    </ul>
    <a href="/register" className="plan-btn" style={{
      display: 'inline-block', width: '100%', padding: '1rem 2rem', 
      background: isSecondary ? '#f8f9fa' : '#4a90e2', 
      color: isSecondary ? '#4a90e2' : 'white', 
      border: isSecondary ? '2px solid #4a90e2' : 'none',
      borderRadius: '2rem', fontWeight: '600', textDecoration: 'none', transition: 'background 0.3s'
    }}>
      {buttonText}
    </a>
  </div>
);

const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="faq-item" style={{marginBottom: '1rem', border: '1px solid #eee', borderRadius: '0.5rem'}}>
    <div className="faq-question" onClick={onClick} style={{padding: '1rem', background: '#f8f9fa', cursor: 'pointer', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      {question}
      <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
    </div>
    {isOpen && (
      <div className="faq-answer" style={{padding: '1rem', borderTop: '1px solid #eee'}}>
        {answer}
      </div>
    )}
  </div>
);

export default Pricing;
