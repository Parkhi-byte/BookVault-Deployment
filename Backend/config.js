import dotenv from "dotenv";

dotenv.config();

export const config = {
    PORT: process.env.PORT || 4000,
    MONGODB_URI: process.env.MongoDBURI || process.env.MONGODB_URI || "mongodb://localhost:27017/bookVault",
    JWT_SECRET: process.env.JWT_SECRET || "your-super-secret-jwt-key-here-change-in-production",
    NODE_ENV: process.env.NODE_ENV || "development"
};

// Log configuration (without sensitive data)
console.log("Configuration loaded:");
console.log(`- Port: ${config.PORT}`);
console.log(`- Environment: ${config.NODE_ENV}`);
console.log(`- Database: ${config.MONGODB_URI.replace(/\/\/.*@/, '//***:***@')}`);
