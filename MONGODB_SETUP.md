# 🗄️ TaskFlow MongoDB Setup Guide

Complete guide to set up MongoDB for your TaskFlow application.

## Quick Start (Windows)

### Option 1: MongoDB as a Service (Recommended)
1. **Install MongoDB Community Server** from: https://www.mongodb.com/try/download/community
2. **During installation**, make sure to install MongoDB as a Windows Service
3. **Start the service**:
   - Open Command Prompt as Administrator
   - Run: `net start MongoDB`
   - Or use Services app: `services.msc` → Find "MongoDB" → Start

### Option 2: Manual MongoDB Start
1. **Download MongoDB** from: https://www.mongodb.com/try/download/community
2. **Extract to a folder** (e.g., `C:\mongodb`)
3. **Create data directory**: `mkdir C:\data\db`
4. **Start MongoDB**:
   ```cmd
   cd C:\mongodb\bin
   mongod --dbpath C:\data\db
   ```

## Verify MongoDB is Running

### Method 1: Command Line
```cmd
mongo
# or
mongosh
```
You should see the MongoDB shell prompt.

### Method 2: Check Port
```cmd
netstat -an | findstr 27017
```
You should see: `TCP    0.0.0.0:27017    0.0.0.0:0    LISTENING`

### Method 3: Browser Test
Open: `http://localhost:27017`
You should see: "It looks like you are trying to access MongoDB over HTTP on the native driver port."

## Troubleshooting

### Error: "MongoDB connection error"
1. **Check if MongoDB is running**:
   ```cmd
   netstat -an | findstr 27017
   ```

2. **Start MongoDB service**:
   ```cmd
   net start MongoDB
   ```

3. **If service doesn't exist, start manually**:
   ```cmd
   mongod --dbpath C:\data\db
   ```

### Error: "Port 27017 is already in use"
1. **Find what's using the port**:
   ```cmd
   netstat -ano | findstr 27017
   ```

2. **Kill the process** (replace XXXX with the PID):
   ```cmd
   taskkill /PID XXXX /F
   ```

### Error: "Module not found"
1. **Install dependencies**:
   ```cmd
   npm install
   ```

## Start Your Application

1. **Set up environment variables**:
   - Copy `env.example` to `.env`
   - The MongoDB Atlas connection string is already configured

2. **Start the server**:
   ```cmd
   # Option 1: Use the batch file
   start-server.bat
   
   # Option 2: Manual start
   npm install
   node server/server.js
   ```

3. **Access the application**: http://localhost:3000

## 🗃️ TaskFlow Database Information

- **Database**: MongoDB Atlas Cloud Database
- **Primary Collection**: `users` (for user authentication)
- **Planned Collections**: `tasks`, `categories`, `teams`
- **Connection String**: `mongodb+srv://ranamayank080:ishurana098@clustertest.hkinjhb.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTest`

### 📊 Database Schema

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String (hashed with bcrypt),
  createdAt: Date,
  profile: {
    name: String,
    avatar: String
  }
}
```

#### Tasks Collection (Future Implementation)
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  title: String (required),
  description: String,
  category: String,
  dueDate: Date,
  completed: Boolean,
  priority: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Test Registration

1. Go to: http://localhost:3000
2. Click "Get Started"
3. Click "Sign up"
4. Fill in the form with your email and password
5. Click "Register"

If successful, you should see "Account created successfully!" and be redirected to the dashboard.

## View Data in MongoDB Atlas

To see the stored user data:

1. **Access MongoDB Atlas Dashboard**:
   - Go to https://cloud.mongodb.com
   - Sign in with your credentials
   - Navigate to your cluster: `ClusterTest`
   - Click on "Browse Collections"
   - Look for the `users` collection

2. **Alternative: Use MongoDB Compass**:
   - Download MongoDB Compass
   - Connect using your Atlas connection string
   - Navigate to the `users` collection

This will show all registered users in your cloud database.
