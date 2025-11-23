import React, { useEffect, useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';

const Analytics = () => {
  const { tasks } = useTasks();
  const { currentUser } = useAuth();
  const [metrics, setMetrics] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
    completionRate: 0,
    priority: { low: 0, medium: 0, high: 0, urgent: 0 },
    category: {}
  });

  useEffect(() => {
    if (!currentUser) return;

    // Filter tasks for current user manually to ignore dashboard filters
    const userTasks = tasks.filter(task => task.userId === currentUser.id);

    const total = userTasks.length;
    const completed = userTasks.filter(t => t.status === 'completed').length;
    const pending = total - completed;
    const overdue = userTasks.filter(t => {
      return new Date(t.dueDate) < new Date() && t.status !== 'completed';
    }).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Priority Distribution
    const priorityCount = { low: 0, medium: 0, high: 0, urgent: 0 };
    userTasks.forEach(task => {
      if (task.priority && priorityCount[task.priority] !== undefined) {
        priorityCount[task.priority]++;
      }
    });

    // Category Distribution
    const categoryCount = {};
    userTasks.forEach(task => {
      const cat = task.category || 'Uncategorized';
      categoryCount[cat] = (categoryCount[cat] || 0) + 1;
    });

    setMetrics({
      total,
      completed,
      pending,
      overdue,
      completionRate,
      priority: priorityCount,
      category: categoryCount
    });
  }, [tasks, currentUser]);

  // Calculate width for priority bars
  const getPriorityWidth = (count) => {
    return metrics.total > 0 ? (count / metrics.total) * 100 : 0;
  };
  
  // Calculate width for category bars
  const getCategoryWidth = (count) => {
      const maxCat = Math.max(...Object.values(metrics.category));
      return maxCat > 0 ? (count / maxCat) * 100 : 0;
  };

  return (
    <div className="analytics-page">
      <div className="welcome-section">
        <h1>Analytics Dashboard</h1>
        <p>Insights into your productivity and task completion.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-tasks"></i></div>
          <div className="stat-number">{metrics.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-check-circle"></i></div>
          <div className="stat-number">{metrics.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-clock"></i></div>
            <div className="stat-number">{metrics.pending}</div>
            <div className="stat-label">Pending</div>
        </div>
        <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-exclamation-triangle"></i></div>
            <div className="stat-number">{metrics.overdue}</div>
            <div className="stat-label">Overdue</div>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Completion Rate Chart */}
        <div className="analytics-card">
          <h3>Completion Rate</h3>
          <div className="circular-chart-container">
            <div 
                className="circular-chart" 
                style={{ '--degrees': `${metrics.completionRate * 3.6}deg` }}
            >
                <div className="chart-center-text">
                    <span className="chart-percentage">{metrics.completionRate}%</span>
                    <span className="chart-label">Done</span>
                </div>
            </div>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="analytics-card">
          <h3>Tasks by Priority</h3>
          <div className="bar-chart">
            {Object.entries(metrics.priority).map(([priority, count]) => (
              <div className="bar-group" key={priority}>
                <div className="bar-label" style={{textTransform: 'capitalize'}}>{priority}</div>
                <div className="bar-wrapper">
                  <div 
                    className="bar-fill" 
                    style={{ 
                        width: `${getPriorityWidth(count)}%`,
                        background: 
                            priority === 'urgent' ? 'var(--danger-500)' : 
                            priority === 'high' ? 'var(--danger-500)' : 
                            priority === 'medium' ? 'var(--warning-500)' : 
                            'var(--success-500)'
                    }}
                  ></div>
                </div>
                <div className="bar-value">{count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="analytics-card">
            <h3>Tasks by Category</h3>
            <div className="bar-chart">
                {Object.keys(metrics.category).length === 0 ? (
                    <div className="empty-state">
                        <p>No categorized tasks yet.</p>
                    </div>
                ) : (
                    Object.entries(metrics.category).map(([cat, count]) => (
                        <div className="bar-group" key={cat}>
                            <div className="bar-label">{cat}</div>
                            <div className="bar-wrapper">
                                <div 
                                    className="bar-fill" 
                                    style={{ 
                                        width: `${getCategoryWidth(count)}%`,
                                        background: 'var(--primary-400)'
                                    }}
                                ></div>
                            </div>
                            <div className="bar-value">{count}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
