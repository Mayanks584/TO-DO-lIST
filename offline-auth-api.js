/**
 * Offline-First Authentication API
 * This API automatically detects server availability and falls back to local storage
 * when the server is offline, providing seamless authentication functionality.
 */

class OfflineAuthAPI {
    constructor(options = {}) {
        this.serverUrl = options.serverUrl || '';
        this.endpoints = {
            login: options.loginEndpoint || '/api/login',
            register: options.registerEndpoint || '/api/register',
            users: options.usersEndpoint || '/api/users'
        };
        this.timeout = options.timeout || 5000; // 5 seconds timeout
        this.isOnline = navigator.onLine;
        this.serverAvailable = false;
        
        // Initialize event listeners for online/offline detection
        this.initializeNetworkListeners();
        
        // Check server availability on initialization
        this.checkServerAvailability();
        
        // Storage keys
        this.storageKeys = {
            users: 'offline_auth_users',
            currentUser: 'offline_auth_current_user',
            pendingSync: 'offline_auth_pending_sync',
            lastSync: 'offline_auth_last_sync'
        };
    }

    /**
     * Initialize network status listeners
     */
    initializeNetworkListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.checkServerAvailability();
            this.syncPendingData();
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.serverAvailable = false;
        });
    }

    /**
     * Check if server is available
     */
    async checkServerAvailability() {
        if (!this.isOnline) {
            this.serverAvailable = false;
            return false;
        }

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(this.serverUrl + '/api/health', {
                method: 'GET',
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            clearTimeout(timeoutId);
            this.serverAvailable = response.ok;
            
            if (this.serverAvailable) {
                this.syncPendingData();
            }
            
            return this.serverAvailable;
        } catch (error) {
            // If health endpoint doesn't exist, try a simple GET to the server
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);

                const response = await fetch(this.serverUrl + '/', {
                    method: 'GET',
                    signal: controller.signal
                });

                clearTimeout(timeoutId);
                this.serverAvailable = response.ok || response.status === 404; // 404 means server is up but route not found
                
                if (this.serverAvailable) {
                    this.syncPendingData();
                }
                
                return this.serverAvailable;
            } catch (error) {
                this.serverAvailable = false;
                return false;
            }
        }
    }

    /**
     * Register a new user
     */
    async register(userData) {
        const { email, password } = userData;

        // Validate input
        if (!email || !password) {
            return {
                success: false,
                message: 'Email and password are required',
                source: 'validation'
            };
        }

        if (password.length < 6) {
            return {
                success: false,
                message: 'Password must be at least 6 characters long',
                source: 'validation'
            };
        }

        // Try server first if available
        if (this.isOnline && this.serverAvailable) {
            try {
                const result = await this.registerOnServer(userData);
                if (result.success) {
                    // Store in local storage as backup
                    this.storeUserLocally(result.user, password);
                    this.setCurrentUser(result.user);
                }
                return { ...result, source: 'server' };
            } catch (error) {
                console.warn('Server registration failed, falling back to local storage:', error);
                this.serverAvailable = false;
            }
        }

        // Use local storage
        return this.registerLocally(userData);
    }

    /**
     * Login user
     */
    async login(credentials) {
        const { email, password } = credentials;

        // Validate input
        if (!email || !password) {
            return {
                success: false,
                message: 'Email and password are required',
                source: 'validation'
            };
        }

        // Try server first if available
        if (this.isOnline && this.serverAvailable) {
            try {
                const result = await this.loginOnServer(credentials);
                if (result.success) {
                    // Store in local storage as backup
                    this.storeUserLocally(result.user, password);
                    this.setCurrentUser(result.user);
                }
                return { ...result, source: 'server' };
            } catch (error) {
                console.warn('Server login failed, falling back to local storage:', error);
                this.serverAvailable = false;
            }
        }

        // Use local storage
        return this.loginLocally(credentials);
    }

    /**
     * Register user on server
     */
    async registerOnServer(userData) {
        const response = await fetch(this.serverUrl + this.endpoints.register, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Server registration failed');
        }

        return result;
    }

    /**
     * Login user on server
     */
    async loginOnServer(credentials) {
        const response = await fetch(this.serverUrl + this.endpoints.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'Server login failed');
        }

        return result;
    }

    /**
     * Register user locally
     */
    registerLocally(userData) {
        const { email, password } = userData;

        try {
            // Check if user already exists
            const existingUsers = this.getLocalUsers();
            const existingUser = existingUsers.find(user => user.email === email);
            
            if (existingUser) {
                return {
                    success: false,
                    message: 'User with this email already exists',
                    source: 'local'
                };
            }

            // Create new user
            const newUser = {
                id: this.generateId(),
                email: email,
                createdAt: new Date().toISOString(),
                syncStatus: 'pending' // Mark for sync when online
            };

            // Store user with password (in production, hash the password)
            const userWithPassword = { ...newUser, password: this.hashPassword(password) };
            existingUsers.push(userWithPassword);
            this.setLocalUsers(existingUsers);

            // Add to pending sync
            this.addToPendingSync('register', userWithPassword);

            // Set as current user
            this.setCurrentUser(newUser);

            return {
                success: true,
                message: 'User registered successfully (offline mode)',
                user: newUser,
                source: 'local'
            };

        } catch (error) {
            console.error('Local registration error:', error);
            return {
                success: false,
                message: 'Registration failed. Please try again.',
                source: 'local'
            };
        }
    }

    /**
     * Login user locally
     */
    loginLocally(credentials) {
        const { email, password } = credentials;

        try {
            // Get users from local storage
            const users = this.getLocalUsers();
            const user = users.find(u => 
                u.email === email && 
                this.verifyPassword(password, u.password)
            );

            if (!user) {
                return {
                    success: false,
                    message: 'Invalid email or password',
                    source: 'local'
                };
            }

            // Remove password from user object for security
            const { password: _, ...userWithoutPassword } = user;
            this.setCurrentUser(userWithoutPassword);

            return {
                success: true,
                message: 'Login successful (offline mode)',
                user: userWithoutPassword,
                source: 'local'
            };

        } catch (error) {
            console.error('Local login error:', error);
            return {
                success: false,
                message: 'Login failed. Please try again.',
                source: 'local'
            };
        }
    }

    /**
     * Get current user
     */
    getCurrentUser() {
        try {
            const user = localStorage.getItem(this.storageKeys.currentUser);
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    /**
     * Set current user
     */
    setCurrentUser(user) {
        try {
            if (user) {
                localStorage.setItem(this.storageKeys.currentUser, JSON.stringify(user));
            } else {
                localStorage.removeItem(this.storageKeys.currentUser);
            }
        } catch (error) {
            console.error('Error setting current user:', error);
        }
    }

    /**
     * Logout user
     */
    logout() {
        this.setCurrentUser(null);
        return {
            success: true,
            message: 'Logged out successfully'
        };
    }

    /**
     * Check if user is authenticated
     */
    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }

    /**
     * Get local users
     */
    getLocalUsers() {
        try {
            const users = localStorage.getItem(this.storageKeys.users);
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error('Error getting local users:', error);
            return [];
        }
    }

    /**
     * Set local users
     */
    setLocalUsers(users) {
        try {
            localStorage.setItem(this.storageKeys.users, JSON.stringify(users));
        } catch (error) {
            console.error('Error setting local users:', error);
        }
    }

    /**
     * Store user locally
     */
    storeUserLocally(user, password) {
        try {
            const users = this.getLocalUsers();
            const existingUserIndex = users.findIndex(u => u.email === user.email);
            
            const userWithPassword = { 
                ...user, 
                password: this.hashPassword(password),
                syncStatus: 'synced'
            };

            if (existingUserIndex >= 0) {
                users[existingUserIndex] = userWithPassword;
            } else {
                users.push(userWithPassword);
            }

            this.setLocalUsers(users);
        } catch (error) {
            console.error('Error storing user locally:', error);
        }
    }

    /**
     * Add operation to pending sync
     */
    addToPendingSync(operation, data) {
        try {
            const pending = this.getPendingSync();
            pending.push({
                operation,
                data,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem(this.storageKeys.pendingSync, JSON.stringify(pending));
        } catch (error) {
            console.error('Error adding to pending sync:', error);
        }
    }

    /**
     * Get pending sync operations
     */
    getPendingSync() {
        try {
            const pending = localStorage.getItem(this.storageKeys.pendingSync);
            return pending ? JSON.parse(pending) : [];
        } catch (error) {
            console.error('Error getting pending sync:', error);
            return [];
        }
    }

    /**
     * Sync pending data when server becomes available
     */
    async syncPendingData() {
        if (!this.serverAvailable) return;

        const pendingOperations = this.getPendingSync();
        if (pendingOperations.length === 0) return;

        console.log('Syncing pending operations:', pendingOperations);

        const successfulSyncs = [];

        for (const operation of pendingOperations) {
            try {
                let success = false;
                
                switch (operation.operation) {
                    case 'register':
                        const registerResult = await this.registerOnServer({
                            email: operation.data.email,
                            password: operation.data.password // This should be the original password
                        });
                        success = registerResult.success;
                        break;
                    // Add other operations as needed
                }

                if (success) {
                    successfulSyncs.push(operation);
                }
            } catch (error) {
                console.error('Failed to sync operation:', operation, error);
            }
        }

        // Remove successfully synced operations
        if (successfulSyncs.length > 0) {
            const remainingOperations = pendingOperations.filter(op => 
                !successfulSyncs.includes(op)
            );
            localStorage.setItem(this.storageKeys.pendingSync, JSON.stringify(remainingOperations));
            
            // Update last sync time
            localStorage.setItem(this.storageKeys.lastSync, new Date().toISOString());
            
            console.log(`Synced ${successfulSyncs.length} operations successfully`);
        }
    }

    /**
     * Simple password hashing (use a proper library in production)
     */
    hashPassword(password) {
        // This is a simple hash for demonstration
        // In production, use bcrypt or similar
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    /**
     * Verify password
     */
    verifyPassword(password, hashedPassword) {
        return this.hashPassword(password) === hashedPassword;
    }

    /**
     * Generate unique ID
     */
    generateId() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Get connection status
     */
    getConnectionStatus() {
        return {
            isOnline: this.isOnline,
            serverAvailable: this.serverAvailable,
            lastSync: localStorage.getItem(this.storageKeys.lastSync),
            pendingOperations: this.getPendingSync().length
        };
    }

    /**
     * Clear all local data (for testing/reset purposes)
     */
    clearLocalData() {
        Object.values(this.storageKeys).forEach(key => {
            localStorage.removeItem(key);
        });
    }
}

// Export for use in other scripts
window.OfflineAuthAPI = OfflineAuthAPI;

