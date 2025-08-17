const axios = require('axios');

const BASE_URL = 'http://localhost:4000';

async function testBackend() {
    console.log('🧪 Testing BookVault Backend...\n');

    try {
        // Test health endpoint
        console.log('1. Testing health endpoint...');
        const healthResponse = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Health check passed:', healthResponse.data.message);
        console.log('   Environment:', healthResponse.data.environment);
        console.log('   Database:', healthResponse.data.database);
        console.log('   Timestamp:', healthResponse.data.timestamp);
        console.log('');

        // Test user signup
        console.log('2. Testing user signup...');
        const signupData = {
            fullname: 'Test User',
            email: 'testuser@example.com',
            password: 'testpass123'
        };
        
        try {
            const signupResponse = await axios.post(`${BASE_URL}/user/signup`, signupData);
            console.log('✅ Signup successful:', signupResponse.data.message);
            console.log('   User ID:', signupResponse.data.user._id);
            console.log('   Token received:', signupResponse.data.token ? 'Yes' : 'No');
            console.log('');
            
            // Test login with the created user
            console.log('3. Testing user login...');
            const loginData = {
                email: 'testuser@example.com',
                password: 'testpass123'
            };
            
            const loginResponse = await axios.post(`${BASE_URL}/user/login`, loginData);
            console.log('✅ Login successful:', loginResponse.data.message);
            console.log('   User:', loginResponse.data.user.fullname);
            console.log('   Token received:', loginResponse.data.token ? 'Yes' : 'No');
            console.log('');
            
            // Test getting books
            console.log('4. Testing books endpoint...');
            const booksResponse = await axios.get(`${BASE_URL}/book`);
            console.log('✅ Books retrieved successfully');
            console.log('   Total books:', booksResponse.data.length);
            console.log('   Free books:', booksResponse.data.filter(book => book.category === 'Free').length);
            console.log('   Paid books:', booksResponse.data.filter(book => book.category === 'Paid').length);
            console.log('');
            
            console.log('🎉 All tests passed! Backend is working correctly.');
            
        } catch (signupError) {
            if (signupError.response && signupError.response.status === 400 && signupError.response.data.message === 'User already exists') {
                console.log('ℹ️  Test user already exists, testing login instead...');
                
                // Test login with existing user
                const loginData = {
                    email: 'testuser@example.com',
                    password: 'testpass123'
                };
                
                try {
                    const loginResponse = await axios.post(`${BASE_URL}/user/login`, loginData);
                    console.log('✅ Login successful:', loginResponse.data.message);
                    console.log('   User:', loginResponse.data.user.fullname);
                    console.log('   Token received:', loginResponse.data.token ? 'Yes' : 'No');
                    console.log('');
                    
                    // Test getting books
                    console.log('4. Testing books endpoint...');
                    const booksResponse = await axios.get(`${BASE_URL}/book`);
                    console.log('✅ Books retrieved successfully');
                    console.log('   Total books:', booksResponse.data.length);
                    console.log('   Free books:', booksResponse.data.filter(book => book.category === 'Free').length);
                    console.log('   Paid books:', booksResponse.data.filter(book => book.category === 'Paid').length);
                    console.log('');
                    
                    console.log('🎉 All tests passed! Backend is working correctly.');
                    
                } catch (loginError) {
                    console.log('❌ Login failed:', loginError.response?.data?.message || loginError.message);
                }
            } else {
                console.log('❌ Signup failed:', signupError.response?.data?.message || signupError.message);
            }
        }

    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.log('❌ Connection refused. Make sure the backend server is running on port 4000.');
            console.log('   Run: cd Backend && npm start');
        } else {
            console.log('❌ Test failed:', error.message);
        }
    }
}

// Run the test
testBackend();
