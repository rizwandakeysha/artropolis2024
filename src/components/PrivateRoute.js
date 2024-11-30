// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAdmin') === 'true';
    return isAuthenticated ? children : < Navigate to = "/admin-login"
    replace / > ;
};

export default PrivateRoute;