import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('user')
    return isAuthenticated ? children : <Navigate to="/teacher-login" />;
}

export default PrivateRoute