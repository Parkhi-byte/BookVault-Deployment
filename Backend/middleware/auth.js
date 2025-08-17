import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.userId = decoded.userId;
        req.userEmail = decoded.email;
        req.userRole = decoded.role;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token." });
    }
};

export const verifyAdmin = async (req, res, next) => {
    try {
        // First verify the token
        await verifyToken(req, res, () => {});
        
        // Check if user is admin
        if (req.userRole !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required." });
        }
        
        next();
    } catch (error) {
        return res.status(401).json({ message: "Authentication failed." });
    }
};
