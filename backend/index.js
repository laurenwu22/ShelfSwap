import express from "express";
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import userRoutes from './routes/userRoutes.js';
import session from 'express-session';
import passport from "passport";

// Get filepath to public directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../frontend/public');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse user input data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

// Middleware to set up session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // lookup using express-session with mongodb
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect user routes
app.use('/api/users', userRoutes);

// Process HTTP requests
app.get("/", (req, res) => {
    res.sendFile(publicDir + "/index.html");
});

// Get Profile
app.get("/profile", (req, res) => {
    if (req.isAuthenticated()) {
        res.send("hi");
    } else {
        res.send("bye");
        // res.redirect("/login");
    }
})

// Explore Books in Database

// Sign In/Sign Up a User

// View A Book

// Request a Swap

// Post a Book

// Delete a Book

// 

app.post("/submit", (req, res) => {
    res.send('Welcome ' + req.body["username"]);
} )

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});

// Create server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})