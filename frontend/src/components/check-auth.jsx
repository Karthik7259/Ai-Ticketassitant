import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckAuth = ({ children, protected: isProtected }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        
        if (token && user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            if (isProtected && !isAuthenticated) {
                navigate('/signup'); // Changed from '/login' to '/signup'
            } else if (!isProtected && isAuthenticated) {
                navigate('/tickets'); // Changed from '/' to '/tickets'
            }
        }
    }, [loading, isAuthenticated, isProtected, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="loading loading-spinner loading-lg"></div>
            </div>
        );
    }

    // For protected routes, only render if authenticated
    if (isProtected && !isAuthenticated) {
        return null;
    }

    // For non-protected routes, only render if not authenticated
    if (!isProtected && isAuthenticated) {
        return null;
    }

    return children;
};

export default CheckAuth;
