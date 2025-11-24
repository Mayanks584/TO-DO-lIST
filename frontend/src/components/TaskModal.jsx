import React, { useState, useEffect } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskModal = ({ isOpen, onClose, taskToEdit = null }) => {
  const { addTask, updateTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('Personal');
  const [priority, setPriority] = useState('medium');
  const [error, setError] = useState('');

  // Helper to get today's date in YYYY-MM-DD format for local timezone
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (isOpen) {
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description || '');
        setDueDate(taskToEdit.dueDate);
        setCategory(taskToEdit.category);
        setPriority(taskToEdit.priority || 'medium');
      } else {
        // Reset form for new task
        setTitle('');
        setDescription('');
        // Default to today instead of tomorrow? Or keep tomorrow. 
        // User didn't specify default, just constraints.
        // Let's default to today to be safe and allow immediate action.
        setDueDate(getTodayString());
        setCategory('Personal');
        setPriority('medium');
      }
      setError('');
    }
  }, [isOpen, taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Please enter a task title');
      return;
    }

    // Check if due date is in the past
    if (dueDate < getTodayString()) {
      setError('Due date cannot be in the past');
      return;
    }

    const taskData = {
      title,
      description,
      dueDate,
      category,
      priority
    };

    if (taskToEdit) {
      updateTask(taskToEdit.id, taskData);
    } else {
      addTask(taskData);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          {error && <div className="alert error" style={{marginBottom: '1rem', color: 'var(--danger-600)'}}>{error}</div>}
          
          <div className="form-sections">
            <div className="form-section">
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add details about this task..."
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    min={getTodayString()}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Category</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health">Health</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
              </div>
              
              <div className="form-group">
                <label>Priority</label>
                <div className="priority-buttons">
                  {['low', 'medium', 'high', 'urgent'].map(p => (
                    <button
                      key={p}
                      type="button"
                      className={`priority-btn ${priority === p ? 'active' : ''}`}
                      onClick={() => setPriority(p)}
                      style={{textTransform: 'capitalize'}}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {taskToEdit ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;



