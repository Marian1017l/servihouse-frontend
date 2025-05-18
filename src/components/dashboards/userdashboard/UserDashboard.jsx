import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { auth } from '../../../api/auth';
import './UserDashboard.css';
import SearchIcon from '../../../images/image.png';
import updateIcon from '../../../images/actualizar (1).png';
import deleteIcon from '../../../images/eliminar.png';

const UserDashboard = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const columns = [
        {
            name: 'User Name',
            selector: row => row.user_name,
        },
        {
            name: 'Full Name',
            selector: row => row.full_name,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name:'Phone',
            selector: row => row.phone,
        },
        {
            name:'Status',
            selector: row => row.status,
        },
        {
            name:'Role',
            selector: row => row.rol,
        },
        {
            name:'City',
            selector: row => row.city
,
        },
        {
            name:'Department',
            selector: row => row.department,
        },
        {
            name:'Actions',
            cell: row => (
                <div className='btn-actions-user'>
                    <button className='btn-update-user'><img src={updateIcon} alt="Update" 
                        style={{ width: "25px", height: "25px" }} /></button>
                    <button className='btn-delete-user'><img src={deleteIcon} alt="Delete" 
                        style={{ width: "25px", height: "25px" }}/></button>
                </div>
            ),
        }
    ];

    const customStyles = {
        header: {
            style: {
                background: '#F6F6F6',
                padding: '12px 8px',
                fontWeight: '600',
                textAlign: 'left'
            },
        },
        headRow: {
            style: {
                background: '#F6F6F6',
                padding: '12px 8px',
                fontWeight: '600',
                textAlign: 'left'
            },
        },
        headCells: {
            style: {
                color: '#202124',
            },
        },
        rows: {
            style: {
                backgroundColor: '#E8E7E7',
                padding: '12px 8px',
                minHeight: '48px',
                '&:not(:last-of-type)': {
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '1px',
                    borderBottomColor: '#e0e0e0',
                },
            },
        },
        pagination: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: '#e0e0e0',
                padding: '10px',
            },
        },
    };

     const [records, setRecords] = useState([]);
     const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {

            const response = await auth.getAllUsers();
            
            if (response.status === 200) {
                
                setRecords(response.data);
                setAllUsers(response.data);
            } else {
                setRecords([]);
                setAllUsers([]);
            }
        };
        fetchUsers();
    }, []);

    const handleFilter = (event) => {
        const newData = allUsers.filter(row => {
          return row.user_name.toLowerCase().includes(event.target.value.toLowerCase())  || 
            row.rol.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData);
}
    
    
    return (
        <div className="user-dashboard-content">
            <div className="user-dashboard-header">
                <div className="user-dashboard-header-left">
                    <h1 className="user-dashboard-title">Users</h1>
                    <div class="search-box">
                        <input type="text" placeholder="Search" onChange={handleFilter}/>
                        <span className="icon"><img src={SearchIcon} alt="Search" 
                            style={{ width: "20px", height: "20px" }} /></span>
                    </div>
                </div>
                <button className="user-dashboard-create-btn"
                    onClick={() => navigate('/superadmin/users/create')}>CREATE</button>
            </div>
            <DataTable
                columns={columns}
                data={records}
                pagination
                customStyles={customStyles}
            />
    
        </div>
    );
}  

export default UserDashboard;