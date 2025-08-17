import axios from 'axios';

const API_BASE_URL = 'https://bookvault-deployment.onrender.com';

async function testBackend() {
  console.log('Testing backend connectivity...');
  
  try {
    // Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test signup endpoint
    console.log('\n2. Testing signup endpoint...');
    const testUser = {
      fullname: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'testpass123'
    };
    
    const signupResponse = await axios.post(`${API_BASE_URL}/user/signup`, testUser);
    console.log('✅ Signup test passed:', signupResponse.data);
    
    // Test login endpoint
    console.log('\n3. Testing login endpoint...');
    const loginResponse = await axios.post(`${API_BASE_URL}/user/login`, {
      email: testUser.email,
      password: testUser.password
    });
    console.log('✅ Login test passed:', loginResponse.data);
    
    // Test books endpoint
    console.log('\n4. Testing books endpoint...');
    const booksResponse = await axios.get(`${API_BASE_URL}/book`);
    console.log('✅ Books endpoint working:', booksResponse.data);
    
    console.log('\n🎉 All tests passed! Backend is working correctly.');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testBackend();
