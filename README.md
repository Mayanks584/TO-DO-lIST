# 🚀 TaskFlow - Free Task Management App

A modern, feature-rich task management application built with Node.js, Express, MongoDB, and vanilla JavaScript. TaskFlow helps you organize and manage your tasks like a boss with more capabilities than you can imagine! ✨

## ✨ Features

### 🎯 **Core Functionality**
- 📝 **Smart Task Management** - Create, organize, and track tasks with ease
- 👥 **Team Collaboration** - Work together seamlessly with your team
- 📱 **Mobile Ready** - Responsive design that works on all devices
- 📊 **Progress Tracking** - Monitor productivity with detailed analytics
- 🔒 **Secure & Private** - Enterprise-grade security for your data
- ⏰ **Time Management** - Never miss deadlines with smart notifications

### 🚀 **Technical Features**
- 🔐 **Offline-First Authentication** - Works even when server is offline using local storage
- 🔄 **Automatic Data Sync** - Syncs local data with MongoDB Atlas when online
- ✅ Task creation, editing, and deletion
- 🏷️ Task categorization and filtering (Work, Personal, Shopping, etc.)
- 🎨 Beautiful, responsive design
- 🗄️ **MongoDB Atlas Integration** - Cloud database with automatic fallback
- 🔑 Secure password hashing with bcrypt
- 📈 Real-time task statistics
- 🌐 Scroll-based navigation highlighting
- 💫 Smooth animations and transitions
- 📡 **Connection Status Monitoring** - Real-time server connectivity detection

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mayanks584/TaskFlow.git
   cd TaskFlow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   # Copy the example file
   cp .env.example .env
   ```
   
   Edit the `.env` file with your MongoDB connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   npm start
   # or
   node server/server.js
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database

# Server Configuration
PORT=3000
NODE_ENV=development
```

## Security Notes

- ⚠️ **Never commit your `.env` file to version control**
- ⚠️ **Keep your MongoDB URI private**
- ⚠️ **Use strong passwords for your database**
- ⚠️ **Enable MongoDB Atlas network access restrictions**

## 📁 Project Structure

```
TaskFlow/
├── server/
│   └── server.js          # Express server with MongoDB integration
├── index.html             # Main landing page with all sections
├── login.html             # User login page
├── register.html          # User registration page
├── dashboard.html         # Task management dashboard
├── contact.html           # Contact page
├── privacy.html           # Privacy policy page
├── help.html              # Help center page
├── features.html          # Features showcase page
├── pricing.html           # Pricing plans page
├── script.js              # Frontend JavaScript functionality
├── page-content.js        # Page content management
├── style.css              # Main stylesheet
├── package.json           # Project dependencies
├── .env                   # Environment variables (not in git)
├── .env.example           # Example environment variables
├── .gitignore            # Git ignore rules
├── README.md              # Project documentation
├── MONGODB_SETUP.md       # MongoDB setup guide
├── LIVE_SERVER_SETUP.md   # Live server setup guide
└── start-server.bat       # Windows server startup script
```

## 🌐 Deployment Options

### 🚀 **Option 1: Offline-First Mode (Development)**
Perfect for development and testing - works completely offline:
```bash
# Use VS Code "Go Live" extension or any static server
# No backend setup required - uses localStorage for data persistence
# Navigate to http://localhost:5500 (or your live server port)
```

### 🗄️ **Option 2: Full Backend with MongoDB Atlas (Production)**
Complete cloud database integration with offline fallback:
```bash
node server.js
# Navigate to http://localhost:3000
# Automatically syncs with MongoDB Atlas when online
# Falls back to local storage when offline
```

### 🔄 **Hybrid Mode (Recommended)**
The application automatically detects server connectivity and switches between:
- **Online Mode**: Data stored in MongoDB Atlas with real-time sync
- **Offline Mode**: Data stored in browser local storage with automatic sync when online

## 🔌 API Endpoints

### ✅ **Working Endpoints**
- `GET /api/health` - Server health check and connectivity detection
- `POST /api/register` - User registration with password hashing (MongoDB Atlas)
- `POST /api/login` - User authentication and session management (MongoDB Atlas)
- `GET /` - Serve main landing page
- `GET /login` - Serve login page
- `GET /register` - Serve registration page
- `GET /dashboard` - Serve task management dashboard

### 🔄 **Offline-First Features**
- **Automatic Fallback**: When server is offline, all operations use local storage
- **Data Synchronization**: Local data automatically syncs to MongoDB Atlas when online
- **Connection Monitoring**: Real-time server connectivity status display
- **Seamless Switching**: No user intervention required between online/offline modes

### 📋 **Planned Endpoints**
- `GET /api/tasks` - Retrieve user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🗃️ Database Schema

### MongoDB Atlas Collections

#### User Collection (`users`)
```javascript
{
  _id: ObjectId,
  email: String (required, unique),
  password: String (hashed with bcrypt, required),
  createdAt: Date (default: Date.now)
}
```

#### Local Storage Schema (Offline Fallback)
```javascript
// Browser Local Storage Keys:
{
  "users": [User objects],           // Registered users
  "currentUser": User object,        // Currently logged in user
  "tasks": [Task objects],           // User tasks
  "pendingSync": [Operation objects] // Pending sync operations
}
```

### Tasks Collection (Planned)
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String (required),
  description: String,
  category: String (Work, Personal, Shopping, etc.),
  dueDate: Date,
  completed: Boolean (default: false),
  priority: String (High, Medium, Low),
  createdAt: Date (default: Date.now),
  updatedAt: Date
}
```

## 🎨 Key Features Showcase

### 📱 **Responsive Design**
- Mobile-first approach
- Smooth animations and transitions
- Touch-friendly interface
- Cross-browser compatibility

### 🎯 **User Experience**
- Scroll-based navigation highlighting
- Smooth scrolling between sections
- Interactive task statistics
- Real-time form validation

### 🔒 **Security Features**
- Password hashing with bcrypt
- Input sanitization and validation
- CORS protection
- Environment variable protection
- Secure MongoDB Atlas connection
- Offline data encryption (local storage)

## 🚀 Quick Start Guide

### 🚀 **Option 1: Offline-First Development (Simplest)**
1. Open project in VS Code
2. Install "Live Server" extension
3. Right-click `index.html` → "Open with Live Server"
4. **Works completely offline** - all data stored in browser local storage
5. Access at: `http://localhost:5500` (or your live server port)

### 🗄️ **Option 2: Full Backend with MongoDB Atlas (Production Ready)**
1. **Set up MongoDB Atlas**:
   - Create account at [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a cluster and get your connection string
   - Whitelist your IP address (e.g., `136.233.11.130/32`)

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB Atlas connection string
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Test the connection**:
   ```bash
   node test-mongodb-atlas.js
   ```

5. **Start the server**:
   ```bash
   node server.js
   ```

6. **Access your app**:
   - Backend API: `http://localhost:3000`
   - Web Interface: `http://localhost:8000` (see Option 3)

### 🌐 **Option 3: Dual Server Setup (Recommended for Development)**
This setup provides both the backend API and web interface:

1. **Start the Node.js server (Backend API)**:
   ```bash
   node server.js
   # Server runs on http://localhost:3000
   # Connected to MongoDB Atlas
   ```

2. **Start the Python HTTP server (Web Interface)**:
   ```bash
   python -m http.server 8000
   # Web interface runs on http://localhost:8000
   ```

3. **Access your application**:
   - **Main Website**: `http://localhost:8000` - Landing page, login, dashboard
   - **API Endpoints**: `http://localhost:3000` - Backend services
   - **Database**: MongoDB Atlas (cloud storage)

### 🔄 **Hybrid Mode (Automatic)**
The application automatically works in both modes:
- **Online**: Data syncs with MongoDB Atlas
- **Offline**: Data stored in local storage with automatic sync when online

## 📋 **Complete Setup Instructions**

### **Step 1: MongoDB Atlas Configuration**
1. **Create MongoDB Atlas Account**:
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Sign up for a free account
   - Create a new cluster (Free tier recommended)

2. **Configure Database Access**:
   - Go to Database Access in the left sidebar
   - Add New Database User:
     - Username: `taskflow_user`
     - Password: Create a strong password
     - Role: `Read and write to any database`

3. **Configure Network Access**:
   - Go to Network Access in the left sidebar
   - Click "Add IP Address"
   - Add your IP: `136.233.11.130/32` (or "Allow Access from Anywhere" for development)
   - Add comment: "TaskFlow App Server"

4. **Get Connection String**:
   - Go to Clusters → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### **Step 2: Environment Setup**
1. **Create .env file**:
   ```bash
   cp .env.example .env
   ```

2. **Edit .env file**:
   ```env
   # MongoDB Atlas Connection String
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow
   
   # Server Port
   PORT=3000
   
   # Environment
   NODE_ENV=development
   
   # Your IP Address (for reference)
   # IP_ADDRESS=136.233.11.130/32
   ```

### **Step 3: Install Dependencies**
```bash
npm install
```

### **Step 4: Test Database Connection**
```bash
node test-mongodb-atlas.js
```
**Expected Output**:
```
Testing MongoDB Atlas connection...
Environment variables loaded: true
Connection string: Set (hidden for security)

✅ SUCCESS: Connected to MongoDB Atlas!
✅ Database: test
✅ Server is ready to accept connections

You can now start your application server.
```

### **Step 5: Start the Application**

#### **Method A: Single Server (Backend Only)**
```bash
node server.js
# Access at: http://localhost:3000
```

#### **Method B: Dual Server (Recommended)**
**Terminal 1 - Backend API**:
```bash
node server.js
# Server running on http://localhost:3000
# Connected to MongoDB
```

**Terminal 2 - Web Interface**:
```bash
python -m http.server 8000
# Serving HTTP on :: port 8000 (http://[::]:8000/)
```

**Access your app**:
- **Main Website**: `http://localhost:8000`
- **API Backend**: `http://localhost:3000`

### **Step 6: Verify Everything Works**
1. **Open**: `http://localhost:8000`
2. **Test Registration**: Click "Get Started" → Register
3. **Test Login**: Login with your credentials
4. **Test Dashboard**: Access the full task management interface
5. **Check Database**: Your data is now stored in MongoDB Atlas

## 🔧 **Troubleshooting**

### **MongoDB Connection Issues**
```bash
# Test connection
node test-mongodb-atlas.js

# Common solutions:
# 1. Check your .env file has correct MONGODB_URI
# 2. Verify IP address is whitelisted in Atlas
# 3. Check username/password are correct
# 4. Ensure cluster is running
```

### **Port Already in Use**
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 8000
npx kill-port 8000

# Or restart your computer
```

### **Environment Variables Not Loading**
```bash
# Check if .env file exists
ls -la .env

# Verify .env content
cat .env

# Test environment loading
node -e "require('dotenv').config(); console.log(process.env.MONGODB_URI ? 'Loaded' : 'Not loaded')"
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. 💻 Make your changes
4. ✅ Test thoroughly
5. 📝 Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. 🚀 Push to the branch (`git push origin feature/AmazingFeature`)
7. 🔄 Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Contact

- 📧 **Email**: support@taskflow.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/Mayanks584/TaskFlow/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/Mayanks584/TaskFlow/discussions)
- 📖 **Documentation**: Check out our setup guides:
  - [MongoDB Setup Guide](MONGODB_SETUP.md)
  - [Live Server Setup Guide](LIVE_SERVER_SETUP.md)

## 🎉 Acknowledgments

- Thanks to all contributors who helped make TaskFlow amazing!
- Built with ❤️ by the TaskFlow team
- Special thanks to the open-source community

---

**Made with 💙 by TaskFlow Team** | **Star ⭐ this repo if you found it helpful!** 