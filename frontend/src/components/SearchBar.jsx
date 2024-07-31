import React from "react";
import searchIcon from "../images/search.svg"

// Search Bar Component
function SearchBar({ onSearch }) {

    function handleSubmit(event) {
        event.preventDefault();
        const query = event.target.elements.query.value;
        onSearch(query);
    }

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input
                type="text"
                name="query"
                placeholder="Search by Tile, Author, Genre, or ISBN"
            />
            <input type="image" alt="search" src={searchIcon}/>
        </form>
)
}

export default SearchBar;