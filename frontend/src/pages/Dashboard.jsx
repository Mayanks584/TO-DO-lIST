import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import TaskModal from '../components/TaskModal';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { getUserTasks, getStats, deleteTask, toggleTaskStatus, filter, setFilter } = useTasks();
  
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0, overdue: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  // Effect to update tasks and stats when dependencies change
  useEffect(() => {
    const updateData = () => {
      setTasks(getUserTasks());
      setStats(getStats());
    };

    updateData();
    // Interval to refresh relative times (like overdue check)
    const interval = setInterval(updateData, 60000); 
    return () => clearInterval(interval);
  }, [getUserTasks, getStats]); // Note: verify these dependencies are stable

  // Listen for custom event from Layout header
  useEffect(() => {
    const handleOpenAddTask = () => {
      setTaskToEdit(null);
      setIsModalOpen(true);
    };
    document.addEventListener('open-add-task', handleOpenAddTask);
    return () => document.removeEventListener('open-add-task', handleOpenAddTask);
  }, []);

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString();
  };

  return (
    <div>
      <div className="welcome-section">
        <h1>Welcome back, {currentUser?.email.split('@')[0]}!</h1>
        <p>Here's what's on your plate today.</p>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-tasks"></i>
            </div>
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="stat-number">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-clock"></i>
            </div>
            <div className="stat-number">{stats.pending}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <div className="stat-number">{stats.overdue}</div>
            <div className="stat-label">Overdue</div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="actions-section">
        <div className="action-bar">
          <div className="actions-left">
            <div className="view-controls">
              <button 
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <i className="fas fa-list"></i>
              </button>
              <button 
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <i className="fas fa-th-large"></i>
              </button>
            </div>
          </div>

          <div className="actions-right">
            <div className="filters">
              <select 
                className="filter-select"
                value={filter.category}
                onChange={(e) => setFilter({...filter, category: e.target.value})}
              >
                <option value="all">All Categories</option>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Shopping">Shopping</option>
                <option value="Health">Health</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
              </select>
              
              <select 
                className="filter-select"
                value={filter.status}
                onChange={(e) => setFilter({...filter, status: e.target.value})}
              >
                <option value="all">All Status</option>
                <option value="incomplete">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="tasks-section">
        <div className="task-container">
          <div className="task-header">
            <div className="task-summary">
              Showing {tasks.length} task{tasks.length !== 1 ? 's' : ''}
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h3>No tasks found</h3>
              <p>Get started by creating your first task!</p>
              <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                <i className="fas fa-plus"></i> Create Task
              </button>
            </div>
          ) : (
            <ul className={`task-list ${viewMode === 'grid' ? 'grid-view' : ''}`}>
              {tasks.map(task => {
                const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
                return (
                  <li key={task.id} className={`task-item ${task.status === 'completed' ? 'completed' : ''} ${isOverdue ? 'overdue' : ''} ${task.priority}-priority`}>
                    <div className="task-checkbox">
                      <input 
                        type="checkbox" 
                        checked={task.status === 'completed'} 
                        onChange={() => toggleTaskStatus(task.id)}
                      />
                    </div>
                    
                    <div className="task-content" onClick={() => handleEdit(task)}>
                      <div className="task-details">
                        <div className="task-title">{task.title}</div>
                        {task.description && <div className="task-description">{task.description}</div>}
                      </div>
                      
                      <div className="task-meta">
                        <div className="task-meta-item">
                          <i className="fas fa-calendar"></i>
                          <span>{formatDate(task.dueDate)}</span>
                        </div>
                        <div className="task-category">{task.category}</div>
                        <div className={`task-priority ${task.priority}`}>{task.priority}</div>
                        {isOverdue && <div className="task-meta-item" style={{color: 'var(--danger-500)'}}><i className="fas fa-exclamation-triangle"></i> Overdue</div>}
                      </div>
                    </div>
                    
                    <div className="task-actions" style={{display: 'flex', gap: '0.5rem', marginTop: '1rem'}}>
                        <button className="btn btn-outline" onClick={(e) => { e.stopPropagation(); handleEdit(task); }} title="Edit">
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-outline" onClick={(e) => { e.stopPropagation(); handleDelete(task.id); }} title="Delete" style={{borderColor: 'var(--danger-300)', color: 'var(--danger-600)'}}>
                            <i className="fas fa-trash"></i>
                        </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>

      <TaskModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setTaskToEdit(null); }} 
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default Dashboard;



