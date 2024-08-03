import React, { useRef } from "react";
import Header from "../components/Header";
import downArrow from "../images/down-arrow.svg";
import BookList from "../components/BookList";
import { useAuth } from "../context/UserContext";
import Spinner from "../components/Spinner";

// Hero Component
function Hero({ onExploreClick }) {
    const { signIn } = useAuth();      

    return (
        <div className="hero-image">
            <div className="hero-content">
                <h1>
                Read new books,<br />
                meet new people.
                </h1>
                <h2>Swap your used books with other students in the Tufts community.</h2>
                <div>
                    <button onClick={signIn}>Sign In</button>
                    <button onClick={onExploreClick}>
                        <img src={downArrow} alt="down arrow" />Explore
                    </button>
                </div>
            </div>
        </div>
    );
}

// HomePage Component
function HomePage() {
    const { user, loading } = useAuth();
    const bookListRef = useRef(null);

    function handleExploreClick() {
        if (bookListRef.current) {
            bookListRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    if (loading) {
        return <Spinner />;
    }

    return (
        <div>
        <Header />
        <div className="nav-spacer"/>
        { !user && (
                <Hero onExploreClick={handleExploreClick} />
        )}
        <div ref={bookListRef}>
            <BookList />
        </div>
        </div>
    );
}

export default HomePage;