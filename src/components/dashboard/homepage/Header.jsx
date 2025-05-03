import React from "react";
import "./Header.css";
import { useSelector } from "react-redux";
import LogOut from "../../auth/logout/LogOut";

const Header = () => {

    const { isAuthenticated } = useSelector((state) => state.auth);
    const { handleLogOut } = LogOut();

    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
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
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleLogOut();
                                        }}
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