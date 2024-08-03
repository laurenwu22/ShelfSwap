import React from "react";
import searchIcon from "../images/search.svg"

// Search Bar Component
function SearchBar({ onSearch, placeholder }) {

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
                placeholder={placeholder}
            />
            <input type="image" alt="search" src={searchIcon}/>
        </form>
)
}

export default SearchBar;