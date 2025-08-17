import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import list from "../../public/list.json";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [allBooks, setAllBooks] = useState([]);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load books from API or fallback to local data
    const loadBooks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/book");
        if (response.data && response.data.length > 0) {
          setAllBooks(response.data);
        } else {
          setAllBooks(list);
        }
      } catch (error) {
        console.log("Using local book data:", error);
        setAllBooks(list);
      }
    };

    loadBooks();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    
    if (value.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const filtered = allBooks.filter(book => 
        book.name.toLowerCase().includes(value.toLowerCase()) ||
        book.title.toLowerCase().includes(value.toLowerCase()) ||
        book.author?.toLowerCase().includes(value.toLowerCase()) ||
        book.genre?.toLowerCase().includes(value.toLowerCase())
      );
      
      setSearchResults(filtered);
      setShowResults(true);
      setIsSearching(false);
    }, 300);
  };

  const handleBookClick = (book) => {
    setSearchTerm("");
    setShowResults(false);
    navigate(`/book/${book.id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleBookClick(searchResults[0]);
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <form onSubmit={handleSearchSubmit}>
        <label className="px-2 sm:px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md flex items-center gap-2 bg-white dark:bg-gray-800 min-w-[200px] sm:min-w-[250px] md:min-w-[300px] focus-within:ring-2 focus-within:ring-pink-500 focus-within:border-pink-500 transition-all duration-200">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="grow outline-none rounded-md px-1 bg-white dark:bg-gray-800 dark:text-white text-sm sm:text-base placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Search books, authors, genres..."
          />
          {isSearching ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-500"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 text-gray-500 dark:text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </label>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 sm:max-h-96 overflow-y-auto">
          {searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.slice(0, 6).map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleBookClick(book)}
                  className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <img
                      src={book.image}
                      alt={book.name}
                      className="w-10 h-12 sm:w-12 sm:h-16 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=48&h=64&fit=crop";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {book.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {book.author || "Unknown Author"}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          book.category === "Free" 
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}>
                          {book.category}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {book.price === 0 ? "Free" : `$${book.price}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {searchResults.length > 6 && (
                <div className="px-3 sm:px-4 py-2 text-center border-t border-gray-200 dark:border-gray-700">
                  <Link 
                    to={`/courses?search=${encodeURIComponent(searchTerm)}`}
                    className="text-xs sm:text-sm text-pink-500 hover:text-pink-600 font-medium"
                    onClick={() => setShowResults(false)}
                  >
                    View all {searchResults.length} results
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="px-4 py-6 text-center">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">No books found</p>
              <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">Try different keywords</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
