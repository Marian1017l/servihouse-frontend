import React, { useEffect, useState } from 'react';
import './HomeDashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Entrega from '../../../images/Entrega.png';
import { business } from '../../../api/business';
import Swal from 'sweetalert2';

const HomeDashboard = () => {

    const { loading, isAuthenticated } = useSelector((state) => state.auth);
    const [number, setNumber] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            const userRole = localStorage.getItem("userRole");
            if (userRole) {
                navigate(`/${userRole.toLowerCase()}/profile`);
            }
        }
    }, [isAuthenticated, navigate]);

    const handleNumberChange = (e) => {
        setNumber(e.target.value);
        setError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!/^\d{6,}$/.test(number)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The guide number must contain at least 6 digits.',
            });
            return;
        }
        try {
            const response = await business.getOrderByNumber(number);
            console.log(response);
            const data = response.data;
            if (response.success) {
                setSuccess(true);
                // navigate(`order`, 
                //     { state: { order: data.order } }
                // );
            } else {
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'The guide number no exists.',
            });
                setError(response.message || "Invalid guide number.");
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
                        onChange={handleNumberChange}/>
                <button onClick={handleSubmit}>
                <i className="arrow">&#8594;</i>
                </button>
            </div>
        </div>
    );
}

export default HomeDashboard;