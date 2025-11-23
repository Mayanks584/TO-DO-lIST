require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not set. Please create a .env file.');
    // Don't exit immediately to allow file serving, but DB features won't work
} else {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('MongoDB connection error:', err));
}

// --- Schemas ---

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    createdAt: { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: String }, // Keeping as String (YYYY-MM-DD) for consistency with frontend
    category: { type: String, default: 'Personal' },
    priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
    status: { type: String, enum: ['incomplete', 'completed'], default: 'incomplete' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

// --- Middleware ---

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ success: false, message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

// --- Routes ---

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString(), server: 'TaskFlow API' });
});

// Auth: Register
app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password || password.length < 6) {
            return res.status(400).json({ success: false, message: 'Invalid input' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Auth: Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            success: true,
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Tasks: Get All
app.get('/api/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching tasks' });
    }
});

// Tasks: Create
app.post('/api/tasks', auth, async (req, res) => {
    try {
        const task = new Task({
            ...req.body,
            userId: req.user.id
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error creating task' });
    }
});

// Tasks: Update
app.put('/api/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
        res.json(task);
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error updating task' });
    }
});

// Tasks: Delete
app.delete('/api/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!task) return res.status(404).json({ success: false, message: 'Task not found' });
        res.json({ success: true, message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting task' });
    }
});

// Serve static files (Frontend)
app.get('*', (req, res) => {
    // In development, this might not be hit if using Vite server, 
    // but useful for production build serving
    res.sendFile(path.join(__dirname, '..', 'home.html')); 
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
