// lib/api.js - API utilities for Fake Store API

const API_BASE_URL = 'https://fakestoreapi.com';

// Category mapping from API to display names
export const CATEGORIES = {
  'electronics': {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Discover the latest electronics and gadgets',
    image: '/category-banner/drone1.png',
  },
  'jewelery': {
    name: 'Jewelery',
    slug: 'jewelery',
    description: 'Beautiful jewelry pieces for every occasion',
    image: '/category-banner/watch.png',
  },
  "men's clothing": {
    name: "Men's Clothing",
    slug: 'mens-clothing',
    description: "Latest fashion trends for men",
    image: '/category-banner/drill1.png',
  },
  "women's clothing": {
    name: "Women's Clothing",
    slug: 'womens-clothing',
    description: "Latest fashion trends for women",
    image: '/category-banner/earbud1.png',
  },
};

// Get slug from category name
export function getCategorySlug(categoryName) {
  const category = CATEGORIES[categoryName];
  return category ? category.slug : categoryName.toLowerCase().replace(/['\s]+/g, '-');
}

// Get category name from slug
export function getCategoryFromSlug(slug) {
  const entry = Object.entries(CATEGORIES).find(([key, val]) => val.slug === slug);
  return entry ? entry[0] : slug;
}

// Fetch all products
export async function fetchAllProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch products by category
export async function fetchProductsByCategory(category) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products for category: ${category}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching category products:', error);
    return [];
  }
}

// Fetch single product by ID
export async function fetchProductById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${id}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Fetch all categories
export async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return Object.keys(CATEGORIES);
  }
}

// Transform API product to match component needs
export function transformProduct(apiProduct) {
  return {
    id: apiProduct.id,
    name: apiProduct.title,
    title: apiProduct.title,
    description: apiProduct.description,
    price: apiProduct.price,
    image: apiProduct.image,
    images: [apiProduct.image], // API only provides one image
    category: apiProduct.category,
    rating: apiProduct.rating?.rate || 0,
    reviews: apiProduct.rating?.count || 0,
    brand: 'Store Brand',
    inStock: true,
  };
}
