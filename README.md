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
- 🔐 User registration and authentication
- ✅ Task creation, editing, and deletion
- 🏷️ Task categorization and filtering (Work, Personal, Shopping, etc.)
- 🎨 Beautiful, responsive design
- 🗄️ MongoDB database integration
- 🔑 Secure password hashing
- 📈 Real-time task statistics
- 🌐 Scroll-based navigation highlighting
- 💫 Smooth animations and transitions

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

## 🌐 Two Deployment Options

### 🚀 **Option 1: Live Server (Quick Start)**
Perfect for development and testing:
```bash
# Use VS Code "Go Live" extension or any static server
# No backend setup required - uses localStorage
```

### 🗄️ **Option 2: Full Backend (Production)**
Complete MongoDB integration:
```bash
node server/server.js
# Navigate to http://localhost:3000
```

## 🔌 API Endpoints

- `POST /api/register` - User registration with password hashing
- `POST /api/login` - User authentication and session management
- `GET /` - Serve main landing page
- `GET /dashboard.html` - Serve task management dashboard
- `GET /api/tasks` - Retrieve user tasks (planned)
- `POST /api/tasks` - Create new task (planned)
- `PUT /api/tasks/:id` - Update task (planned)
- `DELETE /api/tasks/:id` - Delete task (planned)

## 🗃️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (required, unique),
  password: String (hashed with bcrypt, required),
  createdAt: Date (default: Date.now),
  updatedAt: Date
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
- Input sanitization
- CORS protection
- Environment variable protection

## 🚀 Quick Start Guide

1. **For Development (Live Server)**:
   - Open project in VS Code
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

2. **For Production (Full Backend)**:
   - Set up MongoDB Atlas account
   - Configure `.env` file
   - Run `npm install && node server/server.js`

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