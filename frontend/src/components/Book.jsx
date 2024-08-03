import React from "react";
import { useNavigate } from "react-router-dom";


// Book Component
function Book({ id, img, title, username }) {

    const navigate = useNavigate();

    function handleBookClick() {
        navigate(`${id}`);
    }

    return (
        <div className="book">
            <img src={img} alt={title} onClick={handleBookClick}/>
            <p>@{username}</p>
        </div>
    );
}

export default Book;