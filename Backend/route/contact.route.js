import express from "express";
import { createContact, getAllContacts, getContactById, deleteContact } from "../controller/contact.controller.js";

const router = express.Router();

// Create a new contact message
router.post("/", createContact);

// Get all contact messages
router.get("/", getAllContacts);

// Get a specific contact message by ID
router.get("/:id", getContactById);

// Delete a contact message
router.delete("/:id", deleteContact);

export default router;
