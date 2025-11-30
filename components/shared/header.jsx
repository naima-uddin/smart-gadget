// Header.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import Logo from "./Logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        
        const categoryMap = {
          'electronics': { name: 'Electronics', slug: 'electronics' },
          'jewelery': { name: 'Jewelery', slug: 'jewelery' },
          "men's clothing": { name: "Men's Clothing", slug: 'mens-clothing' },
          "women's clothing": { name: "Women's Clothing", slug: 'womens-clothing' }
        };
        
        const mappedCategories = data.map(cat => ({
          name: categoryMap[cat]?.name || cat,
          href: `/category/${categoryMap[cat]?.slug || cat}`
        }));
        
        setCategories(mappedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      try {
        // Search all products
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        
        const match = products.find((p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (match) {
          const categorySlugMap = {
            'electronics': 'electronics',
            'jewelery': 'jewelery',
            "men's clothing": 'mens-clothing',
            "women's clothing": 'womens-clothing'
          };
          const slug = categorySlugMap[match.category] || match.category;
          router.push(`/category/${slug}?q=${encodeURIComponent(searchTerm)}`);
        } else {
          alert("No product found!");
        }
      } catch (error) {
        console.error('Search error:', error);
        alert("Search failed. Please try again.");
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="px-4 sm:px-6 md:px-16">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm font-semibold text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 relative group"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                className="pl-12 w-64 h-12 rounded-xl border-gray-300 bg-gray-50 font-medium focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-4 space-y-2 border-t border-gray-200">
            <div className="flex flex-col space-y-2 px-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className="text-sm font-semibold text-gray-700 hover:text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            {/* Mobile Search */}
            <div className="px-4 mt-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  className="pl-12 w-full h-12 rounded-xl border-gray-300 bg-gray-50 font-medium focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
