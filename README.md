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

#### MongoDB Atlas (Cloud) - CONFIGURED ✅
The application is now configured to use MongoDB Atlas cloud database.

1. **Connection String**: Already configured in the application
2. **Database**: `ClusterTest` cluster
3. **Collections**: `users` (for user data)

#### Option A: Local MongoDB (Alternative)
If you prefer to use local MongoDB:
1. Install MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Update the connection string in `server/server.js` to: `mongodb://localhost:27017/taskmanager`

### 3. Environment Variables

The application is pre-configured with MongoDB Atlas. If you want to use environment variables:

1. Copy `env.example` to `.env`:
   ```bash
   cp env.example .env
   ```

2. The `.env` file should contain:
   ```env
   MONGODB_URI=mongodb+srv://ranamayank080:ishurana098@clustertest.hkinjhb.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTest
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