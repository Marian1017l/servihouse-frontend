import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import DataTable from 'react-data-table-component';
import SearchIcon from '../../../images/image.png';
import updateIcon from '../../../images/actualizar (1).png';
import reportIcon from '../../../images/report.png';
import viewIcon from '../../../images/view.png';
import { business } from '../../../api/business';
import { Drawer } from 'antd';
import { report } from '../../../api/report';
import './DeliveryDashboard.css'
import Swal from 'sweetalert2';
const defaultCenter = {
    lat: 4.6097,
    lng: -74.0817,
};
const API_KEY =
    import.meta.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
    import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const DeliveryDashboard = () => {
    const columns = [
        {
            name: 'Full Name',
            selector: row => row.full_name,
        },
        {
            name: 'Email',
            selector: row => row.email,
        },
        {
            name: 'Pending Orders',
            selector: row => row.pending_orders,
        },
        {
            name: 'City',
            selector: row => row.location.city
        },
        {
            name: 'Department',
            selector: row => row.location.department
        },
        {
            name: 'Last Logged',
            selector: row => {
                const date = new Date(row.location.updatedAt);
                return date.toLocaleString(); // Ejemplo: "29/5/2024, 2:23:45 p. m."
            }
        },
        {
            name: 'Actions',
            cell: row => (
                <div className='btn-actions-delivery'>
                    <button className='btn-update-delivery'>
                        <img src={updateIcon} alt="Update" style={{ width: "25px", height: "25px" }} />
                    </button>
                    <button className='btn-view-delivery-green' onClick={() => showMapDrawer(row)}>
                        <img src={viewIcon} alt="View" style={{ width: "25px", height: "25px" }} />
                    </button>
                    <button
                        className='btn-report-delivery'
                        onClick={async () => {
                            const result = await Swal.fire({
                                title: 'You are about to generate a report of orders delivered today by this delivery person.',
                                text: 'In which format would you like it?',
                                icon: 'info',
                                showCancelButton: true,
                                confirmButtonText: 'PDF',
                                cancelButtonText: 'Excel',
                                showDenyButton: true,
                                denyButtonText: 'Cancel',
                                reverseButtons: true,
                                customClass: {
                                    confirmButton: 'swal2-confirm-green',
                                    cancelButton: 'swal2-cancel-blue'
                                }
                            });

                            let response;
                            setLoading(true);
                            if (result.isConfirmed) {
                                // PDF
                                response = await report.getOrdersDeliveredByDelivery(row.id, 'pdf');
                            } else if (result.dismiss === Swal.DismissReason.cancel) {
                                // Excel
                                response = await report.getOrdersDeliveredByDelivery(row.id, 'excel');
                            } else {
                                setLoading(false);
                                return; // Cancelled
                            }
                            setLoading(false);

                            if (response.success) {
                                Swal.fire({
                                    title: 'Report Generated',
                                    text: `The report has been generated successfully.`,
                                    icon: 'success',
                                    confirmButtonText: 'OK',
                                    customClass: {
                                        confirmButton: 'swal2-confirm-green'
                                    }
                                });
                            } else {
                                Swal.fire({
                                    title: 'Error',
                                    text: response.message || 'Failed to generate report',
                                    icon: 'error',
                                    confirmButtonText: 'OK',
                                    customClass: {
                                        confirmButton: 'swal2-confirm-red'
                                    }
                                });
                            }
                        }}
                        title="Generate report"
                    >
                        <img src={reportIcon} alt="Report" style={{ width: "25px", height: "25px" }} />
                    </button>
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

    const [loading, setLoading] = useState(false);
    const [records, setRecords] = useState([]);
    const [allDeliveries, setAllDeliveries] = useState([]);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [deliverySelected, setdeliverySelected] = useState(null);
    const [location, setLocation] = useState(null);
    const [center, setCenter] = useState(defaultCenter)
    const zoom = 15;
    const onLoad = map => {
        console.log('Mapa cargado');
    };
    const markers = (location && !isNaN(location.lat) && !isNaN(location.lng)) ? [{
        id: 1,
        position: { lat: Number(location.lat), lng: Number(location.lng) },
        title: location.title,
        label: location.label,
    }] : [];
    const children = null;


    useEffect(() => {
        const fetchDelivery = async () => {

            setLoading(true);
            const response = await business.getAllDelivery();
            setLoading(false);

            if (response.status === 200) {
                setRecords(response.data);
                setAllDeliveries(response.data);
            } else {
                setRecords([]);
                setAllDeliveries([]);
            }
        };
        fetchDelivery();
    }, []);

    const handleFilter = (event) => {
        const newData = allDeliveries.filter(row => {
            return row.location.city.toLowerCase().includes(event.target.value.toLowerCase()) ||
                row.location.department.toLowerCase().includes(event.target.value.toLowerCase())
        })
        setRecords(newData);
    }

    const showMapDrawer = (delivery) => {
        const newLocation = {
            lat: delivery.location.latitude,
            lng: delivery.location.altitude,
            label: delivery.full_name,
            title: delivery.full_name,
            obj: delivery
        }
        setdeliverySelected(delivery);
        setLocation(newLocation)
        const actualcenter = newLocation.lat && newLocation.lng ?
            { lat: Number(newLocation.lat), lng: Number(newLocation.lng) }
            : defaultCenter;
        setCenter(actualcenter)
        // Limpiar selección anterior
        setDrawerVisible(true);
    };
    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: API_KEY,
        libraries: ["places"],
    });

    if (loading) {
        return (
            <div className="orders-loading-overlay">
                <div className="orders-spinner">
                    <div className="orders-spinner-circle"></div>
                    <div className="orders-spinner-text">Loading</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="delivery-dashboard-content">
                <div className="delivery-dashboard-header">
                    <div className="delivery-dashboard-header-left">
                        <h1 className="delivery-dashboard-title">Deliveries</h1>
                        <div className="search-box">
                            <input type="text" placeholder="Search" onChange={handleFilter} />
                            <span className="icon"><img src={SearchIcon} alt="Search"
                                style={{ width: "20px", height: "20px" }} /></span>
                        </div>
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={records}
                    pagination
                    customStyles={customStyles}
                />
            </div>
            <Drawer
                title={`Last location of ${deliverySelected ? deliverySelected.full_name : ''}`}
                width={650}
                placement="right"
                onClose={() => {
                    setDrawerVisible(false);
                }}
                open={drawerVisible}
            >
                {!isLoaded ? (
                    <div>Cargando mapa...</div>
                ) : loadError ? (
                    <div>Error al cargar el mapa</div>
                ) : (
                    <div className="location-delivery-dashboard-flex">
                        <div className="map-delivery-container">
                            <GoogleMap
                                mapContainerClassName="map-delivery"
                                center={center}
                                zoom={zoom}
                                onLoad={onLoad}
                            >
                                {markers.map(marker => (
                                    <Marker
                                        key={marker.id}
                                        position={marker.position}
                                        title={marker.title}
                                        label={marker.label}
                                    />
                                ))}
                                {children}
                            </GoogleMap>
                        </div>
                    </div>
                )}
            </Drawer>
        </div>
    );
}

export default DeliveryDashboard