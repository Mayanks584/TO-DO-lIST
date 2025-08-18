const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('Connection string: mongodb://localhost:27017/taskmanager');
console.log('');

mongoose.connect('mongodb://localhost:27017/taskmanager', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ SUCCESS: Connected to MongoDB!');
    console.log('✅ Database: taskmanager');
    console.log('✅ Server is ready to accept connections');
    console.log('');
    console.log('You can now start your application server.');
    process.exit(0);
})
.catch(err => {
    console.log('❌ ERROR: Failed to connect to MongoDB');
    console.log('❌ Error details:', err.message);
    console.log('');
    console.log('Troubleshooting steps:');
    console.log('1. Make sure MongoDB is installed');
    console.log('2. Make sure MongoDB is running on port 27017');
    console.log('3. Try running: net start MongoDB');
    console.log('4. Or manually start: mongod --dbpath C:\\data\\db');
    process.exit(1);
});
