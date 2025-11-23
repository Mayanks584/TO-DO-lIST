import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const register = async (email, password) => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = existingUsers.find(user => user.email === email);
      
      if (existingUser) {
        return { success: false, message: 'User with this email already exists' };
      }

      const newUser = {
        id: Date.now().toString(),
        email: email,
        password: password, // In a real app, hash this!
        createdAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Auto login after register
      localStorage.setItem('currentUser', JSON.stringify({
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt
      }));
      setCurrentUser({
        id: newUser.id,
        email: newUser.email,
        createdAt: newUser.createdAt
      });

      return { success: true, message: 'User registered successfully' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Registration failed' };
    }
  };

  const login = async (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        return { success: false, message: 'Invalid email or password' };
      }

      const userSession = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt
      };

      localStorage.setItem('currentUser', JSON.stringify(userSession));
      setCurrentUser(userSession);
      return { success: true, message: 'Login successful' };
    } catch (error) {
      console.error(error);
      return { success: false, message: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}



