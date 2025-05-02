import React from 'react';
import './VerifyCodeEmail.css'
import { useState } from 'react';
import { auth } from '../../../api/auth';



const VerifyCodeEmail = () => {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

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

            const result = await response.json();
            console.log(result);


            if (response.ok) {
                setSuccess(true);
            } else {
                setError(result.message || 'Invalid verification code.');
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
                <button onClick={handleSubmit} className="verification-button">CONTINUE</button>
                <a className="resend-code">Resend code</a>
            </div>
        </div>
    );
};

export default VerifyCodeEmail;