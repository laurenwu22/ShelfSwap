import React from "react";
import Header from "../components/Header";
import downArrow from "../images/down-arrow.svg";

function HomePage() {
    return (
        <div>
            <Header />
            <div class="hero-image">
                <div class="hero-content">
                    <h1>
                        Read new books,<br />
                        meet new people.
                    </h1>
                    <h2>Swap your used books with other students in the Tufts community.</h2>
                    <div>
                        <span className="button">Sign In</span>
                        <span className="button"><img src={downArrow} alt="down arrow" style={{stroke: "red"}}/>Explore</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;