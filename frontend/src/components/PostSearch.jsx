import React, { useState } from "react";
import searchIcon from "../images/search.svg";
import { searchGoogleBooks } from "../services/bookService";

function BookOption({ bookInfo, onSelect }) {
    if (bookInfo.volumeInfo?.imageLinks?.thumbnail) {
        return (
            <div key={bookInfo.id} onClick={() => onSelect(bookInfo)}>
                <img 
                    src={bookInfo.volumeInfo.imageLinks.thumbnail} 
                    alt={bookInfo.volumeInfo.title} 
                />
            </div>
        );
    }
}

// Search Bar Component for Post Form
function PostSearch({ placeholder, onSelect }) {
    const [book, setBook] = useState("");
    const [books, setBooks] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
    }

    async function handleChange(event) {
        setBook(event.target.value);
        const query = {
            book: event.target.value
        };
        try {
            const data = await searchGoogleBooks(query);
            setBooks(data.items);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="search-bar">
                <input
                    type="text"
                    name="query"
                    placeholder={placeholder}
                    onChange={handleChange}
                />
                <input type="image" alt="search" src={searchIcon} />
            </form>
            { book ? (
                <h3>Results for "{book}"</h3>
            ) : null }
            <div className="book-options">
                {books && books.map((bookInfo) => (
                    <BookOption
                        bookInfo={bookInfo} 
                        onSelect={onSelect}
                    />
                ))}
            </div> 
        </div>
    );
}

export default PostSearch;
