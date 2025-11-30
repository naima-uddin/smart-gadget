"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const categories = [
  {
    id: "jewelery",
    name: "Jewelery",
    image: "/category-banner/ring1.png",
    hoverImage: "/category-banner/ring2.png",
    href: "/category/jewelery",
    bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "/category-banner/electronics1.png",
    hoverImage: "/category-banner/electronics2.png",
    href: "/category/electronics",
    bgColor: "bg-gradient-to-br from-purple-50 to-cyan-50",
  },
  {
    id: "mens-clothing",
    name: "Men's Clothing",
    image: "/category-banner/mCloth1.png",
    hoverImage: "/category-banner/mCloth2.png",
    href: "/category/mens-clothing",
    bgColor: "bg-gradient-to-br from-cyan-50 to-purple-50",
  },
  {
    id: "womens-clothing",
    name: "Women's Clothing",
    image: "/category-banner/wCloth1.png",
    hoverImage: "/category-banner/wCloth2.png",
    href: "/category/womens-clothing",
    bgColor: "bg-gradient-to-br from-purple-100 to-cyan-100",
  },
];

export default function CategoryGrid() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const totalPages = Math.ceil(categories.length / visibleCards);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 768) {
        setVisibleCards(2);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }
      setCurrentPage(0); // Reset to first page on resize
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  // Get the categories for the current page with loop around
  const getVisibleCategories = () => {
    const startIndex = currentPage * visibleCards;
    const visibleCategories = [];

    for (let i = 0; i < visibleCards; i++) {
      const index = (startIndex + i) % categories.length;
      visibleCategories.push(categories[index]);
    }

    return visibleCategories;
  };

  const visibleCategories = getVisibleCategories();

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white to-purple-50">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold flex justify-center text-center mb-10 sm:mb-12 relative mx-auto bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
          Shop By Categories
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></span>
        </h2>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevPage}
            className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 -translate-x-0 sm:-translate-x-4 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-purple-600 hover:text-white hover:border-purple-600"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextPage}
            className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 translate-x-0 sm:translate-x-4 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-cyan-500 hover:text-white hover:border-cyan-500"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {visibleCategories.map((cat) => (
              <Link
                key={`${cat.id}-${currentPage}`}
                href={cat.href}
                className={`relative group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 ${cat.bgColor} border border-gray-100 hover:border-cyan-200`}
                onMouseEnter={() => setHoveredItem(cat.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-cyan-200/20"></div>
                </div>

                {/* Image Wrapper */}
                <div className="relative flex items-center justify-center h-48 sm:h-56 md:h-64 p-3 sm:p-4">
                  {/* Default Image */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className={`max-h-32 sm:max-h-40 md:max-h-44 object-contain transition-all duration-500 ${
                      hoveredItem === cat.id ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    }`}
                  />

                  {/* Hover Image */}
                  <img
                    src={cat.hoverImage}
                    alt={`${cat.name} hover`}
                    className={`absolute max-h-32 sm:max-h-40 md:max-h-44 object-contain transition-all duration-500 ${
                      hoveredItem === cat.id ? "opacity-100 scale-110" : "opacity-0 scale-95"
                    }`}
                  />
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-cyan-500/0 to-purple-500/0 group-hover:via-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500 rounded-xl"></div>

                {/* Text Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 backdrop-blur-lg px-3 sm:px-4 py-2 sm:py-3 rounded-lg shadow-lg border border-gray-100 transform transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-3 sm:translate-y-4">
                  <span className="font-semibold text-xs sm:text-sm md:text-sm bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    {cat.name}
                  </span>
                </div>

                {/* Subtle border highlight on hover */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cyan-300/30 transition-all duration-300"></div>
              </Link>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  );
}
