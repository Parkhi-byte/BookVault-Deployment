import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config.js';
import axios from 'axios';

function DebugInfo() {
  const [debugInfo, setDebugInfo] = useState({});
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Collect debug information
    setDebugInfo({
      apiBaseUrl: API_BASE_URL,
      environment: import.meta.env.VITE_NODE_ENV || import.meta.env.MODE,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      config: {
        VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
        VITE_NODE_ENV: import.meta.env.VITE_NODE_ENV,
        MODE: import.meta.env.MODE
      }
    });
  }, []);

  const runTests = async () => {
    setLoading(true);
    const results = {};

    try {
      // Test 1: Health endpoint
      try {
        const healthResponse = await axios.get(`${API_BASE_URL}/health`);
        results.health = { success: true, data: healthResponse.data };
      } catch (error) {
        results.health = { success: false, error: error.message };
      }

      // Test 2: Signup endpoint
      try {
        const testUser = {
          fullname: 'Debug Test User',
          email: `debug${Date.now()}@example.com`,
          password: 'debugpass123'
        };
        const signupResponse = await axios.post(`${API_BASE_URL}/user/signup`, testUser);
        results.signup = { success: true, data: signupResponse.data };
      } catch (error) {
        results.signup = { success: false, error: error.message };
      }

      // Test 3: Login endpoint
      try {
        const loginResponse = await axios.post(`${API_BASE_URL}/user/login`, {
          email: 'debug@example.com',
          password: 'debugpass123'
        });
        results.login = { success: true, data: loginResponse.data };
      } catch (error) {
        results.login = { success: false, error: error.message };
      }

      // Test 4: Books endpoint
      try {
        const booksResponse = await axios.get(`${API_BASE_URL}/book`);
        results.books = { success: true, data: booksResponse.data };
      } catch (error) {
        results.books = { success: false, error: error.message };
      }

    } catch (error) {
      console.error('Test error:', error);
    }

    setTestResults(results);
    setLoading(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Debug Information</h1>
        
        {/* Debug Info */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Configuration</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>

        {/* Test Button */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <button
            onClick={runTests}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Running Tests...' : 'Run API Tests'}
          </button>
        </div>

        {/* Test Results */}
        {Object.keys(testResults).length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Test Results</h2>
            {Object.entries(testResults).map(([testName, result]) => (
              <div key={testName} className="mb-4 p-4 border rounded">
                <h3 className="font-semibold capitalize mb-2">{testName}</h3>
                {result.success ? (
                  <div className="text-green-600">
                    ✅ Success: {JSON.stringify(result.data, null, 2)}
                  </div>
                ) : (
                  <div className="text-red-600">
                    ❌ Failed: {result.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DebugInfo;
