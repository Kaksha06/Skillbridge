import React from 'react';
import ConnectionTest from '../components/ConnectionTest';

const TestConnectionPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Backend Connection Test</h1>
      <ConnectionTest />
    </div>
  );
};

export default TestConnectionPage;
