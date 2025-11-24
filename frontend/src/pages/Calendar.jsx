import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';
import TaskModal from '../components/TaskModal';

const Calendar = () => {
  const { tasks, toggleTaskStatus, deleteTask } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    generateCalendar();
  }, [currentDate]);

  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    
    // Previous month days padding
    const startPad = firstDay.getDay();
    for (let i = startPad - 1; i >= 0; i--) {
      const date = new Date(year, month, -i);
      days.push({ date, isCurrentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Next month days padding
    const endPad = 42 - days.length; // 6 rows * 7 cols = 42
    for (let i = 1; i <= endPad; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }
    
    setCalendarDays(days);
  };

  const changeMonth = (delta) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1));
  };

  const isSameDay = (d1, d2) => {
    return d1.getDate() === d2.getDate() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getFullYear() === d2.getFullYear();
  };

  // Helper to format date as YYYY-MM-DD in local time
  const toLocalISOString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTasksForDay = (date) => {
    const dateStr = toLocalISOString(date);
    return tasks.filter(task => task.dueDate === dateStr);
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const selectedTasks = getTasksForDay(selectedDate);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="calendar-page">
      <div className="calendar-container">
        <div className="calendar-header">
          <h2>{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
          <div className="calendar-nav">
            <button className="calendar-nav-btn" onClick={() => changeMonth(-1)}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="calendar-nav-btn" onClick={() => setCurrentDate(new Date())}>
              Today
            </button>
            <button className="calendar-nav-btn" onClick={() => changeMonth(1)}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="calendar-wrapper">
          <table className="calendar-grid">
            <thead>
              <tr>
                {weekDays.map(day => <th key={day}>{day}</th>)}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, row) => (
                <tr key={row}>
                  {Array.from({ length: 7 }).map((_, col) => {
                    const dayIndex = row * 7 + col;
                    const day = calendarDays[dayIndex];
                    if (!day) return null;
                    
                    const isToday = isSameDay(day.date, new Date());
                    const isSelected = isSameDay(day.date, selectedDate);
                    const dayTasks = getTasksForDay(day.date);
                    
                    return (
                      <td 
                        key={col} 
                        className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleDayClick(day.date)}
                      >
                        <span className="day-number">{day.date.getDate()}</span>
                        <div className="task-dots">
                          {dayTasks.slice(0, 5).map(task => {
                             const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed';
                             return (
                               <div 
                                 key={task.id} 
                                 className={`task-dot ${task.status === 'completed' ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
                                 title={task.title}
                               ></div>
                             );
                          })}
                          {dayTasks.length > 5 && <div className="task-dot" style={{background: '#ccc'}} title={`${dayTasks.length - 5} more`}></div>}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="selected-date-tasks">
          <h3 className="selected-date-header">
            Tasks for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </h3>
          
          {selectedTasks.length === 0 ? (
            <p style={{color: 'var(--text-secondary)', fontStyle: 'italic'}}>No tasks for this day.</p>
          ) : (
            <ul className="task-list">
              {selectedTasks.map(task => {
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
                      </div>
                      
                      <div className="task-meta">
                        <div className="task-category">{task.category}</div>
                        <div className={`task-priority ${task.priority}`}>{task.priority}</div>
                      </div>
                    </div>
                    
                    <div className="task-actions">
                        <button className="btn btn-outline" onClick={() => handleEdit(task)}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-outline" onClick={() => deleteTask(task.id)}>
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

export default Calendar;
