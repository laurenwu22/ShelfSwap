import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/UserContext";
import Spinner from "../components/Spinner";
import { getBookById, deleteBook } from "../services/bookService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// BookPage Component
function BookPage() {
    const { user, loading, signIn } = useAuth();
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const bookInfo = await getBookById(id);
                setBook(bookInfo);
            } catch (error) {
                console.error(`Failed to fetch book: ${error}`);
            }
        };
        fetchBook();
    }, [id]);

    async function handleDelete() {
        try {
            if (window.confirm(`Are you sure you want to delete ${book.title}?`)) {
                await deleteBook(id);
                navigate("/");
            }
        } catch (error) {
            console.error(`Failed to fetch book: ${error}`);
        }
    }

    function handleUserClick() {
        navigate(`/user/${book.owner}`);
    }

    if (loading || !book) {
        return <Spinner />;
    }

    return (
        <div>
            <Header />
            <div className="nav-spaceer"></div>
            <div className="book-info">
                <div className="cover-container">
                    <img 
                        src={book.covers?.medium || 
                            book.covers?.small || 
                            book.covers?.thumbnail} 
                        alt={`${book.title} cover`}
                    />
                    <p style={{margin: "12px 0 0"}}><i>From Google Books:</i></p>
                    {book.industryIdentifiers && book.industryIdentifiers.length > 0 ? (
                        book.industryIdentifiers.map((identifier, index) => (
                            <p key={index}>{identifier.type}: <span className="info">{identifier.identifier}</span></p>
                        ))
                    ) : null }
                    <p>Publisher: <span className="info">{book.publisher || "Not found"}</span></p>
                    <p>Published Date: <span className="info">{book.published || "Not found"}</span></p>
                    <p>Pages: <span className="info">{book.pages || "Not found"}</span></p>
                </div>
                <div className="title-container">
                    <h2 onClick={handleUserClick}>@{book.username}</h2>
                    <h1>{book.title}</h1>
                    <h3>
                    by {book.authors.length === 1 
                        ? book.authors[0] 
                        : book.authors.slice(0, -1).join(", ") + " and " + book.authors[book.authors.length - 1]}
                    </h3>
                    {
                        !user ? (
                            <button onClick={signIn}>Sign In to Swap</button>
                        ) : user._id === book.owner ? (
                            <button onClick={handleDelete}>Remove Post</button>
                        ) : null
                    }
                    <div className="box">
                    {book.ownerNotes ? 
                        <div>
                        <h4>@{book.username}'s notes:</h4>
                        <p>{book.ownerNotes}</p>
                        <hr />
                        </div> 
                    : null}
                    <h4>Description</h4>
                    <div
                        className="description" 
                        dangerouslySetInnerHTML={{ __html: book.description }} 
                    />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookPage;