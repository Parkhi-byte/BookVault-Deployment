import mongoose from "mongoose";
import { config } from "./config.js";

console.log("=== BookVault Setup Test ===");
console.log("Config values:");
console.log("PORT:", config.PORT);
console.log("MONGODB_URI:", config.MONGODB_URI);
console.log("JWT_SECRET:", config.JWT_SECRET ? "Set" : "Not set");
console.log("NODE_ENV:", config.NODE_ENV);

// Test MongoDB connection
console.log("\nTesting MongoDB connection...");
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB connection successful");
    console.log("Database name:", mongoose.connection.db.databaseName);
    
    // List collections
    return mongoose.connection.db.listCollections().toArray();
  })
  .then(collections => {
    console.log("Collections in database:");
    collections.forEach(col => console.log(`  - ${col.name}`));
    
    // Close connection
    mongoose.connection.close();
    console.log("\n✅ Setup test completed successfully");
    process.exit(0);
  })
  .catch(err => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
