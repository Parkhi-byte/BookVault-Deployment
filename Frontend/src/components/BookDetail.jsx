import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import { API_BASE_URL } from "../config.js";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        // Try to fetch from API first
        const res = await axios.get(`${API_BASE_URL}/book/${id}`);
        if (res.data) {
          // Backend returns a book document directly
          setBook(res.data.book || res.data);
        } else {
          // Fallback to local data
          const localBooks = await import("../../public/list.json");
          const foundBook = localBooks.default.find(b => b.id === parseInt(id));
          if (foundBook) {
            setBook(foundBook);
          } else {
            setError("Book not found");
          }
        }
      } catch (error) {
        console.log("API Error, trying local data:", error);
        // Fallback to local data
        try {
          const localBooks = await import("../../public/list.json");
          const foundBook = localBooks.default.find(b => b.id === parseInt(id));
          if (foundBook) {
            setBook(foundBook);
          } else {
            setError("Book not found");
          }
        } catch (localError) {
          setError("Failed to load book");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleBuyNow = () => {
    toast.success("Redirecting to payment gateway...");
    // Here you would integrate with a payment gateway
    setTimeout(() => {
      toast.success("Purchase completed! You can now read the book.");
    }, 2000);
  };

  const handleStartReading = () => {
    toast.success("Opening book reader...");
    // Here you would open the book reader component
    setTimeout(() => {
      toast.success("Enjoy your reading!");
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <Navbar />
        <div className="max-w-screen-2xl container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center py-8 sm:py-12 mt-28">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading book details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <Navbar />
        <div className="max-w-screen-2xl container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center py-8 sm:py-12 mt-28">
            <h1 className="text-2xl font-bold text-red-500 mb-4">Book Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
              The book you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/courses">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-md hover:bg-pink-600 duration-300 text-sm sm:text-base">
                Back to Books
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Navbar />
      <div className="max-w-screen-2xl container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
        <div className="mt-28">
          {/* Breadcrumb */}
          <nav className="flex mb-6 sm:mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm sm:text-base">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-pink-500">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <Link to="/courses" className="text-gray-600 dark:text-gray-300 hover:text-pink-500 ml-1">
                    Books
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                  </svg>
                  <span className="ml-1 text-gray-500 dark:text-gray-400 truncate">{book.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          {/* Book Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Book Image */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={book.image} 
                  alt={book.name}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop";
                  }}
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Book Stats */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Author</h3>
                  <p className="text-sm sm:text-lg font-semibold">{book.author || "Unknown Author"}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Pages</h3>
                  <p className="text-sm sm:text-lg font-semibold">{book.pages || "N/A"}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Genre</h3>
                  <p className="text-sm sm:text-lg font-semibold">{book.genre || "General"}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 sm:p-4 rounded-lg">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400">Category</h3>
                  <p className="text-sm sm:text-lg font-semibold">{book.category}</p>
                </div>
              </div>
            </div>

            {/* Book Information */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{book.name}</h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-6">{book.title}</p>
                
                {/* Price Badge */}
                <div className="inline-block bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 px-3 sm:px-4 py-2 rounded-full font-semibold mb-4 sm:mb-6 text-sm sm:text-base">
                  {book.price === 0 ? "Free" : `$${book.price}`}
                </div>
              </div>

              {/* Book Introduction */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">About This Book</h2>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                    {book.intro || "No introduction available for this book."}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 sm:space-y-4">
                {book.category === "Free" ? (
                  <button
                    onClick={handleStartReading}
                    className="w-full bg-pink-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors duration-300 font-semibold text-base sm:text-lg"
                  >
                    Start Reading
                  </button>
                ) : (
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-green-500 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300 font-semibold text-base sm:text-lg"
                  >
                    Buy Now - ${book.price}
                  </button>
                )}
                
                <Link to="/courses">
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 text-sm sm:text-base">
                    Back to Books
                  </button>
                </Link>
              </div>

              {/* Additional Features */}
              <div className="border-t pt-4 sm:pt-6">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Book Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm sm:text-base">High-quality content</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm sm:text-base">Professional editing</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm sm:text-base">Expert insights</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm sm:text-base">Lifetime access</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
