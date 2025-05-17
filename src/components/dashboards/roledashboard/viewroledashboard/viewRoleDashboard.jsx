import React, { useEffect, useState } from 'react';
import './ViewRoleDashboard.css';
import { Auth } from '../../../../api/auth';
import { useNavigate } from 'react-router-dom';

const ViewRoleDashboard = () => {
    const [roles, setRoles] = useState([]);
    const auth = new Auth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const res = await auth.getAllRoles();
            if (res.success) {
                setRoles(res.data);
            }
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    };

    const handleEdit = (roleId) => {
        alert(`Editar rol con id: ${roleId}`);
    };

    const handleDelete = (roleId) => {
        alert(`Eliminar rol con id: ${roleId}`);
    };

    return (
        <div className="roles-dashboard-content">
            <div className="roles-dashboard-header">
                <h1 className="roles-dashboard-title">Roles</h1>
                <button className="roles-dashboard-create-btn"
                onClick={() => navigate('/superadmin/createRole')}>CREATE</button>
            </div>
            <table className="roles-dashboard-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Permisos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(role => (
                        <tr key={role.id}>
                            <td>{role.name}</td>
                            <td>{role.description}</td>
                            <td>
                                {role.permissions && role.permissions.length > 0
                                    ? role.permissions.join(", ")
                                    : <span style={{ color: "#888" }}>Sin permisos</span>
                                }
                            </td>
                            <td>
                                <button onClick={() => handleEdit(role.id)} className="icon-btn" style={{ marginRight: "8px" }}>Editar</button>
                                <button onClick={() => handleDelete(role.id)} className="icon-btn">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewRoleDashboard;