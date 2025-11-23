import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export function useNotifications() {
  return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]); // Persistent list (e.g., overdue alerts)
  const [toasts, setToasts] = useState([]); // Ephemeral popups (e.g., "Task added")

  // Load notifications from local storage
  useEffect(() => {
    const stored = localStorage.getItem('notifications');
    if (stored) {
      setNotifications(JSON.parse(stored));
    }
  }, []);

  // Save notifications to local storage
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      read: false,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const removeToast = (id) => {
      setToasts(prev => prev.filter(t => t.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const value = {
    notifications,
    toasts,
    addNotification,
    showToast,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    removeToast,
    unreadCount
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Toast Container Rendered Here Globally */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast ${toast.type}`} onClick={() => removeToast(toast.id)}>
            <div className="toast-icon">
                {toast.type === 'success' && <i className="fas fa-check-circle"></i>}
                {toast.type === 'error' && <i className="fas fa-exclamation-circle"></i>}
                {toast.type === 'warning' && <i className="fas fa-exclamation-triangle"></i>}
                {toast.type === 'info' && <i className="fas fa-info-circle"></i>}
            </div>
            <div className="toast-content">
              <div className="toast-message">{toast.message}</div>
            </div>
            <button className="toast-close" style={{background:'none', border:'none', cursor:'pointer', color:'inherit'}}>
                <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

