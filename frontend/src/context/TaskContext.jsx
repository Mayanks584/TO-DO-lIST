import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useNotifications } from './NotificationContext';
import { supabase } from '../supabaseClient';

const TaskContext = createContext();

export function useTasks() {
  return useContext(TaskContext);
}

export function TaskProvider({ children }) {
  const { currentUser } = useAuth();
  const { showToast } = useNotifications();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState({ category: 'all', status: 'all', search: '' });

  // Fetch tasks when user logs in
  useEffect(() => {
    if (currentUser) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [currentUser]);

  const fetchTasks = async () => {
    try {
      let { data: tasksData, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', currentUser.id) // Assuming your table has a user_id column
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(tasksData || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      showToast('Failed to fetch tasks', 'error');
    }
  };

  const addTask = async (taskData) => {
    if (!currentUser) return;

    try {
      const newTask = {
        user_id: currentUser.id,
        title: taskData.title,
        description: taskData.description,
        due_date: taskData.dueDate, // Mapping camelCase JS to snake_case DB if needed
        category: taskData.category,
        priority: taskData.priority || 'medium',
        status: 'incomplete',
      };

      const { data, error } = await supabase
        .from('tasks')
        .insert([newTask])
        .select()
        .single();

      if (error) throw error;

      // Map back from DB snake_case to JS camelCase if necessary, 
      // or just keep snake_case in state if you update your components to match.
      // For least friction, let's assume we adapt the state to match the DB or vice versa.
      // Here we'll assume the DB returns snake_case fields.
      // Ideally, we should standardize on one casing. 
      // Let's convert the received data to our app's expected format to minimize component breakage:
      const formattedTask = {
          ...data,
          userId: data.user_id,
          dueDate: data.due_date,
          createdAt: data.created_at,
          updatedAt: data.updated_at
      };

      setTasks(prev => [formattedTask, ...prev]);
      showToast('Task added successfully', 'success');
      return formattedTask;
    } catch (error) {
      console.error('Error adding task:', error);
      showToast('Failed to add task', 'error');
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      // Prepare data for DB (snake_case)
      const updates = {
          title: taskData.title,
          description: taskData.description,
          due_date: taskData.dueDate,
          category: taskData.category,
          priority: taskData.priority,
          status: taskData.status,
          updated_at: new Date().toISOString()
      };
      
      // Remove undefined fields
      Object.keys(updates).forEach(key => updates[key] === undefined && delete updates[key]);

      const { data, error } = await supabase
        .from('tasks')
        .update(updates)
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;

      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, ...taskData, updatedAt: data.updated_at } : task
      ));
      showToast('Task updated successfully', 'info');
    } catch (error) {
      console.error('Error updating task:', error);
      showToast('Failed to update task', 'error');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;

      setTasks(prev => prev.filter(task => task.id !== taskId));
      showToast('Task deleted', 'error');
    } catch (error) {
      console.error('Error deleting task:', error);
      showToast('Failed to delete task', 'error');
    }
  };

  const toggleTaskStatus = async (taskId) => {
    const taskToUpdate = tasks.find(t => t.id === taskId);
    if (!taskToUpdate) return;

    const newStatus = taskToUpdate.status === 'completed' ? 'incomplete' : 'completed';
    
    try {
        const { error } = await supabase
            .from('tasks')
            .update({ status: newStatus, updated_at: new Date().toISOString() })
            .eq('id', taskId);
            
        if (error) throw error;

        setTasks(prev => prev.map(task => {
            if (task.id === taskId) {
                return { ...task, status: newStatus, updatedAt: new Date().toISOString() };
            }
            return task;
        }));

        if (newStatus === 'completed') {
            showToast('Task completed!', 'success');
        }
    } catch (error) {
        console.error('Error toggling task status:', error);
        showToast('Failed to update status', 'error');
    }
  };

  const getUserTasks = () => {
      if (!currentUser) return [];
      
      // Since we fetch only user's tasks in useEffect, 'tasks' is already filtered by user.
      let filteredTasks = [...tasks];

      // Apply local filters
      if (filter.category !== 'all') {
          filteredTasks = filteredTasks.filter(task => task.category === filter.category);
      }
      if (filter.status !== 'all') {
          filteredTasks = filteredTasks.filter(task => task.status === filter.status);
      }
      if (filter.search) {
          const lowerSearch = filter.search.toLowerCase();
          filteredTasks = filteredTasks.filter(task => 
              (task.title || '').toLowerCase().includes(lowerSearch) || 
              (task.description || '').toLowerCase().includes(lowerSearch)
          );
      }
      
      // Sort locally (or could do via Supabase if we refetch)
      filteredTasks.sort((a, b) => new Date(a.dueDate || a.due_date) - new Date(b.dueDate || b.due_date));

      return filteredTasks;
  };

  const getStats = () => {
      if (!currentUser) return { total: 0, completed: 0, pending: 0, overdue: 0 };
      
      const total = tasks.length;
      const completed = tasks.filter(t => t.status === 'completed').length;
      const pending = total - completed;
      const overdue = tasks.filter(t => {
          const due = t.dueDate || t.due_date;
          if (!due) return false;
          return new Date(due) < new Date() && t.status !== 'completed';
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
