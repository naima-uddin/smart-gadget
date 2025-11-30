"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Check,
  Shield,
  Truck,
} from "lucide-react";
import Link from "next/link";
import BreadcrumbStructuredData from "@/components/shared/BreadcrumbStructuredData";

export default function ProductDetailPage() {
  const { category, id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (!category || !id) return;

    const fetchProductData = async () => {
      try {
        setLoading(true);

        // Map slug to API category
        const categoryMap = {
          electronics: "electronics",
          jewelery: "jewelery",
          "mens-clothing": "men's clothing",
          "womens-clothing": "women's clothing",
        };

        const apiCategory = categoryMap[category] || category;

        // Fetch product
        const productRes = await fetch(
          `https://fakestoreapi.com/products/${id}`
        );
        const productData = await productRes.json();

        if (productData) {
          const transformedProduct = {
            id: productData.id,
            name: productData.title,
            title: productData.title,
            description: productData.description,
            price: productData.price,
            image: productData.image,
            images: [productData.image],
            category: productData.category,
            rating: productData.rating?.rate || 0,
            reviews: productData.rating?.count || 0,
            brand: "Brand",
            inStock: true,
          };

          setProduct(transformedProduct);

          // Fetch related products from same category
          const relatedRes = await fetch(
            `https://fakestoreapi.com/products/category/${apiCategory}`
          );
          const relatedData = await relatedRes.json();

          const related = relatedData
            .filter((p) => p.id !== productData.id)
            .slice(0, 4)
            .map((item) => ({
              id: item.id,
              name: item.title,
              title: item.title,
              price: item.price,
              image: item.image,
              category: item.category,
              rating: item.rating?.rate || 0,
              reviews: item.rating?.count || 0,
            }));

          setRelatedProducts(related);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProductData();
  }, [category, id]);

  const changeImage = (direction) => {
    if (!product?.images) return;

    const totalImages = product.images.length;
    if (totalImages === 0) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (selectedImageIndex + 1) % totalImages;
    } else {
      newIndex = (selectedImageIndex - 1 + totalImages) % totalImages;
    }
    setSelectedImageIndex(newIndex);
  };

  const selectImage = (index) => {
    setSelectedImageIndex(index);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-cyan-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-cyan-50">
        <div className="text-center px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="text-purple-600 hover:text-purple-800 font-medium transition-colors duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const mainImage =
    product.images && product.images.length > 0
      ? product.images[selectedImageIndex]
      : product.image;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-cyan-50 py-8">
      {/* Use it in your ProductDetailPage return statement */}
      <BreadcrumbStructuredData
        category={product?.category}
        product={product}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex flex-wrap items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="hover:text-purple-600 transition-colors duration-300"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-xs">
                {product.name.length > 50
                  ? product.name.substring(0, 50) + "..."
                  : product.name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="relative aspect-square mb-4">
              <img
                src={mainImage || "/placeholder-image.jpg"}
                alt={product.name}
                className="w-full h-full object-contain rounded-lg transition-transform duration-300 hover:scale-105"
              />

              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={() => changeImage("prev")}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-purple-100 p-3 rounded-full shadow-lg transition-all duration-300 border border-gray-200"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-700" />
                  </button>
                  <button
                    onClick={() => changeImage("next")}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-cyan-100 p-3 rounded-full shadow-lg transition-all duration-300 border border-gray-200"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.badge && (
                  <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-2 rounded-md text-sm font-semibold shadow-lg">
                    {product.badge}
                  </span>
                )}
                {!product.inStock && (
                  <span className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-semibold shadow-lg">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto py-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      selectedImageIndex === index
                        ? "border-purple-600 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="mb-4">
              <span className="bg-gradient-to-r from-purple-100 to-cyan-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                {product.brand}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-4 flex-wrap">
              <div className="flex items-center">
                <span className="text-xl font-bold text-gray-900 mr-2">
                  {product.rating?.toFixed(1)}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating || 5)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">
                  ({product.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Key Features:
                </h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 5).map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Product Info */}
            <div className="space-y-3 mb-6">
              <div className="text-center py-4 px-6 bg-gradient-to-r from-purple-50 to-cyan-50 rounded-lg">
                <span className="text-sm text-gray-600">Price</span>
                <div className="text-3xl font-bold text-purple-600 mt-1">
                  ${product.price?.toFixed(2)}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-1 text-purple-500" />
                  <span>Available</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1 text-cyan-500" />
                  <span>In Stock</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-12 border border-gray-100">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="flex space-x-6 sm:space-x-8 px-4 sm:px-6">
              {[
                { id: "description", label: "Description" },
                { id: "specifications", label: "Specifications" },
                { id: "reviews", label: "Reviews" },
                { id: "summary", label: "Review Summary" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-purple-600 text-purple-600"
                      : "border-transparent text-gray-500 hover:text-purple-600"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Description Tab */}
            {activeTab === "description" && (
              <div>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
                {product.features && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Key Features:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Category:</span>
                  <span className="text-gray-900 font-medium capitalize">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Price:</span>
                  <span className="text-gray-900 font-medium">
                    ${product.price?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Rating:</span>
                  <span className="text-gray-900 font-medium">
                    {product.rating}/5
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Reviews:</span>
                  <span className="text-gray-900 font-medium">
                    {product.reviews}
                  </span>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-6 w-6 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    {product.rating?.toFixed(1)} out of 5
                  </p>
                  <p className="text-gray-600">
                    Based on {product.reviews} customer reviews
                  </p>
                </div>
              </div>
            )}

            {/* Review Summary Tab */}
            {activeTab === "summary" && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">
                    Product Summary
                  </h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="bg-gradient-to-r from-purple-50 to-cyan-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Average Rating</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {product.rating?.toFixed(1)}/5
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Reviews</p>
                        <p className="text-2xl font-bold text-cyan-600">
                          {product.reviews}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Related Products
              </h2>
              <Link
                href={`/category/${(() => {
                  const categorySlugMap = {
                    electronics: "electronics",
                    jewelery: "jewelery",
                    "men's clothing": "mens-clothing",
                    "women's clothing": "womens-clothing",
                  };
                  return categorySlugMap[product.category] || product.category;
                })()}`}
                className="flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors duration-300"
              >
                View All <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-purple-200 transform hover:-translate-y-1"
                >
                  <div className="relative aspect-square">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">
                      {relatedProduct.name.length > 60
                        ? relatedProduct.name.substring(0, 60) + "..."
                        : relatedProduct.name}
                    </h3>

                    <div className="flex items-center justify-end">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">
                          {relatedProduct.rating}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const categorySlugMap = {
                          electronics: "electronics",
                          jewelery: "jewelery",
                          "men's clothing": "mens-clothing",
                          "women's clothing": "womens-clothing",
                        };
                        const slug =
                          categorySlugMap[product.category] || product.category;
                        router.push(`/category/${slug}/${relatedProduct.id}`);
                      }}
                      className="w-full mt-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white py-2 px-4 rounded text-sm font-medium transition-all duration-300 transform hover:scale-105"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
