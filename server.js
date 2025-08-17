const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const { body, validationResult } = require('express-validator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files from current directory

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

// Validation middleware
const validateUser = [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
];

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/home.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

// Register endpoint
app.post('/api/register', validateUser, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                message: 'Validation failed', 
                errors: errors.array() 
            });
        }

        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists with this email' 
            });
        }

        // Hash password
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const user = new User({
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({ 
            success: true, 
            message: 'User registered successfully',
            user: {
                id: user._id,
                email: user.email,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

// Login endpoint
app.post('/api/login', validateUser, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                message: 'Validation failed', 
                errors: errors.array() 
            });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        res.json({ 
            success: true, 
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                createdAt: user.createdAt
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
});

// Get all users (for testing purposes)
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // Exclude password
        res.json({ success: true, users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 