import { ObjectId } from 'bson';
import mongoose from 'mongoose';

// Define the User Schema
const userSchema = new mongoose.Schema(
    {   
        googleId: { type: String, unique: true, },
        fname: { type: String, required: true, },
        lname: { type: String, required: true, },
        email: { type: String, required: true, unique: true },
        booksOwned: [ObjectId],
        booksSwapped: [ObjectId]
    }
);

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

export default User;