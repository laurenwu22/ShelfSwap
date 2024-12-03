import express from "express";
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
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

// Middleware to parse user input data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
    origin: (origin, callback) => {
        // Use the single origin or check for localhost in development
        const allowedOrigin = process.env.ALLOWED_ORIGINS;
        const allowedOrigins = [
            allowedOrigin,   // From the environment variable
            'http://localhost:3000', // For local development
            'http://192.168.0.19:3000', // Another local development option
        ];

        // Allow the request if the origin is in the allowed list
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS')); // Reject the request
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


// Middleware to set up session
app.use(session({
    name: 'ShelfSwap',
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

// Create server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})