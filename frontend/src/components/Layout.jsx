import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { useTasks } from '../context/TaskContext';

const Layout = ({ children }) => {
  const { currentUser, logout } = useAuth();
  const { unreadCount, notifications, markAsRead, markAllAsRead, addNotification } = useNotifications();
  const { tasks } = useTasks();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Check for overdue tasks
  useEffect(() => {
    if (!tasks) return;

    const checkOverdue = () => {
      const now = new Date();
      const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD

      tasks.forEach(task => {
        if (task.status !== 'completed' && task.dueDate && task.dueDate < todayStr) {
          // Prevent spamming: check if we already have an active notification for this
          const alreadyNotified = notifications.some(n => 
            n.message.includes(task.title) && !n.read
          );
          
          if (!alreadyNotified) {
            addNotification(`Task overdue: ${task.title}`, 'error');
          }
        }
      });
    };

    checkOverdue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]); // Check whenever tasks change

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notification-wrapper')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <i className="fas fa-check-circle"></i>
            <span>TaskFlow</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
            <i className="fas fa-th-large"></i>
            <span>Dashboard</span>
          </Link>
          <Link to="/dashboard/tasks" className={`nav-item ${location.pathname === '/dashboard/tasks' ? 'active' : ''}`}>
            <i className="fas fa-tasks"></i>
            <span>My Tasks</span>
          </Link>
          <Link to="/dashboard/calendar" className={`nav-item ${location.pathname === '/dashboard/calendar' ? 'active' : ''}`}>
            <i className="fas fa-calendar-alt"></i>
            <span>Calendar</span>
          </Link>
          <Link to="/dashboard/analytics" className={`nav-item ${location.pathname === '/dashboard/analytics' ? 'active' : ''}`}>
            <i className="fas fa-chart-line"></i>
            <span>Analytics</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-info">
              <span className="user-name">{currentUser?.email}</span>
              <span className="user-role">Free Plan</span>
            </div>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="top-header">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <i className="fas fa-bars"></i>
            </button>
            <div className="breadcrumb">
              Dashboard
            </div>
          </div>

          <div className="header-right">
            <div className="search-container">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search tasks..." />
            </div>
            
            <div className="notification-wrapper" style={{position: 'relative'}}>
                <button className="notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
                  <i className="fas fa-bell"></i>
                  {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                </button>

                {showNotifications && (
                    <div className="notification-dropdown">
                        <div className="notification-header">
                            <h3>Notifications</h3>
                            {unreadCount > 0 && (
                                <button onClick={markAllAsRead} className="mark-read-btn">Mark all read</button>
                            )}
                        </div>
                        <div className="notification-list">
                            {notifications.length === 0 ? (
                                <div className="notification-empty">No notifications</div>
                            ) : (
                                notifications.map(n => (
                                    <div 
                                        key={n.id} 
                                        className={`notification-item ${n.read ? 'read' : 'unread'}`}
                                        onClick={() => markAsRead(n.id)}
                                    >
                                        <div className="notification-icon">
                                            {n.type === 'error' ? 
                                                <i className="fas fa-exclamation-circle" style={{color: 'var(--danger-500)'}}></i> : 
                                                <i className="fas fa-info-circle" style={{color: 'var(--primary-500)'}}></i>
                                            }
                                        </div>
                                        <div className="notification-content">
                                            <p>{n.message}</p>
                                            <span className="notification-time">{new Date(n.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                        </div>
                                        {!n.read && <div className="unread-dot"></div>}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>

            <button className="add-task-btn-primary" onClick={() => document.dispatchEvent(new CustomEvent('open-add-task'))}>
              <i className="fas fa-plus"></i>
              <span>New Task</span>
            </button>
          </div>
        </header>

        <main className="dashboard-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
