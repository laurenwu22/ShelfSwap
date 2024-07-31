import React from "react";
import logo from "../logo.svg";

function Header() {
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
}

export default Header;