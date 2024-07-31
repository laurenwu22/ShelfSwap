import React, { useState, useEffect } from "react";
import { getBookById, getBooks } from "../services/bookService";
import SearchBar from "./SearchBar";

// Book Component
function Book({ id, img, title }) {
  return (
    <div className="book" id={id}>
      <img src={img} alt={title} />
    </div>
  );
}

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
        const books = await getBookById(query);
        setBooks(books);
    } catch (error) {
        console.error("Error updating books:", error);
    }
  }

  return (
    <div className="book-list">
      <h1>Explore Books</h1>
      <SearchBar onSearch={searchBooks}/>
      <div className="books-container">
      {books.map((book) => (
        <Book
          key={book.id}
          id={book.id}
          img={book.covers.thumbnail}
          title={book.title}
        />
      ))}
      </div>
    </div>
  );
}

export default BookList;
