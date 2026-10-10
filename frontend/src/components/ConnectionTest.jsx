import { useState, useEffect } from 'react';
import { checkBackendConnection } from '../services/api';

const ConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Checking...');
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      const result = await checkBackendConnection();
      if (result.connected) {
        setConnectionStatus('✅ Connected to Backend!');
      } else {
        setConnectionStatus('❌ Connection Failed');
      }
      setDetails(result);
    };

    testConnection();
  }, []);

  return (
    <div style={{
      padding: '20px',
      margin: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      maxWidth: '600px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div className="mb-6 p-4 rounded-md border-l-4 bg-blue-50 border-blue-500">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {connectionStatus === '✅ Connected to Backend!' ? (
              <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium">{connectionStatus}</h3>
            {details?.data && (
              <p className="mt-1 text-sm text-gray-600">{details.data}</p>
            )}
          </div>
        </div>

        {details && (
          <div className="mt-4 p-3 bg-white rounded border border-gray-200 overflow-auto max-h-60">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Response Details:</h4>
            <pre className="text-xs text-gray-600">
              {JSON.stringify({
                status: details.status,
                error: details.error,
                url: details.url
              }, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-2">Troubleshooting Steps:</h3>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
          <li>
            <span className="font-medium">Check Backend Server:</span> Ensure your backend server is running on port 5000
          </li>
          <li>
            <span className="font-medium">Test Backend Directly:</span> 
            <a 
              href="http://localhost:5000/api/test" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline ml-1"
            >
              Click here to test the backend directly
            </a>
          </li>
          <li>
            <span className="font-medium">Check CORS:</span> Ensure your backend has CORS enabled for the frontend URL (http://localhost:3000)
          </li>
          <li>
            <span className="font-medium">Verify .env:</span> Check that <code className="bg-gray-200 px-1 rounded text-xs">VITE_API_BASE_URL</code> is set to <code className="bg-gray-200 px-1 rounded text-xs">/api/v1</code> in <code className="bg-gray-200 px-1 rounded text-xs">frontend/.env</code>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default ConnectionTest;
