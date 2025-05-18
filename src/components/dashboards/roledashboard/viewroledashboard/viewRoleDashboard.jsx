import React, { useEffect, useState } from 'react';
import './ViewRoleDashboard.css';
import { Auth } from '../../../../api/auth';
import { useNavigate } from 'react-router-dom';
import updateIcon from '../../../../images/actualizar (1).png';
import deleteIcon from '../../../../images/eliminar.png';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const ViewRoleDashboard = () => {
    const [roles, setRoles] = useState([]);
    const auth = new Auth();
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

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
        const role = roles.find(r => r.id === roleId);
        if (!role) return;

        MySwal.fire({
            title: 'Edit Role',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Name" value="${role.name}">` +
                `<input id="swal-input2" class="swal2-input" placeholder="Description" value="${role.description}">` +
                `<textarea id="swal-input3" class="swal2-textarea" placeholder="Permissions (comma separated)">${role.permissions.join(', ')}</textarea>`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return {
                    name: document.getElementById('swal-input1').value,
                    description: document.getElementById('swal-input2').value,
                    permissions: document.getElementById('swal-input3').value.split(',').map(p => p.trim()).filter(Boolean)
                }
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Aquí llamas a tu función para actualizar el rol en el backend
                try {
                    //await auth.updateRole(roleId, result.value);
                    Swal.fire('Updated!', 'Role updated successfully.', 'success');
                    fetchRoles(); 
                } catch (error) {
                    Swal.fire('Error', 'Could not update role.', 'error');
                }
            }
        });
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
                                <div className='btn-actions-role'>
                                    <button onClick={() => handleEdit(role.id)} className="btn-update-role"
                                        style={{ marginRight: "8px" }}><img src={updateIcon} alt="Update" style={{ width: "25px", height: "25px" }} /></button>
                                    <button onClick={() => handleDelete(role.id)} className="btn-delete-role">
                                        <img src={deleteIcon} alt="Delete" style={{ width: "25px", height: "25px" }} /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewRoleDashboard;