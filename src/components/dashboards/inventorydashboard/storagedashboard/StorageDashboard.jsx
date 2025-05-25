//curl http://localhost:3000/api/v1/inventory/storage/create

import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../../../../images/image.png';
import updateIcon from '../../../../images/actualizar (1).png';
import deleteIcon from '../../../../images/eliminar.png';
import './StorageDashboard.css';
import { inven } from '../../../../api/inventory';

const StorageDashboard = () => {
    const navigate = useNavigate();
    const userRole = localStorage.getItem("userRole") || '';
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Manager',
            selector: row => row.manager.full_name,
        },
        {
            name: 'Address',
            selector: row => row.location.address,
        },
        {
            name:'Capacity',
            selector: row => row.capacity,
        },
        {
            name:'City',
            selector: row => row.location.city,
        },
        {
            name:'Department',
            selector: row => row.location.department,
        },
        {
            name:'Actions',
            cell: row => (
                <div className='btn-actions-user'>
                    <button
                        className='btn-update-user'
                        onClick={() => handleUpdate(row)}
                    >
                        <img src={updateIcon} alt="Update" style={{ width: "25px", height: "25px" }} />
                    </button>
                    <button
                        className='btn-delete-user'
                        onClick={() => handleDelete(row)}
                    >
                        <img src={deleteIcon} alt="Delete" style={{ width: "25px", height: "25px" }}/>
                    </button>
                    <button
                        className='btn-view-user'
                        onClick={() => navigate(`view-location/${row.id}`, { 
                        state: { 
                            lat: row.location.latitude, 
                            lng: row.location.altitude, 
                            label: row.name, 
                            title: row.name ,
                            obj: row,
                        } 
                        })}
                    >
                        View
                    </button>
                </div>
            ),
        }
    ];

    // Example handler functions
    const handleUpdate = (row) => {
        // Pass row or row._id as needed
        navigate(`/superadmin/inventory/storage/update/${row._id}`, { state: { storage: row } });
    };

    const handleDelete = (row) => {
        // Implement delete logic, possibly open a confirmation dialog
        // Example: deleteStorage(row._id)
        console.log('Delete storage:', row);
    };
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
                color: '#03a791',
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
    const [allStorages, setAllStorages] = useState([]);
    
    useEffect(() => {
        const fetchStorages = async () => {
            const response = await inven.getAllStorages();    
        if (response.status === 200) {
            setRecords(response.data);
            setAllStorages(response.data);
        } else {
            setRecords([]);
            setAllStorages([]);
            }
        };
        fetchStorages();
    }, []);

    const handleFilter = (event) => {
        const newData = allStorages.filter(row => {
          return row.name.toLowerCase().includes(event.target.value.toLowerCase()) ||
          row.location.city.toLowerCase().includes(event.target.value.toLowerCase()) ||
            row.location.department.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData);
    }


    return (
        <div className="storage-dashboard-content">
            <div className="storage-dashboard-header">
                <div className="storage-dashboard-header-left">
                    <h1 className="storage-dashboard-title">Storages</h1>
                    <div className="search-box">
                        <input type="text" placeholder="Search" onChange={handleFilter} />
                        <span className="icon"><img src={SearchIcon} alt="Search" 
                            style={{ width: "20px", height: "20px" }} /></span>
                    </div>
                </div>
                <button className="storage-dashboard-create-btn" onClick={() => navigate("/superadmin/inventory")}>BACK</button>
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

export default StorageDashboard;