import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ProfileDashboard.css';
import { auth } from "../../../api/auth";


const ProfileDashboard = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);
    const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user_id = auth.getUserIdFromToken(token);
            fetchUserData(user_id);

        }
        setChecking(false);
    }, [isAuthenticated]);

    const fetchUserData = async (userId) => {
        try {
            const data = await auth.getUserById(userId); // Llama al método getUserById
            const user = data.data;

            setUserData({
                name: user.user_name,
                email: user.email,
                phone: user.phone,
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar">
                    <span className="avatar-initial">
                        {userData.name ? userData.name.charAt(0).toUpperCase() : ''}
                    </span>
                </div>
                <div className="profile-info">
                    <label>Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={userData.name || ''}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                    />
                </div>
            </div>
            <div className="profile-details">
                <div className="profile-field">
                    <label>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={userData.email || ''}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />

                </div>
                <div className="profile-field">
                    <label>Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        value={userData.phone || ''}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    />

                </div>
            </div>
            <button className="edit-button">EDIT</button>
        </div>
    );
}

export default ProfileDashboard;