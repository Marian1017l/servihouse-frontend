import React from 'react';
import './VerifyCodePhone.css'

const VerifyCodePhone = () => {
    return (
        <div className="verification-container">
            <div className="verification-box">
                <h2 className="verification-title">ENTER YOUR VERIFICATION CODE</h2>
                <p className="verification-subtitle">
                    We sent a verification code<br />to your phone.
                </p>
                <input type="text" placeholder="Code" className="verification-input" />
                <button className="verification-button">CONTINUE</button>
                <a className="resend-code">Resend code</a>
            </div>
        </div>
    );
}

export default VerifyCodePhone;