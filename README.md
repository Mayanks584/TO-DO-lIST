# Task Manager with MongoDB

A modern task management application built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- User registration and authentication
- Task creation, editing, and deletion
- Task categorization and filtering
- Responsive design
- MongoDB database integration
- Secure password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mayanks584/TO--DO-APP.git
   cd TO--DO-APP
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

## Project Structure

```
TO--DO-APP/
├── server/
│   └── server.js          # Express server with MongoDB integration
├── home.html              # Landing page
├── login.html             # Login page
├── register.html          # Registration page
├── dashboard.html         # Task management dashboard
├── script.js              # Frontend JavaScript
├── style.css              # Styles
├── package.json           # Dependencies
├── .env                   # Environment variables (not in git)
├── .env.example           # Example environment variables
└── .gitignore            # Git ignore rules
```

## API Endpoints

- `POST /api/register` - User registration
- `POST /api/login` - User authentication
- `GET /` - Serve home page
- `GET /dashboard.html` - Serve dashboard

## Database Schema

### User Collection
```javascript
{
  email: String (required, unique),
  password: String (hashed, required),
  createdAt: Date
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue on GitHub or contact the development team. 