import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const { currentUser } = useAuth();
  const { showToast } = useNotifications();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ category: 'all', status: 'all', search: '' });

  useEffect(() => {
    if (currentUser) {
      const allTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      // Determine if we should load all tasks or just this user's? 
      // The script.js loads all tasks then filters in memory, but let's just load all into state
      // and filter by user ID in the getters or here.
      setTasks(allTasks);
    } else {
        setTasks([]);
    }
  }, [currentUser]);

  const saveTasksToStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  };

  const addTask = (taskData) => {
    if (!currentUser) return;

    const newTask = {
      id: Date.now().toString(),
      userId: currentUser.id,
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate,
      category: taskData.category,
      priority: taskData.priority || 'medium',
      status: 'incomplete',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedTasks = [...tasks, newTask];
    saveTasksToStorage(updatedTasks);
    showToast('Task added successfully', 'success');
    return newTask;
  };

  const updateTask = (taskId, taskData) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, ...taskData, updatedAt: new Date().toISOString() } : task
    );
    saveTasksToStorage(updatedTasks);
    showToast('Task updated successfully', 'info');
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasksToStorage(updatedTasks);
    showToast('Task deleted', 'error');
  };

  const toggleTaskStatus = (taskId) => {
    let status = '';
    const updatedTasks = tasks.map(task => {
        if (task.id === taskId) {
            status = task.status === 'completed' ? 'incomplete' : 'completed';
            return {
                ...task,
                status: status,
                updatedAt: new Date().toISOString()
            };
        }
        return task;
    });
    saveTasksToStorage(updatedTasks);
    if (status === 'completed') {
        showToast('Task completed!', 'success');
    }
  };

  const getUserTasks = () => {
      if (!currentUser) return [];
      let userTasks = tasks.filter(task => task.userId === currentUser.id);

      // Apply filters
      if (filter.category !== 'all') {
          userTasks = userTasks.filter(task => task.category === filter.category);
      }
      if (filter.status !== 'all') {
          userTasks = userTasks.filter(task => task.status === filter.status);
      }
      if (filter.search) {
          const lowerSearch = filter.search.toLowerCase();
          userTasks = userTasks.filter(task => 
              task.title.toLowerCase().includes(lowerSearch) || 
              task.description.toLowerCase().includes(lowerSearch)
          );
      }
      
      // Sort by due date by default or add sorting logic
      userTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

      return userTasks;
  };

  const getStats = () => {
      if (!currentUser) return { total: 0, completed: 0, pending: 0, overdue: 0 };
      
      const userTasks = tasks.filter(task => task.userId === currentUser.id);
      const total = userTasks.length;
      const completed = userTasks.filter(t => t.status === 'completed').length;
      const pending = total - completed;
      const overdue = userTasks.filter(t => {
          return new Date(t.dueDate) < new Date() && t.status !== 'completed';
      }).length;

      return { total, completed, pending, overdue };
  };

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    filter,
    setFilter,
    getUserTasks,
    getStats
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}



