import { ObjectId } from 'bson';
import mongoose from 'mongoose';

// Define the Book Schema
const bookSchema = new mongoose.Schema(
    {   
        title: String,
        authors: [String],
        publisher: String,
        published: String,
        isbn: String,
        pages: Number,
        description: String,
        covers: {
            smallThumbnail: String,
            thumbnail: String,
            small: String,
            medium: String,
            large: String,
            extraLarge: String,
        },
        categories: [String],
        ownerNotes: String,
        owner: ObjectId,
        status: String,
    }
);

// Create the Book model using the schema
const Book = mongoose.model('Book', bookSchema);

export default Book;