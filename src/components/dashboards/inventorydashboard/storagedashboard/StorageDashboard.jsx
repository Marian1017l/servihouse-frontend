import React, { useState, useEffect } from "react";
import './StorageDashboard.css';
import updateIcon from '../../../../images/actualizar (1).png';
import deleteIcon from '../../../../images/eliminar.png';
import { Inventory } from "../../../../api/inventory";
import Swal from 'sweetalert2';

const ITEMS_PER_PAGE = 10;

const StorageDashboard = () => {
    const [storages, setStorages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const inven = new Inventory();

    useEffect(() => {
        fetchStorages();
    }, []);

    const totalPages = Math.ceil(storages.length / ITEMS_PER_PAGE);

    const paginatedStorages = storages.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const fetchStorages = async () => {
        const token = localStorage.getItem("token");
        const response = await inven.getAllStorages(token);
        console.log("response", response);
        if (response?.success && response.data) {
            setStorages(response.data);
        } else {
            setStorages([]);
        }
    }

    const handleCreate = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Create Storage',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Name">` +
                `<input id="swal-input2" class="swal2-input" placeholder="Admin ID">` +
                `<input id="swal-input3" class="swal2-input" placeholder="Location ID">`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value,
                    document.getElementById('swal-input3').value
                ]
            }
        });

        if (formValues) {
            const [name, admin_id, location_id] = formValues;
            const token = localStorage.getItem("token");
            try {
                const response = await inven.createStorage(token, { name, admin_id, location_id });
                if (response.success) {
                    Swal.fire('Created!', 'Storage created successfully.', 'success');
                    fetchStorages(); // Refresca la tabla
                } else {
                    Swal.fire('Error', response.message || 'Error creating storage', 'error');
                }
            } catch (error) {
                Swal.fire('Error', error.message, 'error');
            }
        }
    };

    console.log("paginatedStorages", paginatedStorages);

    return (
        <div className="storages-dashboard-content">
            <div className="storages-dashboard-header">
                <h1 className="storages-dashboard-title">Storage</h1>
                <button className="storages-dashboard-create-btn" onClick={handleCreate}>CREATE</button>
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
                        {paginatedStorages.length === 0 ? (
                            <tr>
                                <td colSpan={8} style={{ textAlign: "center" }}>No data available</td>
                            </tr>
                        ) : (
                            paginatedStorages.map(storage => (
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
                                            <button className="btn-update-storage">
                                                <img src={updateIcon} alt="Update" style={{ width: 20, height: 20 }} />
                                            </button>
                                            <button className="btn-delete-storage">
                                                <img src={deleteIcon} alt="Delete" style={{ width: 20, height: 20 }} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="storages-dashboard-pagination">
                    <button onClick={handlePrev} disabled={currentPage === 1}>{"<"}</button>
                    <span>{currentPage}/{totalPages}</span>
                    <button onClick={handleNext} disabled={currentPage === totalPages || totalPages === 0}>{">"}</button>
                </div>
            </div>
        </div>
    );
};

export default StorageDashboard;
