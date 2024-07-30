import express from 'express'; 
import Book from "../models/bookModel.js"
import axios from "axios";
import User from '../models/userModel.js';

// Initialize router
const router = express.Router();

// Route to find books matching user input
router.post("/search", async (req, res) => {
    try {
        const book_query = req.body.book;
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${book_query}`
        );
        const result = response.data;
        res.json(result);
    } catch(error) {
        console.error("Failed to make request:", error.message);
    }
})

router.get("/user", async (req, res) => {
    console.log(req.user);
})

// Route to add book to user's listings
router.post("/list", async (req, res) => {
    if (req.isAuthenticated()) {
        // Add book to db
        const { id: book_id, notes } = req.body;
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${book_id}`
        );
        const info = response.data.volumeInfo;
        const book = new Book({
            title: info.title,
            authors: info.authors,
            publisher: info.publisher,
            published: info.publishedDate,
            pages: info.pageCount,
            description: info.description,
            covers: info.imageLinks,
            categories: info.categories,
            ownerNotes: notes || "",
            owner: req.user.id,
            status: "Available",
        });
        await book.save();

        // Update user's listings
        const user = await User.findById(req.user.id);
        user.booksOwned.push(book.id);
        await user.save();

        // Redirect back to homepage
        res.status(201).redirect('/');
    } else {
        res.redirect("/api/users/auth/google");
    }
})

// Route to delete a book
router.delete("/", async (req, res) => {
    try {
        // Get relevant book and user data
        const book_id = req.body.id;
        const book = await Book.findById(book_id);
        const user = await User.findById(book.owner);

        // Update user's books and delete book frob db
        user.booksOwned.remove(book.id);
        await user.save();

        Book.deleteOne(book);
        await book.save();

    } catch(error) {
        console.error("Failed to make request:", error.message);
    }
})

// Route to get all books
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch(error) {
        console.error("Failed to make request:", error.message);
    }
})

// Route to find books matching user input

// Route to swap books

// Route to 

export default router;