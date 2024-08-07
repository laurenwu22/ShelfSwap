import express from 'express'; 
import Book from "../models/bookModel.js"
import axios from "axios";
import User from '../models/userModel.js';
import bodyParser from "body-parser";

// Initialize router
const router = express.Router();

// Middleware to parse user request bodies
router.use(bodyParser.urlencoded({ extended: true }));
router.use(express.json());

// Route to find books matching user input
router.post("/search", async (req, res) => {
    try {
        const book_query = req.body.book;
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${book_query}&printType=books`
        );
        const result = response.data;
        res.json(result);
    } catch(error) {
        console.error("Failed to make request:", error.message);
    }
})

// Route to add book to user's listings
router.post("/list", async (req, res) => {
    if (req.isAuthenticated()) {
        // Add book to db
        const { id: book_id, notes } = req.body;
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${book_id}`
        );
        const user = await User.findById(req.user.id);
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
            industryIdentifiers: info.industryIdentifiers,
            ownerNotes: notes || "",
            owner: user._id,
            username: user.username,
            status: "Available",
        });
        await book.save();

        // Update user's listings
        user.booksOwned.push(book.id);
        await user.save();
        
        // Send response to the client
        res.status(200).json({ message: "Book added successfully", book });

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
        const books = await Book.find().sort({ _id: -1 });
        res.json(books);
    } catch(error) {
        console.error("Failed to make request:", error.message);
    }
}) 

// Route to find books matching user input
router.get("/search/:q", async (req, res) => {
    try {
        const query = req.params.q;
        const regex = new RegExp(query, 'i');
        const books = await Book.find({
            $or: [
                { title: { $regex: regex } },
                { authors: { $regex: regex } },
                { categories: { $regex: regex } },
                { username: { $regex: regex } },
                // { industryIdentifiers.identifier: { $regex: regex }},
            ]
        }).sort({ _id: -1 })
        console.log(books);
        res.json(books);
    } catch(error) {
        console.error("Failed to make request:", error.message);
        res.status(500).send("An error occurred while searching for books");
    }
}) 

// Route to swap books


// Route to get one book from database
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const book = await Book.findById(book_id);
        console.log(book);
        res.json(book);
    } catch(error) {
        console.error("Failed to make request:", error.message);
        res.status(500).send("An error occurred while searching");
    }
}) 

// Route to get one book from Google Books API
router.get("/find/:id", async (req, res) => {
    try {
        const book_id = req.body.id;
        const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${book_id}`
        );
        const result = response.data;
        res.json(result);
    } catch(error) {
        console.error("Failed to make request:", error.message);
    }
})

export default router;