import React, { useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../context/UserContext";
import { postBook } from "../services/bookService";
import Spinner from "../components/Spinner";
import PostSearch from "../components/PostSearch";
import checkMark from "../images/checkmark.svg";
import { NavLink } from 'react-router-dom';

// HomePage Component
function PostPage() {
    const { user, loading } = useAuth();
    const [id, setId] = useState();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publisher, setPublisher] = useState("");
    const [published, setPublished] = useState("");
    const [isbn, setISBN] = useState("");
    const [pages, setPages] = useState("");
    const [posted, setPosted] = useState(false);

    async function handleSubmit(event) {
        if (!id) {
            window.alert("Please select a book before posting")
            return;
        }

        event.preventDefault();
        const form_info = event.target.elements;
        const info = {
            id: form_info.id.value,
            notes: form_info.notes.value
        };
    
        try {
            await postBook(info);
            setPosted(true);
        } catch (error) {
            console.error('Error posting book:', error);
        }
    }

    async function handleSelect( selected ) {
        setId(selected.id);
        setTitle(selected.volumeInfo?.title || 'not found');
        setAuthor(selected.volumeInfo?.authors?.[0] || 'not found');
        setPublisher(selected.volumeInfo?.publisher || 'not found');
        setPublished(selected.volumeInfo?.publishedDate || 'not found');
        setISBN(selected.volumeInfo?.industryIdentifiers?.[0]?.identifier || 'not found');
        setPages(selected.volumeInfo?.pageCount || 'not found');
    }

    if (loading) {
        return <Spinner />;
    }

    if (posted) {
        return (
            <div>
                <Header />
                <div className="nav-spacer" />
                    <div className="posted">
                        <div className="line">
                            <img src={checkMark} alt="checkmark icon"/>
                            <h2>"{title}" was successfully posted</h2>
                    </div>
                    <div className="line">
                        <NavLink to="/"><button>Return to Browse</button></NavLink>
                        <button onClick={() => window.location.reload()}>Post New Book</button>
                    </div>
                </div>
            </div>
        )
    }
    
    if (!user) {
        window.location.replace("/");;
    } else {
        return (
            <div>
                <Header />
                <div className="nav-spacer"/>
                    <div className="post-form">
                        <h1 className="page-title">Post a Book</h1>
                        <h2>Select your book</h2>
                        <PostSearch 
                            placeholder={"Search by Title, Author, Publisher, Keywords, or ISBN"}
                            onSelect={handleSelect}
                        />
                        { id ? (
                            <div>
                                <h4>Title: {title}</h4>
                                <h4>Author: {author}</h4>
                                <h4>ISBN: {isbn}</h4>
                                <h4>Publisher: {publisher}</h4>
                                <h4>Published: {published}</h4>
                                <h4>Page Count: {pages}</h4>
                            </div>
                        ) : null }
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="notes">What did you think?</label>
                            <textarea 
                                className="notes" 
                                type="textarea" 
                                id="notes" 
                                name="notes" 
                                rows="6"
                                placeholder="Add a review"
                            />
                            <input type="hidden" id="id" name="id" value={id} required />
                            <input type="submit" value="Post" />
                        </form>
                    </div>
            </div>
        );
    }
}

export default PostPage;