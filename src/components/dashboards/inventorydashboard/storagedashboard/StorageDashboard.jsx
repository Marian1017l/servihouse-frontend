import React from "react";
import './StorageDashboard.css';

const storages = [
    {
        id: 1,
        name: "Storage 1",
        address: "123 Main St",
        createdAt: "2024-05-01",
        updatedAt: "2024-05-10",
        manager: "John Doe",
        capacity: 1000,
    },
    {
        id: 2,
        name: "Storage 2",
        address: "456 Second Ave",
        createdAt: "2024-05-03",
        updatedAt: "2024-05-11",
        manager: "Jane Smith",
        capacity: 500,
    },
];
const StorageDashboard = () => {
    return (
        <div className="storages-dashboard-content">
            <div className="storages-dashboard-header">
                <h1 className="storages-dashboard-title">Storage</h1>
                <button className="storages-dashboard-create-btn">CREATE</button>
            </div>
            <div className="storages-dashboard-table-container">
                <table className="storages-dashboard-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Created at</th>
                            <th>Update at</th>
                            <th>Manager</th>
                            <th>Capacity</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {storages.map(storage => (
                            <tr key={storage.id}>
                                <td>{storage.id}</td>
                                <td>{storage.name}</td>
                                <td>{storage.address}</td>
                                <td>{storage.createdAt}</td>
                                <td>{storage.updatedAt}</td>
                                <td>{storage.manager}</td>
                                <td>{storage.capacity}</td>
                                <td>
                                    <div className="btn-actions-storage">
                                        <button className="btn-update-storage">{/* icono editar */}</button>
                                        <button className="btn-delete-storage">{/* icono eliminar */}</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="storages-dashboard-pagination">
                    <button>{/* icono anterior */}</button>
                    <span>1/1</span>
                    <button>{/* icono siguiente */}</button>
                </div>
            </div>
        </div>
    );
}

export default StorageDashboard;
