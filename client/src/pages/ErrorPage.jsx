// src/pages/ErrorPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = ({ message = "Page Not Found", statusCode = 404 }) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-purple-200 text-gray-700 px-4 animate-fadeIn">
      
      {/* Status Code */}
      <h1 className="text-[120px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-bounceSlow">
        {statusCode}
      </h1>

      {/* Message */}
      <p className="text-2xl mb-6 text-center font-medium animate-fadeInSlow">
        {message}
      </p>

      {/* Go to Home Button */}
      <Link 
        to="/" 
        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full hover:scale-110 transform transition-all duration-300 shadow-lg"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
