import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import User from "./model/user.model.js";
import { config } from "./config.js";

// Connect to MongoDB
mongoose.connect(config.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Create admin user
const createAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log("Admin user already exists:", existingAdmin.email);
      process.exit(0);
    }

    // Create admin user
    const adminData = {
      fullname: "Admin User",
      email: "admin@bookvault.com",
      password: "admin123",
      role: "admin"
    };

    // Hash password
    const hashPassword = await bcryptjs.hash(adminData.password, 10);

    // Create new admin
    const admin = new User({
      fullname: adminData.fullname,
      email: adminData.email,
      password: hashPassword,
      role: adminData.role
    });

    await admin.save();
    console.log("Admin user created successfully!");
    console.log("Email:", adminData.email);
    console.log("Password:", adminData.password);
    console.log("Role:", adminData.role);
    
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error);
    process.exit(1);
  }
};

// Run the script
createAdmin();
