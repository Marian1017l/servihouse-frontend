import React from 'react';
import './ResetPassword.css';


const ResetPassword = () => {

    return (
        <div className="reset-password-container">
            <div className="reset-password-box">
                <h2 className="reset-password-title">RESET YOUR PASSWORD</h2>
                <p className="reset-password-subtitle">
                    Set up you new password
                </p>
                <input type="text" placeholder="New Password" className="reset-password-input" />
                <input type="text" placeholder="Confirm Password" className="reset-password-input" />
                <button className="reset-password-button">CONTINUE</button>
            </div>
        </div>
    );
}

export default ResetPassword;