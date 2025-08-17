import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "./config.js";

import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
import contactRoute from "./route/contact.route.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB successfully");
    console.log(`Database: ${config.MONGODB_URI}`);
})
.catch((error) => {
    console.log("MongoDB connection error: ", error);
    process.exit(1); // Exit if can't connect to database
});

// Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);
app.use("/contact", contactRoute);

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({ 
        message: "Server is running", 
        timestamp: new Date().toISOString(),
        environment: config.NODE_ENV,
        database: "Connected"
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.listen(config.PORT, () => {
    console.log(`Server is running on port ${config.PORT}`);
    console.log(`Environment: ${config.NODE_ENV}`);
    console.log(`MongoDB URI: ${config.MONGODB_URI}`);
});