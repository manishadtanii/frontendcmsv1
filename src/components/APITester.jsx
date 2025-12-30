import React, { useEffect, useState } from 'react';
import { testConnection, authAPI, pageAPI } from '../services/apiService';
import { API_BASE } from '../services/apiConfig';

export default function APITester() {
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    testBackendConnection();
  }, []);

  const testBackendConnection = async () => {
    setLoading(true);
    try {
      console.log('🚀 Frontend Starting - Testing Backend Connection...');
      await testConnection();
      setConnectionStatus('✅ Backend Connected Successfully!');
      console.log('✅ SUCCESS: Frontend and Backend are connected!');
    } catch (error) {
      setConnectionStatus('❌ Failed to connect to backend');
      console.error('❌ ERROR: Could not connect to backend:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetPages = async () => {
    try {
      console.log('📋 Fetching pages from backend...');
      const result = await pageAPI.getAllPages();
      console.log('📋 Pages fetched:', result);
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const handleGetProfile = async () => {
    try {
      console.log('👤 Fetching user profile...');
      const result = await authAPI.getProfile();
      console.log('👤 Profile fetched:', result);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      border: '2px solid #007bff',
      borderRadius: '8px',
      backgroundColor: '#f8f9fa',
    }}>
      <h2>🔧 API Connection Tester</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
          Status: {connectionStatus || (loading ? 'Testing...' : 'Not tested')}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={testBackendConnection}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Testing...' : '🔗 Test Connection'}
        </button>

        <button
          onClick={handleGetPages}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          📄 Fetch Pages
        </button>

        <button
          onClick={handleGetProfile}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6f42c1',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          👤 Get Profile
        </button>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#e9ecef',
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '12px',
      }}>
        <p>📍 Backend URL: <strong>{API_BASE}/api</strong></p>
        <p>✅ Check Console (F12) for detailed API logs</p>
      </div>
    </div>
  );
}
