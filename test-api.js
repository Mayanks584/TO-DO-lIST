const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
    console.log('Testing TaskFlow API endpoints...\n');

    // Test 1: Health check
    console.log('1. Testing health check...');
    try {
        const healthResponse = await fetch(`${BASE_URL}/api/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health check:', healthData);
    } catch (error) {
        console.log('❌ Health check failed:', error.message);
    }

    // Test 2: Register a test user
    console.log('\n2. Testing user registration...');
    try {
        const testEmail = `test${Date.now()}@example.com`;
        const registerResponse = await fetch(`${BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: testEmail,
                password: 'testpassword123'
            })
        });
        const registerData = await registerResponse.json();
        console.log('✅ Registration response:', registerData);
        
        if (registerData.success) {
            console.log('✅ User successfully registered in MongoDB Atlas!');
            
            // Test 3: Login with the registered user
            console.log('\n3. Testing user login...');
            const loginResponse = await fetch(`${BASE_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: testEmail,
                    password: 'testpassword123'
                })
            });
            const loginData = await loginResponse.json();
            console.log('✅ Login response:', loginData);
            
            if (loginData.success) {
                console.log('✅ User successfully logged in from MongoDB Atlas!');
            }
        }
    } catch (error) {
        console.log('❌ Registration/Login test failed:', error.message);
    }

    // Test 4: Get all users
    console.log('\n4. Testing get all users...');
    try {
        const usersResponse = await fetch(`${BASE_URL}/api/users`);
        const usersData = await usersResponse.json();
        console.log('✅ Users in database:', usersData.users ? usersData.users.length : 0, 'users');
    } catch (error) {
        console.log('❌ Get users failed:', error.message);
    }

    console.log('\n🎉 API testing completed!');
}

testAPI().catch(console.error);
