import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0,
        min: 0
    },
    category: String,
    image: String,
    title: {
        type: String,
        required: true
    },
    intro: String,
    author: String,
    pages: Number,
    genre: String,
    isFree: {
        type: Boolean,
        default: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
bookSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Book = mongoose.model("Book", bookSchema);
export default Book;