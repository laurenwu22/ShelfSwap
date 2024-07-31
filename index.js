import express from "express";
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import session from 'express-session';
import passport from "passport";
import MongoStore from 'connect-mongo';
import User from './models/userModel.js';
import cors from 'cors';

// Get filepath to public directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '../frontend/public');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware to set up session
app.use(session({
    name: 'ShelfSwap',
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions',
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    saveUninitialized: true,
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Connect user routes
app.use('/api/users', userRoutes);

// Connect book routes
app.use('/api/books', bookRoutes);

// Process HTTP requests
app.get("/", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/home");
    } else {
        res.sendFile(publicDir + "/index.html");
    }
});

// Get Profile
app.get("/home", (req, res) => {
    if (req.isAuthenticated()) {
        res.sendFile(publicDir + "/loggedin.html");
    } else {
        res.redirect("/api/users/auth/google");
    }
})

// Create server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})