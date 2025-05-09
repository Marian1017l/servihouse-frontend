import React, { useEffect } from 'react';
import './HomeDashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomeDashboard = () => {

    const { loading, isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home-all");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="home-dashboard">
            <h1>Welcome to the Home Dashboard</h1>
            <p>This is the home dashboard where you can find various information and features.</p>
        </div>
    );
}

export default HomeDashboard;