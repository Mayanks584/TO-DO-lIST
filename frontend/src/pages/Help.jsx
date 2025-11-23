import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Help = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section" style={{textAlign: 'center', padding: '8rem 2rem 4rem', background: 'linear-gradient(135deg, #4a90e2 0%, #1eb6f9 100%)', color: 'white'}}>
        <h1 style={{fontSize: '3rem', marginBottom: '1rem', fontWeight: '300'}}>Help Center</h1>
        <p style={{fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem'}}>Find answers to your questions and learn how to get the most out of TaskFlow.</p>
        <div className="search-box" style={{maxWidth: '500px', margin: '0 auto', position: 'relative'}}>
          <i className="fas fa-search" style={{position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#666'}}></i>
          <input type="text" placeholder="Search for help articles..." style={{width: '100%', padding: '1rem 1rem 1rem 3rem', border: 'none', borderRadius: '2rem', fontSize: '1.1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}} />
        </div>
      </section>

      {/* Help Content */}
      <div className="help-container" style={{maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem'}}>
        {/* Categories */}
        <div className="help-categories" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem'}}>
          <CategoryCard icon="fas fa-rocket" title="Getting Started" description="Learn the basics of using TaskFlow" count="8 articles" />
          <CategoryCard icon="fas fa-tasks" title="Task Management" description="Master task creation, editing, and organization" count="12 articles" />
          <CategoryCard icon="fas fa-users" title="Team Collaboration" description="Work effectively with your team members" count="6 articles" />
          <CategoryCard icon="fas fa-user-cog" title="Account & Settings" description="Manage your account and customize preferences" count="5 articles" />
          <CategoryCard icon="fas fa-tools" title="Troubleshooting" description="Solve common issues and technical problems" count="10 articles" />
          <CategoryCard icon="fas fa-mobile-alt" title="Mobile App" description="Use TaskFlow on your mobile devices" count="4 articles" />
        </div>

        {/* FAQ Section */}
        <div className="faq-section" style={{background: 'white', padding: '3rem', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(74, 144, 226, 0.15)', marginBottom: '3rem'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '2rem', color: '#4a90e2', textAlign: 'center'}}>Frequently Asked Questions</h2>
          
          <FaqItem 
            question="How do I create my first task?" 
            answer={
              <>
                <p>Creating your first task is easy:</p>
                <ul>
                  <li>Click the "Add New Task" button on your dashboard</li>
                  <li>Fill in the task title (required)</li>
                  <li>Add a description if needed</li>
                  <li>Set a due date</li>
                  <li>Choose a category</li>
                  <li>Click "Save Task"</li>
                </ul>
                <p>Your task will appear in your task list immediately.</p>
              </>
            }
            isOpen={activeFaq === 0}
            onClick={() => toggleFaq(0)}
          />
          
          <FaqItem 
            question="Can I organize tasks by categories?" 
            answer={
              <>
                <p>Yes! TaskFlow supports task categorization:</p>
                <ul>
                  <li>Default categories include Work, Personal, and Shopping</li>
                  <li>You can filter tasks by category using the dropdown filter</li>
                  <li>Categories help you organize and find tasks quickly</li>
                  <li>Each category has a distinct color for easy identification</li>
                </ul>
              </>
            }
            isOpen={activeFaq === 1}
            onClick={() => toggleFaq(1)}
          />

          <FaqItem 
            question="Is my data saved automatically?" 
            answer={
              <>
                <p>Yes, your data is automatically saved:</p>
                <ul>
                  <li>All tasks are saved to your browser's local storage</li>
                  <li>Changes are saved immediately when you create, edit, or delete tasks</li>
                  <li>Your tasks will persist between browser sessions</li>
                </ul>
              </>
            }
            isOpen={activeFaq === 2}
            onClick={() => toggleFaq(2)}
          />
        </div>

        {/* Contact Support */}
        <div className="contact-support" style={{background: '#4a90e2', color: 'white', padding: '3rem', borderRadius: '1rem', textAlign: 'center'}}>
          <h2 style={{fontSize: '2rem', marginBottom: '1rem'}}>Still Need Help?</h2>
          <p style={{marginBottom: '2rem', fontSize: '1.1rem'}}>Can't find what you're looking for? Our support team is here to help you succeed.</p>
          <a href="/contact" className="support-btn" style={{display: 'inline-block', padding: '1rem 2rem', background: 'white', color: '#4a90e2', textDecoration: 'none', borderRadius: '2rem', fontWeight: '600', transition: 'transform 0.3s'}}>Contact Support</a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

const CategoryCard = ({ icon, title, description, count }) => (
  <div className="category-card" style={{background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 8px 32px rgba(74, 144, 226, 0.15)', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.3s'}}>
    <div className="category-icon" style={{fontSize: '3rem', color: '#4a90e2', marginBottom: '1rem'}}>
      <i className={icon}></i>
    </div>
    <h3 style={{fontSize: '1.5rem', marginBottom: '1rem', color: '#222'}}>{title}</h3>
    <p style={{color: '#666', marginBottom: '1.5rem'}}>{description}</p>
    <div className="article-count" style={{color: '#4a90e2', fontWeight: '600'}}>{count}</div>
  </div>
);

const FaqItem = ({ question, answer, isOpen, onClick }) => (
  <div className="faq-item" style={{marginBottom: '1rem', border: '1px solid #eee', borderRadius: '0.5rem'}}>
    <div className="faq-question" onClick={onClick} style={{padding: '1.5rem', background: '#f8f9fa', cursor: 'pointer', fontWeight: '600', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      {question}
      <i className={`fas fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
    </div>
    {isOpen && (
      <div className="faq-answer" style={{padding: '1.5rem', borderTop: '1px solid #eee'}}>
        {answer}
      </div>
    )}
  </div>
);

export default Help;

