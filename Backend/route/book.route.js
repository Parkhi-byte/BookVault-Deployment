import express from "express";
import { 
    getBook, 
    getBookById, 
    createBook, 
    updateBook, 
    deleteBook,
    getBooksByCategory,
    getFreeBooks,
    getPaidBooks,
    searchBooks
} from "../controller/book.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public routes (accessible to all users)
router.get("/", getBook);
router.get("/free", getFreeBooks);
router.get("/paid", getPaidBooks);
router.get("/search", searchBooks);
router.get("/category/:category", getBooksByCategory);
router.get("/:id", getBookById);

// Admin routes (protected)
router.post("/", verifyAdmin, createBook);
router.put("/:id", verifyAdmin, updateBook);
router.delete("/:id", verifyAdmin, deleteBook);

export default router;