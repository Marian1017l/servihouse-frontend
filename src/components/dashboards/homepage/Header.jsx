import React from "react";
import "./Header.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/authSlice"; 
import geoLogo from '../../../images/geolocalizacion.png'

const Header = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(logoutUser());
    };

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <img src={geoLogo} alt="Geolocation Logo" className="geo-logo" />
                    <h1>ServiHouse</h1>
                </div>
                <nav>
                    <ul className="nav-links">
                        {!isAuthenticated ? (
                            <>
                                <li><a href="/">Home</a></li>
                                <li><a href={"/auth/login"}>Log in</a></li>
                                <li><a href={"/auth/signup"} className="signup-btn">Sign up</a></li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <a
                                        href="#"
                                        className="logout-button"
                                        onClick={handleLogOut}
                                    >
                                        Log out
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;