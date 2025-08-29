import React from "react";
import { Link } from "react-router-dom";

function Cards({ item }) {
  // Handle case where item is undefined or null
  if (!item) {
    return (
      <div className="w-full sm:w-auto">
        <div className="card w-full bg-white dark:bg-gray-800 shadow-xl hover:scale-105 duration-200 dark:text-white border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="card-body p-4">
            <h2 className="card-title text-lg">Book Not Available</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">This book information is not available.</p>
          </div>
        </div>
      </div>
    );
  }

  // Provide default values for missing properties
  const {
    name = "Unknown Book",
    title = "No description available",
    price = 0,
    category = "General",
    image = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
    isFree = true,
    uploadedBy = null
  } = item;

  // Determine if book is free based on isFree field, price, or category
  const bookIsFree = isFree !== undefined ? isFree : (price === 0 || category === "Free");
  const displayPrice = bookIsFree ? 0 : price;
  


  return (
    <div className="w-full">
      <Link to={`/book/${item._id || item.id}`} className="block">
        <div className="card w-full bg-white dark:bg-gray-800 shadow-xl hover:scale-105 duration-200 dark:text-white border border-gray-200 dark:border-gray-700 flex flex-col rounded-lg overflow-hidden h-full transition-all duration-300 hover:shadow-2xl">
          {/* Image Container */}
          <figure className="relative h-48 sm:h-56 md:h-52 lg:h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
            <img 
              src={image} 
              alt={name}
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop";
              }}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              loading="lazy"
            />
            {/* Category Badge Overlay - Only show for free books */}
            {bookIsFree && (
              <div className="absolute top-2 right-2">
                <div className="badge badge-success text-xs">
                  {category}
                </div>
              </div>
            )}
            {/* Free/Paid Badge Overlay - Only show for paid books */}
            {!bookIsFree && (
              <div className="absolute top-2 right-2">
                <div className="badge badge-warning text-xs">
                  Paid
                </div>
              </div>
            )}
          </figure>
          
          {/* Card Content */}
          <div className="card-body flex-1 flex flex-col p-4 sm:p-5">
            <h2 className="card-title text-base sm:text-lg font-bold mb-2 line-clamp-2">
              {name}
            </h2>
            
            <p className="text-sm text-gray-600 dark:text-gray-300 flex-1 line-clamp-3 mb-4 leading-relaxed">
              {title}
            </p>
            
            {/* Uploaded By Info */}
            {uploadedBy && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                By: {typeof uploadedBy === 'object' ? uploadedBy.fullname : uploadedBy}
              </div>
            )}
            
            {/* Price and Action */}
            <div className="card-actions justify-between items-center mt-auto pt-3 border-t border-gray-100 dark:border-gray-700">
              <div className={`badge ${bookIsFree ? "badge-outline badge-success" : "badge-outline badge-warning"} text-xs`}>
                {bookIsFree ? "Free" : `$${displayPrice}`}
              </div>
              
              <div className={`px-3 py-2 rounded-full border-2 transition-all duration-200 text-sm font-medium ${
                bookIsFree 
                  ? "border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white" 
                  : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
              }`}>
                {bookIsFree ? "Read Now" : "Buy Now"}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Cards;

/*
<div className="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">
      Card Title
      <div className="badge badge-secondary">NEW</div>
    </h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-end">
      <div className="badge badge-outline">Fashion</div>
      <div className="badge badge-outline">Products</div>
    </div>
  </div>
</div>
*/