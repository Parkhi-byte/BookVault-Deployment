import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import banner from "../../public/Banner.png";

function Banner() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      alert("Thank you for subscribing! We'll keep you updated with the latest books.");
      setEmail("");
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20 flex flex-col lg:flex-row items-center my-8 sm:my-12 lg:my-16 gap-8 lg:gap-12">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1 mt-8 lg:mt-0">
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full text-xs sm:text-sm font-medium">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Welcome to BookVault
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Every book here is an unopened door —{" "}
                <span className="text-pink-500 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  which one will you open?
                </span>
              </h1>
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Discover a world of stories, knowledge, and inspiration — all in one place. Whether you're here for a quick read, to find your next favorite novel, or to explore new ideas, our bookstore has something for everyone.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/courses" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Explore Books
                </button>
              </Link>
              <Link to="/about" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto border-2 border-pink-500 text-pink-500 dark:text-pink-400 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-pink-500 hover:text-white focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-base sm:text-lg">
                  Learn More
                </button>
              </Link>
            </div>

            {/* Search and Subscribe Section */}
            <div className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 rounded-lg">
              <h3 className="font-semibold mb-3 text-sm sm:text-base">Search Books</h3>
              <div className="mb-4">
                <SearchBar />
              </div>
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3 text-sm sm:text-base">Stay Updated</h4>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-pink-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-pink-600 transition-colors duration-300 font-semibold text-sm sm:text-base"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="order-1 w-full lg:w-1/2 lg:order-2">
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-3xl blur-3xl"></div>
            <img
              src={banner}
              className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none lg:w-[550px] lg:h-[460px] rounded-2xl shadow-2xl"
              alt="BookVault Banner"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
