# 🗄️ TaskFlow MongoDB Atlas Setup Guide

Complete guide to set up MongoDB Atlas for your TaskFlow application.

## 🚀 Quick Start (MongoDB Atlas - Recommended)

### Step 1: Create MongoDB Atlas Account
1. **Go to** [MongoDB Atlas](https://cloud.mongodb.com)
2. **Sign up** for a free account
3. **Create a new cluster** (Free tier recommended)

### Step 2: Configure Database Access
1. **Go to Database Access** in the left sidebar
2. **Add New Database User**:
   - Username: `taskflow_user`
   - Password: Create a strong password
   - Role: `Read and write to any database`

### Step 3: Configure Network Access
1. **Go to Network Access** in the left sidebar
2. **Add IP Address**:
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development)
   - Or add your specific IP address

### Step 4: Get Connection String
1. **Go to Clusters** → Click "Connect"
2. **Choose "Connect your application"**
3. **Copy the connection string**
4. **Replace `<password>` with your database user password**

## ✅ Verify MongoDB Atlas Connection

### Method 1: Test Connection Script
```bash
node test-mongodb-atlas.js
```
You should see: `✅ SUCCESS: Connected to MongoDB Atlas!`

### Method 2: Check Environment Variables
```bash
# Make sure your .env file contains:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=3000
NODE_ENV=development
```

### Method 3: Test API Endpoints
```bash
node test-api.js
```
This will test registration, login, and verify data is stored in MongoDB Atlas.

## 🔧 Troubleshooting

### Error: "MongoDB connection error"
1. **Check your connection string**:
   - Verify your `.env` file has the correct `MONGODB_URI`
   - Make sure you replaced `<password>` with your actual password

2. **Check network access**:
   - Go to MongoDB Atlas → Network Access
   - Make sure your IP is whitelisted or use "Allow Access from Anywhere"

3. **Verify database user**:
   - Go to MongoDB Atlas → Database Access
   - Make sure your user has the correct permissions

### Error: "Authentication failed"
1. **Check username and password**:
   - Verify the username and password in your connection string
   - Make sure there are no special characters that need URL encoding

2. **Reset database password**:
   - Go to MongoDB Atlas → Database Access
   - Edit your user and set a new password

### Error: "Module not found"
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Install dotenv for environment variables**:
   ```bash
   npm install dotenv
   ```

## 🚀 Start Your Application

1. **Set up environment variables**:
   ```bash
   cp env.example .env
   # Edit .env with your MongoDB Atlas connection string
   ```

2. **Test the connection**:
   ```bash
   node test-mongodb-atlas.js
   ```

3. **Start the server**:
   ```bash
   # Option 1: Use the batch file
   start-server.bat
   
   # Option 2: Manual start
   node server.js
   ```

4. **Access the application**: http://localhost:3000

5. **Test the API**:
   ```bash
   node test-api.js
   ```

## 🗃️ TaskFlow Database Information

- **Database**: MongoDB Atlas Cloud Database
- **Collection**: `users` (for user authentication)
- **Connection**: Automatic with offline fallback to local storage
- **Sync**: Real-time synchronization when online
- **Security**: Password hashing with bcrypt, secure connection strings
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
