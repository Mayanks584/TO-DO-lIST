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
    const submitBtn = document.querySelector('#registerForm button[type="submit"]');
    
    // Validation
    if (!email || !password) {
        showMessage(messageDiv, 'Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage(messageDiv, 'Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 6) {
        showMessage(messageDiv, 'Password must be at least 6 characters', 'error');
        return;
    }
    
    // Show loading state
    setButtonLoading(submitBtn, 'Creating Account...');
    
    try {
        const result = await registerUser(email, password);
        
        if (result.success) {
            showMessage(messageDiv, result.message, 'success');
            // Store user in localStorage for immediate login
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showMessage(messageDiv, result.message, 'error');
        }
    } catch (error) {
        showMessage(messageDiv, 'Registration failed. Please try again.', 'error');
    } finally {
        resetButton(submitBtn, 'Create Account');
    }
}

// Handle login form submission
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');
    const submitBtn = document.querySelector('#loginForm button[type="submit"]');
    
    // Validation
    if (!email || !password) {
        showMessage(messageDiv, 'Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    setButtonLoading(submitBtn, 'Signing In...');
    
    try {
        const result = await loginUser(email, password);
        
        if (result.success) {
            showMessage(messageDiv, result.message, 'success');
            // Store user in localStorage
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            
            // Redirect to dashboard after a short delay
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            showMessage(messageDiv, result.message, 'error');
        }
    } catch (error) {
        showMessage(messageDiv, 'Login failed. Please try again.', 'error');
    } finally {
        resetButton(submitBtn, 'Sign In');
    }
}

// Utility functions for forms
function showMessage(element, message, type) {
    if (!element) return;
    
    element.textContent = message;
    element.className = `message ${type}`;
    element.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
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
        this.currentView = 'list';
        this.selectedTasks = new Set();
        
        if (!this.currentUser) {
            console.log('No authenticated user, redirecting to login');
            window.location.href = 'login.html';
            return;
        }
        
        console.log('TaskManager initialized for user:', this.currentUser.email);
        this.init();
    }

    init() {
        this.setupSidebarNavigation();
        this.setupMobileMenu();
        this.setupEventListeners();
        this.showLoadingState();
        
        // Simulate loading delay for better UX
        setTimeout(() => {
            this.hideLoadingState();
            this.renderTasks();
            this.updateTaskCount();
            this.updateUserInfo();
            this.addSampleTasksIfEmpty();
        }, 1000);
    }

    setupSidebarNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
            });
        });
    }

    setupMobileMenu() {
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.querySelector('.sidebar');
        
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
            
            // Close sidebar when clicking outside
            document.addEventListener('click', (e) => {
                if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                    sidebar.classList.remove('open');
                }
            });
        }
    }

    showLoadingState() {
        const loadingState = document.getElementById('loading-state');
        const taskList = document.getElementById('task-list');
        const emptyState = document.getElementById('empty-state');
        
        if (loadingState) loadingState.style.display = 'block';
        if (taskList) taskList.style.display = 'none';
        if (emptyState) emptyState.style.display = 'none';
    }

    hideLoadingState() {
        const loadingState = document.getElementById('loading-state');
        const taskList = document.getElementById('task-list');
        
        if (loadingState) loadingState.style.display = 'none';
        if (taskList) taskList.style.display = 'block';
    }

    showToast(message, type = 'success') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getToastIcon(type);
        
        toast.innerHTML = `
            <i class="${icon}"></i>
            <div class="toast-content">
                <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="toast-message">${message}</div>
            </div>
        `;

        toastContainer.appendChild(toast);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }

    getToastIcon(type) {
        switch (type) {
            case 'success': return 'fas fa-check-circle';
            case 'error': return 'fas fa-exclamation-circle';
            case 'warning': return 'fas fa-exclamation-triangle';
            default: return 'fas fa-info-circle';
        }
    }

    updateUserInfo() {
        const userInfo = document.getElementById('user-info');
        if (userInfo && this.currentUser) {
            userInfo.textContent = this.currentUser.email;
        }
    }

    setupEventListeners() {
        // Add task button
        const addTaskBtn = document.getElementById('add-task-btn');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => this.openModal());
        }

        // Empty state add task button
        const emptyAddTaskBtn = document.getElementById('empty-add-task-btn');
        if (emptyAddTaskBtn) {
            emptyAddTaskBtn.addEventListener('click', () => this.openModal());
        }

        // Modal events
        const modal = document.getElementById('task-modal');
        const modalClose = document.getElementById('modal-close');
        const cancelBtn = document.getElementById('cancel-btn');
        const taskForm = document.getElementById('task-form');

        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }

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

        // View toggle buttons
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.toggleView(view);
            });
        });

        // Bulk actions button
        const bulkActionsBtn = document.querySelector('.bulk-actions-btn');
        if (bulkActionsBtn) {
            bulkActionsBtn.addEventListener('click', () => {
                this.showToast('Bulk actions coming soon!', 'warning');
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

    toggleView(view) {
        this.currentView = view;
        const taskList = document.getElementById('task-list');
        const viewBtns = document.querySelectorAll('.view-btn');
        
        // Update button states
        viewBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        // Update task list class
        if (taskList) {
            taskList.classList.toggle('grid-view', view === 'grid');
        }
        
        this.renderTasks();
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
            priority: taskData.priority || 'medium',
            status: 'incomplete',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
        this.updateTaskCount();
        
        this.showToast('Task added successfully!', 'success');
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
            
            this.showToast('Task updated successfully!', 'success');
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
            
            this.showToast('Task deleted successfully!', 'success');
            console.log('Task deleted:', task);
        }
    }

    toggleTaskStatus(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            const newStatus = task.status === 'completed' ? 'incomplete' : 'completed';
            task.status = newStatus;
            task.updatedAt = new Date().toISOString();
            this.saveTasks();
            this.renderTasks();
            this.updateTaskCount();
            
            const statusText = newStatus === 'completed' ? 'completed' : 'marked as pending';
            this.showToast(`Task ${statusText}!`, 'success');
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
                    case 'priority':
                        const priorityOrder = { 'urgent': 4, 'high': 3, 'medium': 2, 'low': 1 };
                        return priorityOrder[b.priority] - priorityOrder[a.priority];
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
        const emptyState = document.getElementById('empty-state');
        if (!taskList) return;

        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            taskList.style.display = 'none';
            if (emptyState) {
                emptyState.style.display = 'block';
            }
            return;
        }

        taskList.style.display = 'block';
        if (emptyState) {
            emptyState.style.display = 'none';
        }

        taskList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
        this.updateTaskSummary(filteredTasks.length);
    }

    createTaskHTML(task) {
        const isCompleted = task.status === 'completed';
        const dueDate = new Date(task.dueDate);
        const isOverdue = dueDate < new Date() && !isCompleted;
        const priorityClass = task.priority ? `${task.priority}-priority` : '';
        
        return `
            <li class="task-item ${isCompleted ? 'completed' : ''} ${isOverdue ? 'overdue' : ''} ${priorityClass}">
                <div class="task-checkbox">
                    <input type="checkbox" 
                           ${isCompleted ? 'checked' : ''} 
                           onchange="taskManager.toggleTaskStatus('${task.id}')">
                </div>
                
                <div class="task-content">
                    <div class="task-details">
                        <div class="task-title">${this.escapeHtml(task.title)}</div>
                        ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
                    </div>
                    
                    <div class="task-meta">
                        <div class="task-meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${this.formatDate(task.dueDate)}</span>
                        </div>
                        <div class="task-category">${task.category}</div>
                        <div class="task-priority ${task.priority}">${task.priority}</div>
                        ${isOverdue ? '<div class="task-meta-item"><i class="fas fa-exclamation-triangle"></i> Overdue</div>' : ''}
                    </div>
                </div>
                
                <div class="task-actions">
                    <button class="btn btn-outline" onclick="taskManager.editTask('${task.id}')" title="Edit Task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline" onclick="taskManager.deleteTask('${task.id}')" title="Delete Task">
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
                document.getElementById('task-priority').value = task.priority || 'medium';
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
            document.getElementById('task-priority').value = 'medium';
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
            category: document.getElementById('task-category').value,
            priority: document.getElementById('task-priority').value
        };

        if (!taskData.title) {
            this.showToast('Please enter a task title', 'error');
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
        const userTasks = this.tasks.filter(task => task.userId === this.currentUser.id);
        const totalTasks = userTasks.length;
        const completedTasks = userTasks.filter(task => task.status === 'completed').length;
        const pendingTasks = totalTasks - completedTasks;
        const overdueTasks = userTasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate < new Date() && task.status !== 'completed';
        }).length;
        
        // Update the counter display
        const totalTasksElement = document.getElementById('total-tasks');
        const completedTasksElement = document.getElementById('completed-tasks');
        const pendingTasksElement = document.getElementById('pending-tasks');
        const overdueTasksElement = document.getElementById('overdue-tasks');
        
        if (totalTasksElement) totalTasksElement.textContent = totalTasks;
        if (completedTasksElement) completedTasksElement.textContent = completedTasks;
        if (pendingTasksElement) pendingTasksElement.textContent = pendingTasks;
        if (overdueTasksElement) overdueTasksElement.textContent = overdueTasks;
    }

    updateTaskSummary(taskCount) {
        const summaryText = document.getElementById('task-summary-text');
        if (summaryText) {
            const filterCategory = document.getElementById('filter-category')?.value;
            const filterStatus = document.getElementById('filter-status')?.value;
            
            let summary = `Showing ${taskCount} task${taskCount !== 1 ? 's' : ''}`;
            
            if (filterCategory && filterCategory !== 'all') {
                summary += ` in ${filterCategory}`;
            }
            
            if (filterStatus && filterStatus !== 'all') {
                summary += ` (${filterStatus})`;
            }
            
            summaryText.textContent = summary;
        }
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
                    priority: 'medium',
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
                    priority: 'high',
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