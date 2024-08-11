import React from "react";
import { useNavigate } from "react-router-dom";


// Book Component
function Book({ id, img, title, username }) {

    const navigate = useNavigate();

    function handleBookClick() {
        navigate(`/book/${id}`);
    }

    return (
        <div className="book">
            <img src={img} alt={title} onClick={handleBookClick}/>
            <h2>{title}</h2>
            <p>@{username}</p>
        </div>
    );
}

export default Book;