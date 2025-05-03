import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../redux/authSlice';

const LogOut = () => {
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(logoutUser());
        localStorage.removeItem('pendingUser');
        localStorage.removeItem('token'); 
        console.log('User logged out');
    };

    return { handleLogOut };
}

export default LogOut;  