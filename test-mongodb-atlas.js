const mongoose = require('mongoose');
require('dotenv').config();

console.log('Testing MongoDB Atlas connection...');
console.log('Environment variables loaded:', !!process.env.MONGODB_URI);
console.log('Connection string:', process.env.MONGODB_URI ? 'Set (hidden for security)' : 'Not set');
console.log('');

if (!process.env.MONGODB_URI) {
    console.log('❌ ERROR: MONGODB_URI not found in environment variables');
    console.log('Make sure your .env file contains: MONGODB_URI=your_connection_string');
    process.exit(1);
}

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
        console.log('✅ Database:', mongoose.connection.db.databaseName);
        console.log('✅ Server is ready to accept connections');
        console.log('');
        console.log('You can now start your application server.');
        process.exit(0);
    })
    .catch(err => {
        console.log('❌ ERROR: Failed to connect to MongoDB Atlas');
        console.log('❌ Error details:', err.message);
        console.log('');
        console.log('Troubleshooting steps:');
        console.log('1. Check your MongoDB Atlas connection string');
        console.log('2. Make sure your IP address is whitelisted in Atlas');
        console.log('3. Verify your username and password are correct');
        console.log('4. Check if your cluster is running');
        process.exit(1);
    });
