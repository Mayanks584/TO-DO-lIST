import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { NotificationProvider } from './context/NotificationContext';

// Components
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import About from './pages/About';
import Layout from './components/Layout';
import Calendar from './pages/Calendar';
import Analytics from './pages/Analytics';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <div className="loading-state">Loading...</div>;
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <TaskProvider>
          <Router>
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/tasks" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/calendar" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Calendar />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/analytics" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Analytics />
                  </Layout>
                </ProtectedRoute>
              } 
            />
            </Routes>
          </Router>
        </TaskProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
