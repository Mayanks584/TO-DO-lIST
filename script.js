document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskModal = document.getElementById('task-modal');
    const taskForm = document.getElementById('task-form');
    const cancelBtn = document.getElementById('cancel-btn');
    const taskList = document.getElementById('task-list');
    const modalTitle = document.getElementById('modal-title');
    const searchBar = document.getElementById('search-bar');
    const filterCategory = document.getElementById('filter-category');
    const filterStatus = document.getElementById('filter-status');
    const sortTasks = document.getElementById('sort-tasks');

    // State
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentEditTaskId = null;

    // --- Data Persistence ---
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // --- Core Logic ---
    const renderTasks = (taskArray = tasks) => {
        taskList.innerHTML = '';
        if (taskArray.length === 0) {
            taskList.innerHTML = '<li>No tasks found. Add one!</li>';
            return;
        }

        taskArray.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskItem.dataset.id = task.id;

            const categoryClass = `cat-${task.category.toLowerCase()}`;
            
            taskItem.innerHTML = `
                <input type="checkbox" class="task-complete" ${task.completed ? 'checked' : ''}>
                <div class="task-details">
                    <p class="task-title">${task.title}</p>
                    <div class="task-info">
                        <span>Due: ${task.dueDate}</span>
                        <span class="task-category ${categoryClass}">${task.category}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="btn delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    };

    const applyFiltersAndSort = () => {
        let filteredTasks = [...tasks];

        // Filter by Search
        const searchTerm = searchBar.value.toLowerCase();
        if (searchTerm) {
            filteredTasks = filteredTasks.filter(task => 
                task.title.toLowerCase().includes(searchTerm) ||
                task.description.toLowerCase().includes(searchTerm)
            );
        }

        // Filter by Category
        const category = filterCategory.value;
        if (category !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.category === category);
        }

        // Filter by Status
        const status = filterStatus.value;
        if (status !== 'all') {
            filteredTasks = filteredTasks.filter(task => 
                (status === 'completed' && task.completed) || (status === 'incomplete' && !task.completed)
            );
        }

        // Sort
        const sortValue = sortTasks.value;
        filteredTasks.sort((a, b) => {
            const dateA = new Date(a.dueDate);
            const dateB = new Date(b.dueDate);
            return sortValue === 'date-asc' ? dateA - dateB : dateB - dateA;
        });

        renderTasks(filteredTasks);
    };

    // --- Modal Handling ---
    const showModal = (isEdit = false, task = null) => {
        taskForm.reset();
        if (isEdit && task) {
            modalTitle.textContent = 'Edit Task';
            currentEditTaskId = task.id;
            document.getElementById('task-id').value = task.id;
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-desc').value = task.description;
            document.getElementById('task-due-date').value = task.dueDate;
            document.getElementById('task-category').value = task.category;
        } else {
            modalTitle.textContent = 'Add New Task';
            currentEditTaskId = null;
        }
        taskModal.style.display = 'flex';
    };

    const hideModal = () => {
        taskModal.style.display = 'none';
    };

    // --- Event Listeners ---
    addTaskBtn.addEventListener('click', () => showModal(false));
    cancelBtn.addEventListener('click', hideModal);
    window.addEventListener('click', (e) => {
        if (e.target === taskModal) hideModal();
    });

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('task-title').value.trim();
        const description = document.getElementById('task-desc').value.trim();
        const dueDate = document.getElementById('task-due-date').value;
        const category = document.getElementById('task-category').value;

        if (!title || !dueDate) {
            alert('Title and Due Date are required.');
            return;
        }

        if (currentEditTaskId) {
            // Editing existing task
            const taskIndex = tasks.findIndex(t => t.id === currentEditTaskId);
            if (taskIndex > -1) {
                tasks[taskIndex] = { ...tasks[taskIndex], title, description, dueDate, category };
            }
        } else {
            // Adding new task
            const newTask = {
                id: Date.now(),
                title,
                description,
                dueDate,
                category,
                completed: false
            };
            tasks.push(newTask);
        }

        saveTasks();
        applyFiltersAndSort();
        hideModal();
    });

    taskList.addEventListener('click', (e) => {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem) return;

        const taskId = Number(taskItem.dataset.id);
        const task = tasks.find(t => t.id === taskId);

        if (e.target.closest('.delete-btn')) {
            if (confirm('Are you sure you want to delete this task?')) {
                tasks = tasks.filter(t => t.id !== taskId);
                saveTasks();
                applyFiltersAndSort();
            }
        } else if (e.target.closest('.edit-btn')) {
            showModal(true, task);
        } else if (e.target.matches('.task-complete')) {
            task.completed = !task.completed;
            saveTasks();
            applyFiltersAndSort(); // Re-render to apply 'completed' class and filter if needed
        }
    });

    // Filters and Sort Listeners
    searchBar.addEventListener('input', applyFiltersAndSort);
    filterCategory.addEventListener('change', applyFiltersAndSort);
    filterStatus.addEventListener('change', applyFiltersAndSort);
    sortTasks.addEventListener('change', applyFiltersAndSort);

    // Initial Render
    applyFiltersAndSort();
});