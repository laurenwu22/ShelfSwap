import React, { useState } from "react";
import logo from "../logo.svg";
import { useAuth } from "../context/UserContext";
import { NavLink, useNavigate } from 'react-router-dom';

// function profileHover() {

// }

function Header() {

    const { user, signIn, signOut } = useAuth(); 
    const [isOpen, setIsOpen] = useState(false);  
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
    };

    async function handleSignOut() {
        await signOut();
        navigate("/");
        window.location.reload();
    }

    if (!user) {
        return (
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">
                                <img src={logo} className="logo" alt="logo" />
                                <h1>ShelfSwap</h1>
                            </NavLink>
                        </li>
                        <li className="spacer"></li>
                        <li><button onClick={signIn}>Sign In</button></li>
                    </ul>
                </nav>
            </header>
        );
    } else {
        return (
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/">
                                <img src={logo} className="logo" alt="logo" />
                                <h1>ShelfSwap</h1>
                            </NavLink>
                        </li>
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
                        <li>
                            <div 
                                className="dropdown"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <button className="dropbtn"><div className="profile-icon"/>{user.fname}</button>
                                <div className={`dropdown-content ${isOpen ? 'show' : ''}`}>
                                    <a href={`/user/${user._id}`}>View Profile</a>
                                    <p onClick={handleSignOut}>Sign Out</p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;