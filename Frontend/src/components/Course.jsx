import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import list from "../../public/list.json";
import { API_BASE_URL } from "../config.js";

function Course() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // "all", "free", "paid"
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  useEffect(() => {
    const getBook = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/book`);
        console.log("API Data:", res.data);
        
        if (res.data.length > 0) {
          setBook(res.data);
        } else {
          // Fallback to local data if API returns empty
          console.log("Using Local Data:", list);
          setBook(list);
        }
      } catch (error) {
        console.log("API Error:", error);
        // Fallback to local data when API fails
        console.log("Using Local Data:", list);
        setBook(list);
      } finally {
        setLoading(false);
      }
    };
    getBook();
  }, []);

  // Filter books based on selected filter and search query
  const filteredBooks = book.filter((item) => {
    // First apply search filter if there's a search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        item.name.toLowerCase().includes(searchLower) ||
        item.title.toLowerCase().includes(searchLower) ||
        item.author?.toLowerCase().includes(searchLower) ||
        item.genre?.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }
    
    // Then apply category filter
    if (filter === "all") return true;
    if (filter === "free") return item.category === "Free";
    if (filter === "paid") return item.category === "Paid";
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-screen-2xl container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center py-8 sm:py-12 mt-28">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading books...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-screen-2xl container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="mt-28 items-center justify-center text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
              {searchQuery ? (
                <>
                  Search Results for{" "}
                  <span className="text-pink-500">"{searchQuery}"</span>
                </>
              ) : (
                <>
                  We're delighted to have you {" "}
                  <span className="text-pink-500"> Here! 😊</span>
                </>
              )}
            </h1>
            <p className="mt-8 sm:mt-12 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-4xl mx-auto px-4">
              {searchQuery ? (
                `Found ${filteredBooks.length} book${filteredBooks.length !== 1 ? 's' : ''} matching your search.`
              ) : (
                <>
                  Step into a world of imagination, inspiration, and endless discovery. At <b>BookVault</b>, every page you turn can spark a new idea, take you to a far-off land, or teach you something you've always wanted to know. Whether you're hunting for the latest bestseller, a timeless classic, or a hidden gem, you'll find it right here — ready to become your next favorite read.
                </>
              )}
            </p>
            <Link to="/">
              <button className="mt-6 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300 text-sm sm:text-base">
                Back to Home
              </button>
            </Link>
          </div>

          {/* Filter Section */}
          <div className="mt-8 sm:mt-12 flex justify-center">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-gray-100 dark:bg-gray-800 p-2 sm:p-3 rounded-lg">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 sm:px-4 py-2 rounded-md transition-colors duration-300 text-sm sm:text-base ${
                  filter === "all"
                    ? "bg-pink-500 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                All Books ({book.length})
              </button>
              <button
                onClick={() => setFilter("free")}
                className={`px-3 sm:px-4 py-2 rounded-md transition-colors duration-300 text-sm sm:text-base ${
                  filter === "free"
                    ? "bg-pink-500 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Free Books ({book.filter(item => item.category === "Free").length})
              </button>
              <button
                onClick={() => setFilter("paid")}
                className={`px-3 sm:px-4 py-2 rounded-md transition-colors duration-300 text-sm sm:text-base ${
                  filter === "paid"
                    ? "bg-pink-500 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Paid Books ({book.filter(item => item.category === "Paid").length})
              </button>
            </div>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((item, index) => (
                <Cards key={index} item={item} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 sm:py-12">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 shadow-lg max-w-md mx-auto">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  <p className="text-gray-500 text-base sm:text-lg">No books available in this category.</p>
                  <p className="text-gray-400 mt-2 text-sm sm:text-base">Try selecting a different filter or search term.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Course;
