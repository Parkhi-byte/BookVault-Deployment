import express from "express";
import { signup, login, getUserProfile, createAdmin, getAllUsers } from "../controller/user.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", verifyToken, getUserProfile);

// Admin routes
router.post("/admin/create", verifyAdmin, createAdmin);
router.get("/admin/users", verifyAdmin, getAllUsers);

export default router;