import React, { useEffect, useState } from 'react';
import './HomeDashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Entrega from '../../../images/Entrega.png';
import { business } from '../../../api/business';
import { setLoading } from '../../../redux/authSlice';
import Swal from 'sweetalert2';

const HomeDashboard = () => {

    const { loading, isAuthenticated } = useSelector((state) => state.auth);
    const [number, setNumber] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        if (
            isAuthenticated &&
            location.pathname === "/"
        ) {
            const userRole = localStorage.getItem("userRole");
            if (userRole) {
                navigate(`/${userRole.toLowerCase()}/profile`);
            }
        }
    }, [isAuthenticated, navigate, location.pathname]);

    const handleNumberChange = (e) => {
        setNumber(e.target.value);
        setError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!number) {
            Swal.fire({
                title: 'Warning',
                icon: 'warning',
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                color: '#000',
                showCloseButton: true,
                text: 'Please enter a guide number.',
                textColor: '#fff'
            });
            return;
        }
        try {
            dispatch(setLoading(true));
            const response = await business.getOrderByNumber(number);
            dispatch(setLoading(false));
            if (response.success) {
                setSuccess(true);
                navigate(`/location/following-order/${response.order.order_number}`, {
                    state: {
                        origin: {
                            lat: Number(response.order.final_address.latitude),
                            lng: Number(response.order.final_address.altitude)
                        },
                        destination: {
                            lat: Number(response.order.delivery.location.latitude),
                            lng: Number(response.order.delivery.location.altitude)
                        },
                        delivery: response.order.delivery,
                        order: response.order,
                        final_address: response.order.final_address,
                    }
                })
            } else {
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000,
                    color: '#000',
                    showCloseButton: true,
                    text: response.message || "Invalid guide number.",
                    textColor: '#fff'
                });
                return
            }
        } catch (error) {
            console.error("Error fetching tracking data:", error);
            setError("An error occurred while fetching tracking data.");
        }
    }

    return (
        <div className="home-dashboard">
            <div className="home-header">
                <h1>Welcome to the ServiHouse</h1>
            </div>
            <img src={Entrega} alt="Order progress" className="progress-image" />
            <div className="input-container">
                <input type="text" placeholder="Enter your guide number" value={number}
                    onChange={handleNumberChange} />
                <button onClick={handleSubmit}>
                    <i className="arrow">&#8594;</i>
                </button>
            </div>
        </div>
    );
}

export default HomeDashboard;