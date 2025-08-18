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
        }
    }
});