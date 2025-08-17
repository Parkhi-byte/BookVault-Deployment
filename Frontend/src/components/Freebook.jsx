import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import list from "../../public/list.json";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import axios from "axios";
import { API_BASE_URL } from "../config.js";

import Cards from "./Cards";
function Freebook() {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBook = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/book`);
        const data = res.data.filter((data) => data.category === "Free");
        console.log("API Data:", data);
        
        if (data.length > 0) {
          setBook(data);
        } else {
          // Fallback to local data if API returns empty or no free books
          const localFreeBooks = list.filter((item) => item.category === "Free");
          console.log("Local Data:", localFreeBooks);
          setBook(localFreeBooks);
        }
      } catch (error) {
        console.log("API Error:", error);
        // Fallback to local data when API fails
        const localFreeBooks = list.filter((item) => item.category === "Free");
        console.log("Using Local Data:", localFreeBooks);
        setBook(localFreeBooks);
      } finally {
        setLoading(false);
      }
    };
    getBook();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-black transition-colors duration-300">
        <div className="max-w-screen-2xl container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center py-8 sm:py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading free books...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300 py-12 sm:py-16 lg:py-20">
        <div className="max-w-screen-2xl container mx-auto px-4 sm:px-6 lg:px-8 xl:px-20">
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs sm:text-sm font-medium mb-4">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              Free Books Available
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
              Free Learning for <span className="text-pink-500">Book Lovers</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              We offer free online courses to help you get more from your reading journey — from speed-reading tips to creative writing workshops. Learn, grow, and share your passion with readers around the world.
            </p>
          </div>

          <div className="mt-8 sm:mt-12">
            {book.length > 0 ? (
              <div className="px-2 sm:px-4">
                <Slider {...settings}>
                  {book.map((item, index) => (
                    <div key={index} className="px-2 sm:px-3">
                      <Cards item={item} />
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 shadow-lg max-w-md mx-auto">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                  <p className="text-gray-500 text-base sm:text-lg">No free books available at the moment.</p>
                  <p className="text-gray-400 mt-2 text-sm sm:text-base">Check back soon for new additions!</p>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link to="/courses">
              <button className="bg-pink-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-pink-600 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                View All Books
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Freebook;
