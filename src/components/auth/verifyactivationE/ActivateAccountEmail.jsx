import React, { useState, useEffect } from 'react';
import './ActivateAccountEmail.css'
import { auth } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const ActivateAccountEmail = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.auth);


    const handleCodeChange = (e) => {
        setCode(e.target.value);
        setError('');
    };


    const handleSubmit = async (e) => {
        setError('');
        setSuccess(false);

        if (!/^\d{6,}$/.test(code)) {
            setError('The code must contain at least 6 digits.');
            return;
        }

        try {
            const user_name = localStorage.getItem("pendingUser");

            if (!user_name) {
                setError("User information is missing. Please log in again.");
                return;
            }

            console.log("username:", user_name);
            const response = await auth.verifyActivationCode({ user_name, code });

            console.log("Server response:", response);

            if (response.success) {
                setSuccess(true);

                localStorage.removeItem("pendingUser");
                navigate("/home");

            } else {
                setError(response.message || "Invalid verification code.");
            }


        } catch (error) {
            console.error("Error verifying code:", error);
            setError('An error occurred while verifying the code. Please try again.');
        }

    }


    return (
        <div className="verification-container">
            <div className="verification-box">
                <h2 className="verification-title">ENTER YOUR ACTIVATION CODE</h2>
                <p className="verification-subtitle">
                    We sent a verification code<br />to your email.
                </p>
                <input type="text" placeholder="Code" className="verification-input" value={code}
                    onChange={handleCodeChange} />

                <button
                    onClick={handleSubmit}
                    className="verification-button"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="loading-text">
                            <span className="loading-spinner"></span>
                            Verifying...
                        </span>
                    ) : (
                        "CONTINUE"
                    )}
                </button>
                <a
                    className="resend-code"

                >
                    Resend code
                </a>
            </div>
        </div>
    );
}

export default ActivateAccountEmail;