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
    window.location.href = 'index.html';
}

// Go to dashboard function with authentication check
function goToDashboard() {
    const currentUser = checkAuth();
    if (currentUser) {
        console.log('User authenticated, redirecting to dashboard');
        window.location.href = 'dashboard.html';
    } else {
        console.log('User not authenticated, redirecting to login');
        // Show a more elegant message to the user
        showDashboardMessage('Please log in to access your dashboard');
        // Redirect to login page after a short delay
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }
}

// Show dashboard access message
function showDashboardMessage(message) {
    // Remove any existing message
    const existingMessage = document.getElementById('dashboard-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.id = 'dashboard-message';
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4a90e2;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 0.9rem;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
    `;
    messageDiv.textContent = message;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(messageDiv);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }
    }, 4000);
}

// Task Management System
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        this.currentUser = checkAuth();
        this.currentView = 'list';
        this.selectedTasks = new Set();
        
        if (!this.currentUser) {
            console.log('No authenticated user, redirecting to index');
            window.location.href = 'index.html';
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
            this.addSampleNotificationsIfEmpty();
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

        // Setup additional functionality
        this.setupSettingsEvents();
        this.setupAnalyticsEvents();
        this.setupCalendarEvents();
        this.setupNotificationsEvents();
        
        // Initialize notifications badge
        this.updateNotificationBadge();
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

    addSampleNotificationsIfEmpty() {
        const notifications = this.getNotifications();
        if (notifications.length === 0) {
            const sampleNotifications = [
                {
                    id: Date.now().toString(),
                    title: 'Welcome to TaskFlow!',
                    message: 'Your task management journey begins now. Start by creating your first task.',
                    type: 'system',
                    timestamp: new Date().toISOString(),
                    read: false
                },
                {
                    id: (Date.now() + 1).toString(),
                    title: 'Quick Tip',
                    message: 'Use the calendar view to see all your tasks in a monthly overview.',
                    type: 'system',
                    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
                    read: false
                },
                {
                    id: (Date.now() + 2).toString(),
                    title: 'Feature Available',
                    message: 'Check out the analytics section to track your productivity progress.',
                    type: 'system',
                    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
                    read: true
                }
            ];

            localStorage.setItem('notifications', JSON.stringify(sampleNotifications));
            this.updateNotificationBadge();
            console.log('Sample notifications added');
        }
    }

    // Settings Modal Functions
    setupSettingsEvents() {
        const settingsBtn = document.querySelector('.settings-btn');
        const settingsModal = document.getElementById('settings-modal');
        const closeSettingsBtn = document.querySelector('.settings-modal .modal-close');
        const saveSettingsBtn = document.querySelector('.save-settings-btn');
        const resetSettingsBtn = document.querySelector('.reset-settings-btn');

        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => this.openSettingsModal());
        }

        if (closeSettingsBtn) {
            closeSettingsBtn.addEventListener('click', () => this.closeSettingsModal());
        }

        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        }

        if (resetSettingsBtn) {
            resetSettingsBtn.addEventListener('click', () => this.resetSettings());
        }

        // Close modal when clicking outside
        if (settingsModal) {
            settingsModal.addEventListener('click', (e) => {
                if (e.target === settingsModal) {
                    this.closeSettingsModal();
                }
            });
        }
    }

    openSettingsModal() {
        const settingsModal = document.getElementById('settings-modal');
        if (settingsModal) {
            this.loadSettings();
            settingsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeSettingsModal() {
        const settingsModal = document.getElementById('settings-modal');
        if (settingsModal) {
            settingsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    loadSettings() {
        const settings = JSON.parse(localStorage.getItem('userSettings') || '{}');
        
        // Load theme preference
        const themeSelect = document.getElementById('theme-select');
        if (themeSelect) {
            themeSelect.value = settings.theme || 'light';
        }

        // Load notification settings
        const emailNotifications = document.getElementById('email-notifications');
        const pushNotifications = document.getElementById('push-notifications');
        const reminderTime = document.getElementById('reminder-time');

        if (emailNotifications) {
            emailNotifications.checked = settings.emailNotifications !== false;
        }
        if (pushNotifications) {
            pushNotifications.checked = settings.pushNotifications !== false;
        }
        if (reminderTime) {
            reminderTime.value = settings.reminderTime || '09:00';
        }
    }

    saveSettings() {
        const settings = {
            theme: document.getElementById('theme-select')?.value || 'light',
            emailNotifications: document.getElementById('email-notifications')?.checked !== false,
            pushNotifications: document.getElementById('push-notifications')?.checked !== false,
            reminderTime: document.getElementById('reminder-time')?.value || '09:00'
        };

        localStorage.setItem('userSettings', JSON.stringify(settings));
        this.showToast('Settings saved successfully!', 'success');
        this.closeSettingsModal();
    }

    resetSettings() {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            localStorage.removeItem('userSettings');
            this.loadSettings();
            this.showToast('Settings reset to default!', 'info');
        }
    }

    // Analytics Modal Functions
    setupAnalyticsEvents() {
        const analyticsBtn = document.querySelector('.analytics-btn');
        const analyticsModal = document.getElementById('analytics-modal');
        const closeAnalyticsBtn = document.querySelector('.analytics-modal .modal-close');

        if (analyticsBtn) {
            analyticsBtn.addEventListener('click', () => this.openAnalyticsModal());
        }

        if (closeAnalyticsBtn) {
            closeAnalyticsBtn.addEventListener('click', () => this.closeAnalyticsModal());
        }

        // Close modal when clicking outside
        if (analyticsModal) {
            analyticsModal.addEventListener('click', (e) => {
                if (e.target === analyticsModal) {
                    this.closeAnalyticsModal();
                }
            });
        }
    }

    openAnalyticsModal() {
        const analyticsModal = document.getElementById('analytics-modal');
        if (analyticsModal) {
            this.loadAnalytics();
            analyticsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeAnalyticsModal() {
        const analyticsModal = document.getElementById('analytics-modal');
        if (analyticsModal) {
            analyticsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    loadAnalytics() {
        this.calculateTaskCompletionRate();
        this.calculateAverageCompletionTime();
        this.calculateProductivityScore();
        this.loadCategoryBreakdown();
        this.loadWeeklyProgress();
    }

    calculateTaskCompletionRate() {
        const userTasks = this.tasks.filter(task => task.userId === this.currentUser.id);
        const completedTasks = userTasks.filter(task => task.status === 'complete');
        const completionRate = userTasks.length > 0 ? (completedTasks.length / userTasks.length * 100).toFixed(1) : 0;
        
        const completionRateElement = document.getElementById('completion-rate');
        if (completionRateElement) {
            completionRateElement.textContent = `${completionRate}%`;
        }
    }

    calculateAverageCompletionTime() {
        const userTasks = this.tasks.filter(task => task.userId === this.currentUser.id && task.status === 'complete');
        if (userTasks.length === 0) {
            const avgTimeElement = document.getElementById('avg-completion-time');
            if (avgTimeElement) {
                avgTimeElement.textContent = 'N/A';
            }
            return;
        }

        let totalDays = 0;
        userTasks.forEach(task => {
            const created = new Date(task.createdAt);
            const completed = new Date(task.updatedAt);
            const daysDiff = (completed - created) / (1000 * 60 * 60 * 24);
            totalDays += daysDiff;
        });

        const avgDays = (totalDays / userTasks.length).toFixed(1);
        const avgTimeElement = document.getElementById('avg-completion-time');
        if (avgTimeElement) {
            avgTimeElement.textContent = `${avgDays} days`;
        }
    }

    calculateProductivityScore() {
        const userTasks = this.tasks.filter(task => task.userId === this.currentUser.id);
        const completedTasks = userTasks.filter(task => task.status === 'complete');
        const overdueTasks = userTasks.filter(task => {
            if (task.status === 'complete') return false;
            const dueDate = new Date(task.dueDate);
            return dueDate < new Date();
        });

        let score = 0;
        score += completedTasks.length * 10; // 10 points per completed task
        score -= overdueTasks.length * 5; // -5 points per overdue task
        score = Math.max(0, score); // Don't go below 0

        const productivityScoreElement = document.getElementById('productivity-score');
        if (productivityScoreElement) {
            productivityScoreElement.textContent = score;
        }
    }

    loadCategoryBreakdown() {
        const userTasks = this.tasks.filter(task => task.userId === this.currentUser.id);
        const categoryStats = {};
        
        userTasks.forEach(task => {
            const category = task.category || 'Uncategorized';
            if (!categoryStats[category]) {
                categoryStats[category] = { total: 0, completed: 0 };
            }
            categoryStats[category].total++;
            if (task.status === 'complete') {
                categoryStats[category].completed++;
            }
        });

        const categoryBreakdownElement = document.getElementById('category-breakdown');
        if (categoryBreakdownElement) {
            let html = '';
            Object.entries(categoryStats).forEach(([category, stats]) => {
                const percentage = stats.total > 0 ? (stats.completed / stats.total * 100).toFixed(1) : 0;
                html += `
                    <div class="category-stat">
                        <div class="category-info">
                            <span class="category-name">${category}</span>
                            <span class="category-count">${stats.completed}/${stats.total}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                        <span class="percentage">${percentage}%</span>
                    </div>
                `;
            });
            categoryBreakdownElement.innerHTML = html;
        }
    }

    loadWeeklyProgress() {
        const userTasks = this.tasks.filter(task => task.userId === this.currentUser.id);
        const today = new Date();
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());

        const weeklyStats = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            
            const dayTasks = userTasks.filter(task => {
                const taskDate = new Date(task.updatedAt).toISOString().split('T')[0];
                return taskDate === dateStr && task.status === 'complete';
            });

            weeklyStats.push({
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                count: dayTasks.length
            });
        }

        const weeklyProgressElement = document.getElementById('weekly-progress');
        if (weeklyProgressElement) {
            const maxCount = Math.max(...weeklyStats.map(stat => stat.count), 1);
            let html = '';
            weeklyStats.forEach(stat => {
                const height = (stat.count / maxCount * 100);
                html += `
                    <div class="day-stat">
                        <div class="day-bar" style="height: ${height}%"></div>
                        <span class="day-label">${stat.day}</span>
                        <span class="day-count">${stat.count}</span>
                    </div>
                `;
            });
            weeklyProgressElement.innerHTML = html;
        }
    }

    // Calendar Modal Functions
    setupCalendarEvents() {
        const calendarBtn = document.querySelector('.calendar-btn');
        const calendarModal = document.getElementById('calendar-modal');
        const closeCalendarBtn = document.querySelector('.calendar-modal .modal-close');
        const prevMonthBtn = document.querySelector('.prev-month-btn');
        const nextMonthBtn = document.querySelector('.next-month-btn');

        if (calendarBtn) {
            calendarBtn.addEventListener('click', () => this.openCalendarModal());
        }

        if (closeCalendarBtn) {
            closeCalendarBtn.addEventListener('click', () => this.closeCalendarModal());
        }

        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', () => this.changeMonth(-1));
        }

        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', () => this.changeMonth(1));
        }

        // Close modal when clicking outside
        if (calendarModal) {
            calendarModal.addEventListener('click', (e) => {
                if (e.target === calendarModal) {
                    this.closeCalendarModal();
                }
            });
        }
    }

    openCalendarModal() {
        const calendarModal = document.getElementById('calendar-modal');
        if (calendarModal) {
            this.currentMonth = new Date();
            this.renderCalendar();
            calendarModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeCalendarModal() {
        const calendarModal = document.getElementById('calendar-modal');
        if (calendarModal) {
            calendarModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    changeMonth(delta) {
        if (!this.currentMonth) {
            this.currentMonth = new Date();
        }
        this.currentMonth.setMonth(this.currentMonth.getMonth() + delta);
        this.renderCalendar();
    }

    renderCalendar() {
        const calendarBody = document.getElementById('calendar-body');
        const monthYearHeader = document.getElementById('month-year');
        
        if (!calendarBody || !monthYearHeader) return;

        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();
        
        monthYearHeader.textContent = this.currentMonth.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
        });

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());

        let html = '';
        for (let week = 0; week < 6; week++) {
            html += '<tr>';
            for (let day = 0; day < 7; day++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + (week * 7) + day);
                
                const isCurrentMonth = currentDate.getMonth() === month;
                const isToday = currentDate.toDateString() === new Date().toDateString();
                const dateStr = currentDate.toISOString().split('T')[0];
                
                // Check if there are tasks for this date
                const userTasks = this.tasks.filter(task => task.userId === this.currentUser.id);
                const dayTasks = userTasks.filter(task => {
                    const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
                    return taskDate === dateStr;
                });
                
                const hasTasks = dayTasks.length > 0;
                const completedTasks = dayTasks.filter(task => task.status === 'complete').length;
                const overdueTasks = dayTasks.filter(task => {
                    if (task.status === 'complete') return false;
                    return new Date(task.dueDate) < new Date();
                }).length;

                let className = 'calendar-day';
                if (!isCurrentMonth) className += ' other-month';
                if (isToday) className += ' today';
                if (hasTasks) className += ' has-tasks';
                if (overdueTasks > 0) className += ' overdue';

                html += `
                    <td class="${className}" data-date="${dateStr}">
                        <span class="day-number">${currentDate.getDate()}</span>
                        ${hasTasks ? `<div class="task-indicator">
                            <span class="completed-count">${completedTasks}</span>
                            <span class="total-count">/${dayTasks.length}</span>
                        </div>` : ''}
                    </td>
                `;
            }
            html += '</tr>';
        }
        
        calendarBody.innerHTML = html;

        // Add click event to show day tasks
        const dayCells = calendarBody.querySelectorAll('.calendar-day');
        dayCells.forEach(cell => {
            cell.addEventListener('click', () => {
                const date = cell.dataset.date;
                this.showDayTasks(date);
            });
        });
    }

    showDayTasks(date) {
        const userTasks = this.tasks.filter(task => task.userId === this.currentUser.id);
        const dayTasks = userTasks.filter(task => {
            const taskDate = new Date(task.dueDate).toISOString().split('T')[0];
            return taskDate === date;
        });

        const dayTasksContainer = document.getElementById('day-tasks');
        const dayTasksTitle = document.getElementById('day-tasks-title');
        
        if (dayTasksTitle) {
            const displayDate = new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            dayTasksTitle.textContent = `Tasks for ${displayDate}`;
        }

        if (dayTasksContainer) {
            if (dayTasks.length === 0) {
                dayTasksContainer.innerHTML = '<p class="no-tasks">No tasks scheduled for this day.</p>';
            } else {
                let html = '';
                dayTasks.forEach(task => {
                    const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'complete';
                    html += `
                        <div class="day-task-item ${task.status === 'complete' ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}">
                            <div class="task-checkbox">
                                <input type="checkbox" ${task.status === 'complete' ? 'checked' : ''} 
                                       onchange="taskManager.toggleTaskStatus('${task.id}')">
                            </div>
                            <div class="task-content">
                                <h4 class="task-title">${task.title}</h4>
                                <p class="task-description">${task.description || ''}</p>
                                <div class="task-meta">
                                    <span class="task-category">${task.category}</span>
                                    <span class="task-priority ${task.priority}">${task.priority}</span>
                                </div>
                            </div>
                        </div>
                    `;
                });
                dayTasksContainer.innerHTML = html;
            }
        }
    }

    // Notifications Panel Functions
    setupNotificationsEvents() {
        const notificationsBtn = document.querySelector('.notifications-btn');
        const notificationsPanel = document.getElementById('notifications-panel');
        const closeNotificationsBtn = document.querySelector('.close-notifications-btn');
        const markAllReadBtn = document.querySelector('.mark-all-read-btn');

        if (notificationsBtn) {
            notificationsBtn.addEventListener('click', () => this.toggleNotificationsPanel());
        }

        if (closeNotificationsBtn) {
            closeNotificationsBtn.addEventListener('click', () => this.closeNotificationsPanel());
        }

        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', () => this.markAllNotificationsRead());
        }

        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (notificationsPanel && !notificationsPanel.contains(e.target) && 
                !notificationsBtn?.contains(e.target)) {
                this.closeNotificationsPanel();
            }
        });
    }

    toggleNotificationsPanel() {
        const notificationsPanel = document.getElementById('notifications-panel');
        if (notificationsPanel) {
            const isOpen = notificationsPanel.classList.contains('active');
            if (isOpen) {
                this.closeNotificationsPanel();
            } else {
                this.openNotificationsPanel();
            }
        }
    }

    openNotificationsPanel() {
        const notificationsPanel = document.getElementById('notifications-panel');
        if (notificationsPanel) {
            this.loadNotifications();
            notificationsPanel.classList.add('active');
        }
    }

    closeNotificationsPanel() {
        const notificationsPanel = document.getElementById('notifications-panel');
        if (notificationsPanel) {
            notificationsPanel.classList.remove('active');
        }
    }

    loadNotifications() {
        const notifications = this.getNotifications();
        const notificationsList = document.getElementById('notifications-list');
        
        if (notificationsList) {
            if (notifications.length === 0) {
                notificationsList.innerHTML = '<p class="no-notifications">No notifications</p>';
            } else {
                let html = '';
                notifications.forEach(notification => {
                    html += `
                        <div class="notification-item ${notification.read ? 'read' : 'unread'}" 
                             data-id="${notification.id}">
                            <div class="notification-icon">
                                <i class="${this.getNotificationIcon(notification.type)}"></i>
                            </div>
                            <div class="notification-content">
                                <h4 class="notification-title">${notification.title}</h4>
                                <p class="notification-message">${notification.message}</p>
                                <span class="notification-time">${this.formatNotificationTime(notification.timestamp)}</span>
                            </div>
                            ${!notification.read ? '<div class="unread-indicator"></div>' : ''}
                        </div>
                    `;
                });
                notificationsList.innerHTML = html;

                // Add click events to mark as read
                const notificationItems = notificationsList.querySelectorAll('.notification-item');
                notificationItems.forEach(item => {
                    item.addEventListener('click', () => {
                        const notificationId = item.dataset.id;
                        this.markNotificationRead(notificationId);
                    });
                });
            }
        }

        this.updateNotificationBadge();
    }

    getNotifications() {
        return JSON.parse(localStorage.getItem('notifications') || '[]');
    }

    getNotificationIcon(type) {
        const icons = {
            'task': 'fas fa-tasks',
            'reminder': 'fas fa-bell',
            'overdue': 'fas fa-exclamation-triangle',
            'completed': 'fas fa-check-circle',
            'system': 'fas fa-info-circle'
        };
        return icons[type] || 'fas fa-bell';
    }

    formatNotificationTime(timestamp) {
        const now = new Date();
        const notificationTime = new Date(timestamp);
        const diffMs = now - notificationTime;
        const diffMins = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return notificationTime.toLocaleDateString();
    }

    markNotificationRead(notificationId) {
        const notifications = this.getNotifications();
        const notification = notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            localStorage.setItem('notifications', JSON.stringify(notifications));
            this.loadNotifications();
        }
    }

    markAllNotificationsRead() {
        const notifications = this.getNotifications();
        notifications.forEach(notification => {
            notification.read = true;
        });
        localStorage.setItem('notifications', JSON.stringify(notifications));
        this.loadNotifications();
        this.showToast('All notifications marked as read!', 'success');
    }

    updateNotificationBadge() {
        const notifications = this.getNotifications();
        const unreadCount = notifications.filter(n => !n.read).length;
        const badge = document.querySelector('.notifications-btn .notification-badge');
        
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    addNotification(title, message, type = 'system') {
        const notifications = this.getNotifications();
        const newNotification = {
            id: Date.now().toString(),
            title,
            message,
            type,
            timestamp: new Date().toISOString(),
            read: false
        };
        
        notifications.unshift(newNotification);
        localStorage.setItem('notifications', JSON.stringify(notifications));
        this.updateNotificationBadge();
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
            console.log('No authenticated user, redirecting to index');
            window.location.href = 'index.html';
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
window.goToDashboard = goToDashboard;
window.showDashboardMessage = showDashboardMessage;