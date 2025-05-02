import React from 'react';
import './VerifyCodeEmail.css'
import { useState } from 'react';
import { auth } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAutheticated, setLoading, setUser } from '../../../redux/authSlice';


const VerifyCodeEmail = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/admin");
        }
    }, [isAuthenticated, navigate]);

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
            const userName = localStorage.getItem("pendingUser");
            const response = await auth.verifyCode({ userName, code });

            console.log("Server response:", response);

            if (response.success) {
                setSuccess(true);

                dispatch(setAutheticated(true));
                dispatch(setUser({
                    isAuthenticated: true,
                    token: response.token,
                    currentUser: { userName },
                }));

                localStorage.setItem("token", response.token);
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
                <h2 className="verification-title">ENTER YOUR VERIFICATION CODE</h2>
                <p className="verification-subtitle">
                    We sent a verification code<br />to your email.
                </p>
                <input type="text" placeholder="Code" className="verification-input" value={code}
                    onChange={handleCodeChange} />
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">Code verified successfully!</p>}
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
                <a className="resend-code">Resend code</a>
            </div>
        </div>
    );
};

export default VerifyCodeEmail;