import React, { useState, useEffect } from "react";
import { getBookByQuery, getBooks } from "../services/bookService";
import SearchBar from "./SearchBar";
import Book from "./Book";

// BookList Component
function BookList() {
  const [books, setBooks] = useState([]);

  // Load all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getBooks();
        setBooks(books);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  async function searchBooks(query) {
    try {
        const books = await getBookByQuery(query);
        setBooks(books);
    } catch (error) {
        console.error("Error updating books:", error);
    }
  }

  return (
    <div className="book-list">
      <h1 className="page-title">Explore Books</h1>
      <SearchBar 
        onSearch={searchBooks}
        placeholder="Search by Title, Author, Genre, or Username"
      />
      <div className="books-container">
      {books && books.length > 0 && books.map((book) => {
            const img = book.covers?.small || book.covers?.thumbnail;
            console.log('img:', img);
            return (
                <Book
                    key={book._id}
                    id={book._id}
                    img={img}
                    title={book.title}
                    username={book.username}
                />
            );
        })}
      </div>
    </div>
  );
}

export default BookList;
