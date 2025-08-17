import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Contact from "./components/Contact";
import About from "./components/About";
import BookDetail from "./components/BookDetail";
import AdminDashboard from "./components/AdminDashboard";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const { authUser, isAuthenticated, isAdmin } = useAuth();
  
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black dark:text-white transition-colors duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={isAuthenticated ? <Courses /> : <Navigate to="/signup" />}
          />
          <Route path="/courses" element={<Courses />} />
          <Route path="/book/:id" element={<BookDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/admin"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
