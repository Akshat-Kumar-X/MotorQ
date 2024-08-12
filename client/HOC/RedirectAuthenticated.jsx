import React from 'react'
import { Navigate } from 'react-router-dom';

const RedirectAuthenticated = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('user')
    return isAuthenticated ? <Navigate to="/" /> : children;
}

export default RedirectAuthenticated