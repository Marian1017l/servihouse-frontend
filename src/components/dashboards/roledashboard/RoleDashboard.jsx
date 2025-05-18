import React, { useState, useEffect } from 'react';
import './RoleDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Auth } from '../../../api/auth';

const PERMISSIONS = [
    // User
    { key: "createUser", label: "Create user", group: "User" },
    { key: "readUser", label: "Read user", group: "User" },
    { key: "updateUser", label: "Update user", group: "User" },
    { key: "deleteUser", label: "Delete user", group: "User" },
    // Role
    { key: "createRol", label: "Create role", group: "Role" },
    { key: "getAllRols", label: "Read role", group: "Role" },
    { key: "updateRol", label: "Update role", group: "Role" },
    { key: "deleteRol", label: "Delete role", group: "Role" },
    // Inventory
    { key: "createProduct", label: "Create inventory", group: "Inventory" },
    { key: "getAllProducts", label: "Read inventory", group: "Inventory" },
    { key: "updateProduct", label: "Update inventory", group: "Inventory" },
    { key: "deleteProduct", label: "Delete inventory", group: "Inventory" },
    { key: "getProductById", label: "Get product by ID", group: "Product" },
    // Report
    { key: "createReport", label: "Create report", group: "Report" },
    { key: "getAllReports", label: "Read report", group: "Report" },
    { key: "updateReport", label: "Update report", group: "Report" },
    { key: "deleteReport", label: "Delete report", group: "Report" },
    { key: "getReportById", label: "Get report by ID", group: "Report" },
    // Storage
    { key: "createStorage", label: "Create storage", group: "Storage" },
    { key: "getAllStorages", label: "Read storage", group: "Storage" },
    { key: "updateStorage", label: "Update storage", group: "Storage" },
    { key: "deleteStorage", label: "Delete storage", group: "Storage" },
    { key: "getStorageById", label: "Get storage by ID", group: "Storage" },
    // Orders
    { key: "createOrder", label: "Create orders", group: "Orders" },
    { key: "getAllOrders", label: "Read orders", group: "Orders" },
    { key: "updateOrder", label: "Update orders", group: "Orders" },
    { key: "deleteOrder", label: "Delete orders", group: "Orders" },
    { key: "getOrderById", label: "Get orders by ID", group: "Orders" },
    { key: "getAllOrdersByUserId", label: "Get orders by user ID", group: "Orders" },
    // File
    { key: "uploadFile", label: "Upload file", group: "File" },
];

const GROUPS = ["User", "Role", "Inventory", "Report", "Storage", "Orders", "File"];

const RolesDashboard = () => {
    const [roleName, setRoleName] = useState('');
    const [roleDesc, setRoleDesc] = useState('');
    const [checkedPermissions, setCheckedPermissions] = useState({});

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = new Auth();

    const handleCheckboxChange = (key) => {
        setCheckedPermissions(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleCreate = async () => {
        const selectedPermissions = Object.keys(checkedPermissions).filter(key => checkedPermissions[key]);
        const data = {
            name: roleName,
            description: roleDesc,
            permissions: selectedPermissions,
        };
        console.log(data);
        try {
            const response = await auth.createRole(data);
            console.log(response);

            if (response.success) {
                setRoleName('');
                setRoleDesc('');
                setCheckedPermissions({});
            }

        } catch (error) {
            console.error("Error creating role:", error);
        }
    };

    return (
        <div className="role-dashboard-container">
            <div className="role-dashboard-header">
                <span className="role-dashboard-title">Create new Role:</span>
                <div className='buttons-container'>
                    <button className="role-dashboard-view-btn"
                        onClick={() => navigate('/superadmin/roles/viewroles')}>VIEW</button>
                    <button className="role-dashboard-create-btn" onClick={handleCreate}>CREATE</button>
                </div>
            </div>
            <div className="role-dashboard-form">
                <label>Name:</label>
                <input
                    className="role-dashboard-input"
                    type="text"
                    value={roleName}
                    onChange={e => setRoleName(e.target.value)}
                />
                <label>Description:</label>
                <textarea
                    className="role-dashboard-textarea"
                    rows={3}
                    value={roleDesc}
                    onChange={e => setRoleDesc(e.target.value)}
                />
                <div className="role-dashboard-permissions">
                    <span>Permissions:</span>
                    <div className="role-dashboard-permissions-grid">
                        {GROUPS.map(group => (
                            <div key={group}>
                                <b>{group}:</b>
                                {PERMISSIONS.filter(p => p.group === group).map(perm => (
                                    <div key={perm.key}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={!!checkedPermissions[perm.key]}
                                                onChange={() => handleCheckboxChange(perm.key)}
                                            />
                                            {perm.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RolesDashboard;