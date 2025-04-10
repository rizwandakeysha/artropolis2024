// src/pages/NotFound.js
import React from 'react';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4 font-yatra">
      <h1 className="text-5xl font-bold text-[#1c7db1]">404 - Page Not Found</h1>
      <p className="mt-4 text-green-900">Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
