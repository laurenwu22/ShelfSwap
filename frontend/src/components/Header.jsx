import React from "react";
import logo from "../logo.svg";
import { useAuth } from "../context/UserContext";
import { NavLink } from 'react-router-dom';

function Header() {

    const { user } = useAuth();   

    if (!user) {
        return (
            <header>
                <nav>
                    <ul>
                        <li><img src={logo} className="logo" alt="logo" /></li>
                        <li><h1>ShelfSwap</h1></li>
                        <li className="spacer"></li>
                        <li><button>Sign In</button></li>
                    </ul>
                </nav>
            </header>
        );
    } else {
        return (
            <header>
                <nav>
                    <ul>
                        <li><img src={logo} className="logo" alt="logo" /></li>
                        <li><h1>ShelfSwap</h1></li>
                        <li className="spacer"></li>
                        <li>
                            <NavLink to="/">Browse</NavLink>
                        </li>
                        <li>
                            <NavLink to="/post">Post</NavLink>
                        </li>
                        <li>
                            <NavLink to="/swap">Swap</NavLink>
                        </li>
                        <li><button className="profile-but">
                            <div className="profile-icon"/>{user.fname}
                        </button></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;