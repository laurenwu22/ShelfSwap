import React from "react";
import { useNavigate } from "react-router-dom";


// Book Component
function Book({ id, img, title, owner, username }) {

    const navigate = useNavigate();

    function handleBookClick() {
        navigate(`/book/${id}`);
    }

    function handleUserClick() {
        navigate(`/user/${owner}`);
    }

    return (
        <div className="book">
            <img src={img} alt={title} onClick={handleBookClick}/>
            <h2>{title}</h2>
            <p onClick={handleUserClick}>@{username}</p>
        </div>
    );
}

export default Book;