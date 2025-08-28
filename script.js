// Fixed Script with Proper Offline Functionality

// User registration function
async function registerUser(email, password) {
    try {
        console.log('Registering user:', email);
        
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = existingUsers.find(user => user.email === email);
        
        if (existingUser) {
            console.log('User already exists');
            return {
                success: false,
                message: 'User with this email already exists'
            };
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            email: email,
            password: password, // In production, this should be hashed
            createdAt: new Date().toISOString()
        };

        // Store user in localStorage
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        
        console.log('User registered successfully:', newUser);

        return {
            success: true,
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                createdAt: newUser.createdAt
            }
        };

    } catch (error) {
        console.error('Registration error:', error);
        return {
            success: false,
            message: 'Registration failed. Please try again.'
        };
    }
}

// User login function
async function loginUser(email, password) {
    try {
        console.log('Logging in user:', email);
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        console.log('Available users:', users.map(u => u.email));
        
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            console.log('User not found or wrong password');
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }

        console.log('Login successful for user:', user.email);

        return {
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt
            }
        };

    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: 'Login failed. Please try again.'
        };
    }
}

// Handle registration form submission
async function handleRegister(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageDiv = document.getElementById('message');
    const submitBtn = document.querySelector('.register-btn');
    
    console.log('Registration form submitted for:', email);
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showMessage(messageDiv, 'Passwords do not match', 'error');
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        showMessage(messageDiv, 'Password must be at least 6 characters long', 'error');
        return;
    }
    
    // Show loading state
    setButtonLoading(submitBtn, 'Creating account...');
    clearMessage(messageDiv);
    
    try {
        // Register user
        const data = await registerUser(email, password);
        
        if (data.success) {
            showMessage(messageDiv, 'Account created successfully! Redirecting to dashboard...', 'success');
            
            // Store user info in localStorage
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            console.log('Current user set:', data.user);
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            showMessage(messageDiv, data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showMessage(messageDiv, 'Registration failed. Please try again.', 'error');
    } finally {
        // Reset button state
        resetButton(submitBtn, 'Register');
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    const submitBtn = document.querySelector('.login-btn');
    
    console.log('Login form submitted for:', email);
    
    // Show loading state
    setButtonLoading(submitBtn, 'Logging in...');
    clearMessage(messageDiv);
    
    try {
        // Login user
        const data = await loginUser(email, password);
        
        if (data.success) {
            showMessage(messageDiv, 'Login successful! Redirecting...', 'success');
            
            // Store user info in localStorage
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            console.log('Current user set:', data.user);
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showMessage(messageDiv, data.message || 'Login failed', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage(messageDiv, 'Login failed. Please try again.', 'error');
    } finally {
        // Reset button state
        resetButton(submitBtn, 'Login');
    }
}

// Utility functions
function showMessage(element, message, type) {
    element.textContent = message;
    element.style.color = type === 'success' ? '#28a745' : '#dc3545';
}

function clearMessage(element) {
    element.textContent = '';
    element.style.color = '';
}

function setButtonLoading(button, text) {
    button.disabled = true;
    button.innerHTML = `<span>${text}</span>`;
}

function resetButton(button, text) {
    button.disabled = false;
    button.innerHTML = `<span>${text}</span>`;
}

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        console.log('User is authenticated:', JSON.parse(currentUser));
        return JSON.parse(currentUser);
    }
    console.log('No user authenticated');
    return null;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    console.log('User logged out');
    window.location.href = 'login.html';
}

// Task Management System
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        this.currentUser = checkAuth();
        
        if (!this.currentUser) {
            console.log('No authenticated user, redirecting to login');
            window.location.href = 'login.html';
            return;
        }
        
        console.log('TaskManager initialized for user:', this.currentUser.email);
        this.init();
        this.addSampleTasksIfEmpty();
    }

    init() {
        this.setupEventListeners();
        this.renderTasks();
        this.updateTaskCount();
        this.updateUserInfo();
    }

    updateUserInfo() {
        const userInfo = document.getElementById('user-info');
        if (userInfo && this.currentUser) {
            userInfo.textContent = `Welcome, ${this.currentUser.email}`;
        }
    }

    setupEventListeners() {
        // Add task button
        const addTaskBtn = document.getElementById('add-task-btn');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => this.openModal());
        }

        // Modal events
        const modal = document.getElementById('task-modal');
        const cancelBtn = document.getElementById('cancel-btn');
        const taskForm = document.getElementById('task-form');

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }

        if (taskForm) {
            taskForm.addEventListener('submit', (e) => this.handleTaskSubmit(e));
        }

        // Close modal when clicking outside
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        // Search and filter events
        const searchBar = document.getElementById('search-bar');
        const filterCategory = document.getElementById('filter-category');
        const filterStatus = document.getElementById('filter-status');
        const sortTasks = document.getElementById('sort-tasks');

        if (searchBar) {
            searchBar.addEventListener('input', () => this.renderTasks());
        }

        if (filterCategory) {
            filterCategory.addEventListener('change', () => this.renderTasks());
        }

        if (filterStatus) {
            filterStatus.addEventListener('change', () => this.renderTasks());
        }

        if (sortTasks) {
            sortTasks.addEventListener('change', () => this.renderTasks());
        }
    }

    // Task CRUD Operations
    addTask(taskData) {
        const task = {
            id: Date.now().toString(),
            userId: this.currentUser.id,
            title: taskData.title,
            description: taskData.description,
            dueDate: taskData.dueDate,
            category: taskData.category,
            status: 'incomplete',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.updateTaskCount();
        
        console.log('Task added:', task);
        return task;
    }

    updateTask(taskId, taskData) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = {
                ...this.tasks[taskIndex],
                ...taskData,
                updatedAt: new Date().toISOString()
            };
            this.saveTasks();
            this.renderTasks();
            this.updateTaskCount();
            
            console.log('Task updated:', this.tasks[taskIndex]);
            return this.tasks[taskIndex];
        }
        return null;
    }

    deleteTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task && confirm(`Are you sure you want to delete "${task.title}"?`)) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.saveTasks();
            this.renderTasks();
            this.updateTaskCount();
            
            console.log('Task deleted:', task);
        }
    }

    toggleTaskStatus(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.status = task.status === 'completed' ? 'incomplete' : 'completed';
            task.updatedAt = new Date().toISOString();
            this.saveTasks();
            this.renderTasks();
            this.updateTaskCount();
            
            console.log('Task status toggled:', task);
        }
    }

    // Data persistence
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        console.log('Tasks saved to localStorage');
    }

    // Get filtered and sorted tasks
    getFilteredTasks() {
        let filteredTasks = this.tasks.filter(task => task.userId === this.currentUser.id);

        // Search filter
        const searchTerm = document.getElementById('search-bar')?.value.toLowerCase();
        if (searchTerm) {
            filteredTasks = filteredTasks.filter(task =>
                task.title.toLowerCase().includes(searchTerm) ||
                task.description.toLowerCase().includes(searchTerm)
            );
        }

        // Category filter
        const categoryFilter = document.getElementById('filter-category')?.value;
        if (categoryFilter && categoryFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.category === categoryFilter);
        }

        // Status filter
        const statusFilter = document.getElementById('filter-status')?.value;
        if (statusFilter && statusFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
        }

        // Sorting
        const sortBy = document.getElementById('sort-tasks')?.value;
        if (sortBy) {
            filteredTasks.sort((a, b) => {
                switch (sortBy) {
                    case 'date-asc':
                        return new Date(a.dueDate) - new Date(b.dueDate);
                    case 'date-desc':
                        return new Date(b.dueDate) - new Date(a.dueDate);
                    case 'status':
                        return a.status.localeCompare(b.status);
                    case 'category':
                        return a.category.localeCompare(b.category);
                    default:
                        return 0;
                }
            });
        }

        return filteredTasks;
    }

    // Render tasks
    renderTasks() {
        const taskList = document.getElementById('task-list');
        if (!taskList) return;

        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #666;">
                    <i class="fas fa-tasks" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;"></i>
                    <p>No tasks found. Create your first task to get started!</p>
                </div>
            `;
            return;
        }

        taskList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
    }

    createTaskHTML(task) {
        const isCompleted = task.status === 'completed';
        const dueDate = new Date(task.dueDate);
        const isOverdue = dueDate < new Date() && !isCompleted;
        
        return `
            <li class="task-item ${isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}">
                <input type="checkbox" 
                       ${isCompleted ? 'checked' : ''} 
                       onchange="taskManager.toggleTaskStatus('${task.id}')">
                
                <div class="task-details">
                    <p class="task-title">${this.escapeHtml(task.title)}</p>
                    ${task.description ? `<p>${this.escapeHtml(task.description)}</p>` : ''}
                    <div class="task-info">
                        <span><i class="fas fa-calendar"></i> Due: ${this.formatDate(task.dueDate)}</span>
                        <span class="task-category cat-${task.category.toLowerCase()}">${task.category}</span>
                        ${isOverdue ? '<span style="color: #e74c3c;"><i class="fas fa-exclamation-triangle"></i> Overdue</span>' : ''}
                    </div>
                </div>
                
                <div class="task-actions">
                    <button class="btn edit-btn" onclick="taskManager.editTask('${task.id}')" title="Edit Task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn delete-btn" onclick="taskManager.deleteTask('${task.id}')" title="Delete Task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </li>
        `;
    }

    // Modal operations
    openModal(taskId = null) {
        const modal = document.getElementById('task-modal');
        const modalTitle = document.getElementById('modal-title');
        const taskForm = document.getElementById('task-form');
        const taskIdInput = document.getElementById('task-id');

        if (taskId) {
            // Edit mode
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                modalTitle.textContent = 'Edit Task';
                taskIdInput.value = taskId;
                document.getElementById('task-title').value = task.title;
                document.getElementById('task-desc').value = task.description || '';
                document.getElementById('task-due-date').value = task.dueDate;
                document.getElementById('task-category').value = task.category;
            }
        } else {
            // Add mode
            modalTitle.textContent = 'Add New Task';
            taskIdInput.value = '';
            taskForm.reset();
            // Set default due date to tomorrow
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            document.getElementById('task-due-date').value = tomorrow.toISOString().split('T')[0];
        }

        modal.style.display = 'flex';
    }

    closeModal() {
        const modal = document.getElementById('task-modal');
        modal.style.display = 'none';
    }

    editTask(taskId) {
        this.openModal(taskId);
    }

    handleTaskSubmit(event) {
        event.preventDefault();

        const taskId = document.getElementById('task-id').value;
        const taskData = {
            title: document.getElementById('task-title').value.trim(),
            description: document.getElementById('task-desc').value.trim(),
            dueDate: document.getElementById('task-due-date').value,
            category: document.getElementById('task-category').value
        };

        if (!taskData.title) {
            alert('Please enter a task title');
            return;
        }

        if (taskId) {
            // Update existing task
            this.updateTask(taskId, taskData);
        } else {
            // Add new task
            this.addTask(taskData);
        }

        this.closeModal();
    }

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Tomorrow';
        } else {
            return date.toLocaleDateString();
        }
    }

    updateTaskCount() {
        const totalTasks = this.tasks.filter(task => task.userId === this.currentUser.id).length;
        const completedTasks = this.tasks.filter(task => task.userId === this.currentUser.id && task.status === 'completed').length;
        const pendingTasks = totalTasks - completedTasks;
        
        // Update the counter display
        const totalTasksElement = document.getElementById('total-tasks');
        const completedTasksElement = document.getElementById('completed-tasks');
        const pendingTasksElement = document.getElementById('pending-tasks');
        
        if (totalTasksElement) totalTasksElement.textContent = totalTasks;
        if (completedTasksElement) completedTasksElement.textContent = completedTasks;
        if (pendingTasksElement) pendingTasksElement.textContent = pendingTasks;
    }

    addSampleTasksIfEmpty() {
        const userTasks = this.tasks.filter(task => task.userId === this.currentUser.id);
        if (userTasks.length === 0) {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const nextWeek = new Date(today);
            nextWeek.setDate(nextWeek.getDate() + 7);

            const sampleTasks = [
                {
                    id: Date.now().toString(),
                    userId: this.currentUser.id,
                    title: 'Welcome to TaskFlow!',
                    description: 'This is your first task. Click the checkbox to mark it as complete.',
                    dueDate: tomorrow.toISOString().split('T')[0],
                    category: 'Personal',
                    status: 'incomplete',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                },
                {
                    id: (Date.now() + 1).toString(),
                    userId: this.currentUser.id,
                    title: 'Explore the features',
                    description: 'Try adding, editing, and deleting tasks. Use the search and filter options to organize your tasks.',
                    dueDate: nextWeek.toISOString().split('T')[0],
                    category: 'Work',
                    status: 'incomplete',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                }
            ];

            this.tasks.push(...sampleTasks);
            this.saveTasks();
            this.renderTasks();
            this.updateTaskCount();
            
            console.log('Sample tasks added');
        }
    }
}

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        console.log('Register form found, adding event listener');
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        console.log('Login form found, adding event listener');
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Dashboard authentication check and user info
    if (window.location.pathname.includes('dashboard.html')) {
        console.log('Dashboard page detected');
        const user = checkAuth();
        if (!user) {
            console.log('No authenticated user, redirecting to login');
            window.location.href = 'login.html';
        } else {
            console.log('User authenticated, initializing TaskManager');
            // Initialize TaskManager for the dashboard
            window.taskManager = new TaskManager();
        }
    }
    
    console.log('Initialization complete');
});

// Export functions for global access
window.registerUser = registerUser;
window.loginUser = loginUser;
window.logout = logout;
window.checkAuth = checkAuth;