// MongoDB Atlas connection configuration
const MONGODB_URI = 'mongodb+srv://ranamayank080:ishurana098@clustertest.hkinjhb.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTest';

// User registration function
async function registerUser(email, password) {
    try {
        // For now, we'll use localStorage to simulate user storage
        // In a real app, you'd want to use a backend server for security
        
        // Check if user already exists
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const existingUser = existingUsers.find(user => user.email === email);
        
        if (existingUser) {
            return {
                success: false,
                message: 'User with this email already exists'
            };
        }

        // Create new user (in a real app, password would be hashed on server)
        const newUser = {
            id: Date.now().toString(),
            email: email,
            password: password, // In production, this should be hashed
            createdAt: new Date().toISOString()
        };

        // Store user in localStorage (simulating database)
        existingUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(existingUsers));

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
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }

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
function handleRegister(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const messageDiv = document.getElementById('message');
    const submitBtn = document.querySelector('.register-btn');
    
    // Validate passwords match
    if (password !== confirmPassword) {
        messageDiv.style.color = '#dc3545';
        messageDiv.innerHTML = 'Passwords do not match';
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        messageDiv.style.color = '#dc3545';
        messageDiv.innerHTML = 'Password must be at least 6 characters long';
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Creating account...</span>';
    messageDiv.innerHTML = '';
    messageDiv.style.color = '';
    
    // Register user
    registerUser(email, password).then(data => {
        if (data.success) {
            messageDiv.style.color = '#28a745';
            messageDiv.innerHTML = 'Account created successfully! Redirecting to dashboard...';
            
            // Store user info in localStorage
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            messageDiv.style.color = '#dc3545';
            messageDiv.innerHTML = data.message || 'Registration failed';
        }
    }).catch(error => {
        console.error('Registration error:', error);
        messageDiv.style.color = '#dc3545';
        messageDiv.innerHTML = 'Registration failed. Please try again.';
    }).finally(() => {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Register</span>';
    });
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    const submitBtn = document.querySelector('.login-btn');
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Logging in...</span>';
    messageDiv.innerHTML = '';
    messageDiv.style.color = '';
    
    // Login user
    loginUser(email, password).then(data => {
        if (data.success) {
            messageDiv.style.color = '#28a745';
            messageDiv.innerHTML = 'Login successful! Redirecting...';
            
            // Store user info in localStorage
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            messageDiv.style.color = '#dc3545';
            messageDiv.innerHTML = data.message || 'Login failed';
        }
    }).catch(error => {
        console.error('Login error:', error);
        messageDiv.style.color = '#dc3545';
        messageDiv.innerHTML = 'Login failed. Please try again.';
    }).finally(() => {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Login</span>';
    });
}

// Check if user is logged in
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        return JSON.parse(currentUser);
    }
    return null;
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'home.html';
}

// Task Management System
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        this.currentUser = checkAuth();
        this.init();
        this.addSampleTasksIfEmpty();
    }

    init() {
        this.setupEventListeners();
        this.renderTasks();
        this.updateTaskCount();
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
        }
    }

    // Data persistence
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
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
                    title: 'Welcome to Task Manager!',
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
        }
    }
}

// Initialize forms when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Dashboard authentication check and user info
    if (window.location.pathname.includes('dashboard.html')) {
        const user = checkAuth();
        if (!user) {
            window.location.href = 'login.html';
        } else {
            // Display user info
            const userInfo = document.getElementById('user-info');
            if (userInfo) {
                userInfo.textContent = `Welcome, ${user.email}`;
            }

            // Initialize TaskManager for the dashboard
            window.taskManager = new TaskManager();
        }
    }
});