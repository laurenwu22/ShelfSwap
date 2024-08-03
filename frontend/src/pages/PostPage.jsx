import React from "react";
import Header from "../components/Header";
import { useAuth } from "../context/UserContext";
import { postBook } from "../services/bookService";
import Spinner from "../components/Spinner";

// HomePage Component
function PostPage() {
    const { user, loading } = useAuth();

    function handleSubmit( event ) {
        event.preventDefault();
        const form_info = event.target.elements
        const info = {
            id: form_info.id.value,
            notes: form_info.notes.value
        };
        postBook(info);
    }

    if (loading) {
        return <Spinner />;
    }
    
    if (!user) {
        window.location.replace("/");;
    } else {
        return (
            <div>
                <Header />
                <div className="nav-spacer"/>
                <br /><br /><br /><br />
                <form onSubmit={handleSubmit}>
                    <label htmlFor="id">Enter book id:</label>
                    <input type="text" id="id" name="id" />
                    <label htmlFor="notes">Notes:</label>
                    <input type="text" id="notes" name="notes" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default PostPage;