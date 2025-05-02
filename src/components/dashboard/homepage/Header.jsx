import React from "react";
import "./Header.css";
import { useSelector } from "react-redux";

const Header = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    <h1>ServiHouse</h1>
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><a href="/">Home</a></li>
                        {!isAuthenticated ? (
                            <>
                                <li><a href={"/auth/login"}>Log in</a></li>
                                <li><a href={"/auth/signup"} className="signup-btn">Sign up</a></li>
                            </>
                        ) : (
                            <>
                                <li><a className="logout-button" href={"/auth/log-out"}>Log out</a></li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;