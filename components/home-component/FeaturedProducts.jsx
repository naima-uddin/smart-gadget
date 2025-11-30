"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) setItemsPerPage(2);
      else setItemsPerPage(8);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products?limit=8');
        const data = await response.json();
        
        const transformed = data.map(item => ({
          id: item.id,
          name: item.title,
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category,
          rating: item.rating?.rate || 0,
          reviews: item.rating?.count || 0
        }));
        
        setProducts(transformed);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (!isMounted) return null;

  const filteredProducts = products;

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));

  const start = currentIndex * itemsPerPage;
  const visibleProducts = filteredProducts.slice(start, start + itemsPerPage);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev < totalPages - 1 ? prev + 1 : 0));

  const renderStars = (rating) => {
    const stars = Math.round(rating);
    return (
      <div className="flex items-center justify-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-amber-500 text-sm">
            {i < stars ? "★" : "☆"}
          </span>
        ))}
      </div>
    );
  };

  // Get category slug for link
  const getCategorySlug = (category) => {
    const slugMap = {
      'electronics': 'electronics',
      'jewelery': 'jewelery',
      "men's clothing": 'mens-clothing',
      "women's clothing": 'womens-clothing'
    };
    return slugMap[category] || category;
  };

  if (loading) {
    return (
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">
          Featured products
        </h2>

        {/* Products grid */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {visibleProducts.map((product) => (
            <Link 
              key={product.id}
              href={`/category/${getCategorySlug(product.category)}/${product.id}`}
              className="relative bg-white rounded-lg border border-cyan-200 p-4 text-center hover:shadow-md transition block"
            >
              <div className="h-30 flex items-center justify-center mb-2">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-full object-contain"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>

              <h3 className="font-medium text-base text-gray-700 line-clamp-2 mb-2">
                {product.name}
              </h3>

              {renderStars(product.rating)}

              <div className="mt-2 text-lg font-bold text-purple-600">
                ${product.price.toFixed(2)}
              </div>

              <div className="mt-2 text-sm text-gray-500">
                {product.reviews} reviews
              </div>
            </Link>
          ))}

          {/* Arrows */}
          {filteredProducts.length > itemsPerPage && (
            <>
              <button
                onClick={handlePrev}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-purple-50 text-purple-600"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-purple-50 text-purple-600"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No products found for this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
