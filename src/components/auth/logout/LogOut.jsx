import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logoutUser());
        localStorage.removeItem('pendingUser');
        localStorage.removeItem('token'); 
        console.log('User logged out');
        navigate('/home');
    };

    return { handleLogOut };
}

export default LogOut;  