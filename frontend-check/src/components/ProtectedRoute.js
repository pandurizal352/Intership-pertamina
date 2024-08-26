// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// Define the parseJwt function before using it
const parseJwt = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to parse JWT", e);
    return null;
  }
};

const ProtectedRoute = ({ component: Component, allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  const userRole = parseJwt(token)?.role;

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default ProtectedRoute;
