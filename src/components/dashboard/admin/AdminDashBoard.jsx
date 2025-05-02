import React from 'react'
import './AdminDashBoard.css'

const AdminDashBoard = () => {

    return (
        <div className="admin-dashboard-container">
            <h1 className="admin-dashboard-title">Admin Dashboard</h1>
            <div className="admin-dashboard-content">
                <p>Welcome to the Admin Dashboard!</p>
                <p>Here you can manage users, view reports, and perform administrative tasks.</p>
            </div>
        </div>
    )
}

export default AdminDashBoard;