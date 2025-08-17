# Task Manager with MongoDB

A modern task management application with user authentication using MongoDB.

## Features

- User registration and login
- Secure password hashing with bcrypt
- MongoDB database integration
- Modern, responsive UI
- Express.js backend API

## Prerequisites

Before running this application, make sure you have:

1. **Node.js** (version 14 or higher)
2. **MongoDB** (local installation or MongoDB Atlas account)
3. **npm** (comes with Node.js)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. The application will connect to `mongodb://localhost:27017/taskmanager`

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Create a `.env` file in the project root with:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
   PORT=3000
   ```

### 3. Environment Variables

Create a `.env` file in the project root:

```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/taskmanager

# For MongoDB Atlas (replace with your connection string)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager

# Server Port
PORT=3000
```

### 4. Start the Application

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/register` - Register a new user
  - Body: `{ "email": "user@example.com", "password": "password123" }`

- `POST /api/login` - Login user
  - Body: `{ "email": "user@example.com", "password": "password123" }`

- `GET /api/users` - Get all users (for testing)

### Pages

- `GET /` - Home page
- `GET /login` - Login page
- `GET /register` - Registration page

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed, required, min 6 chars),
  createdAt: Date (default: now)
}
```

## Security Features

- Password hashing using bcrypt with 12 salt rounds
- Input validation and sanitization
- CORS enabled for cross-origin requests
- Email format validation
- Password length requirements

## File Structure

```
├── home.html          # Landing page
├── login.html         # Login page
├── register.html      # Registration page
├── server.js          # Express server
├── package.json       # Dependencies
├── env.example        # Environment variables example
└── README.md          # This file
```

## Usage

1. Start the server: `npm run dev`
2. Open `http://localhost:3000` in your browser
3. Click "Get Started" to register a new account
4. Use your credentials to log in

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (local) or connection string is correct (Atlas)
- Check if the database name in the connection string matches your setup
- Verify network connectivity for Atlas connections

### Port Already in Use
- Change the PORT in `.env` file
- Or kill the process using the current port

### Module Not Found Errors
- Run `npm install` to install dependencies
- Check if `node_modules` folder exists

## Development

To run in development mode with auto-restart:
```bash
npm run dev
```

The server will automatically restart when you make changes to the code. 