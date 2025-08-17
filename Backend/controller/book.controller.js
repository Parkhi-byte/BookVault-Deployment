import Book from "../model/book.model.js";

export const getBook = async(req, res) => {
    try {
        const book = await Book.find().populate('uploadedBy', 'fullname email');
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const getBookById = async(req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id).populate('uploadedBy', 'fullname email');
        
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Create new book (admin only)
export const createBook = async(req, res) => {
    try {
        const { name, price, category, image, title, intro, author, pages, genre, isFree } = req.body;
        
        const newBook = new Book({
            name,
            price: isFree ? 0 : price,
            category,
            image,
            title,
            intro,
            author,
            pages,
            genre,
            isFree,
            uploadedBy: req.userId
        });
        
        await newBook.save();
        
        res.status(201).json({
            message: "Book created successfully",
            book: newBook
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update book (admin only - only the admin who uploaded it)
export const updateBook = async(req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        
        // Find the book and check if the current user is the one who uploaded it
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        if (book.uploadedBy.toString() !== req.userId) {
            return res.status(403).json({ message: "You can only update books you uploaded" });
        }
        
        // Update the book
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { ...updateData, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );
        
        res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete book (admin only - only the admin who uploaded it)
export const deleteBook = async(req, res) => {
    try {
        const { id } = req.params;
        
        // Find the book and check if the current user is the one who uploaded it
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        
        if (book.uploadedBy.toString() !== req.userId) {
            return res.status(403).json({ message: "You can only delete books you uploaded" });
        }
        
        await Book.findByIdAndDelete(id);
        
        res.status(200).json({
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get books by category
export const getBooksByCategory = async(req, res) => {
    try {
        const { category } = req.params;
        const books = await Book.find({ category }).populate('uploadedBy', 'fullname email');
        res.status(200).json(books);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get free books only
export const getFreeBooks = async(req, res) => {
    try {
        const books = await Book.find({ isFree: true }).populate('uploadedBy', 'fullname email');
        res.status(200).json(books);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get paid books only
export const getPaidBooks = async(req, res) => {
    try {
        const books = await Book.find({ isFree: false }).populate('uploadedBy', 'fullname email');
        res.status(200).json(books);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};