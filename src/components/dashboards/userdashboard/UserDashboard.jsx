import React from 'react';
import { useSelector } from 'react-redux';

const UserDashboard = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);
    
    return (
        <h1>hola users</h1>
    );
}  

export default UserDashboard;