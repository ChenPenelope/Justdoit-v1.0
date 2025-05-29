import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = ({ error, onRetry }) => {
  const navigate = useNavigate();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">發生錯誤</h2>
        <p className="text-gray-600 mb-6">
          {error?.message || '抱歉，發生了一些問題。請稍後再試。'}
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleRetry}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            重試
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error; 