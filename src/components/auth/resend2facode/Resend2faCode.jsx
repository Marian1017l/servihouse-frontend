import React from 'react';
import Swal from 'sweetalert2';
import { auth } from '../../../api/auth';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Resend2faCode = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleResendCode = async () => {
        Swal.fire({
            title: "Choose how to receive the code",
            icon: "question",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Email",
            denyButtonText: "SMS",
            cancelButtonText: "Cancel"
        }).then(async (result) => {
            if (result.isConfirmed || result.isDenied) {
                const email_notification = result.isConfirmed; // true = email, false = SMS

                const user_name = localStorage.getItem('pendingUser');

                try {
                    dispatch(setLoading(false));
                    const response = await auth.resend2faCode({ user_name, email_notification });

                    console.log("Server response:", response);

                    if (response.success) {
                        Swal.fire({
                            title: "Code Sent!",
                            text: `The verification code has been sent via ${email_notification ? 'Email' : 'SMS'}.`,
                            icon: "success",
                        });

                        if (email_notification) {
                            navigate("/auth/verify-code-email");
                        } else {
                            navigate("/auth/verify-code-phone");
                        }
                    }
                } catch (error) {
                    console.error("Error resending 2FA code:", error);
                    Swal.fire({
                        title: "Error",
                        text: "An error occurred while resending the code. Please try again.",
                        icon: "error",
                    });
                    dispatch(setLoading(false));
                }
            }
        });
    };

    return { handleResendCode };

}

export default Resend2faCode;