// utils/seo.js

/**
 * Generate optimized title for SEO
 * @param {string} title - Page title
 * @param {string} siteName - Site name (default: SmartGadget)
 * @returns {string} - Optimized title
 */
export function generateTitle(title, siteName = 'SmartGadget') {
  if (!title) return siteName;
  return title.includes(siteName) ? title : `${title} | ${siteName}`;
}

/**
 * Generate optimized meta description
 * @param {string} description - Description text
 * @param {number} maxLength - Maximum length (default: 160)
 * @returns {string} - Truncated description
 */
export function generateDescription(description, maxLength = 160) {
  if (!description) return '';
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + '...';
}

/**
 * Generate product-specific alt text
 * @param {object} product - Product object
 * @param {string} imageType - Type of image (main, gallery, thumbnail)
 * @returns {string} - SEO-optimized alt text
 */
export function generateProductAltText(product, imageType = 'main') {
  const brand = product.brand || '';
  const name = product.name || 'Product';
  const category = product.category || '';
  
  switch (imageType) {
    case 'main':
      return `${brand} ${name} - ${category} Product Image`;
    case 'gallery':
      return `${brand} ${name} - Additional View`;
    case 'thumbnail':
      return `${brand} ${name} - Thumbnail`;
    default:
      return `${brand} ${name}`;
  }
}

/**
 * Generate canonical URL
 * @param {string} path - Page path
 * @param {string} baseUrl - Base URL (default: https://smartgadget.com)
 * @returns {string} Full canonical URL
 */
export function generateCanonicalUrl(path, baseUrl = 'https://smartgadget.com') {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  // Add trailing slash
  const pathWithSlash = cleanPath.endsWith('/') ? cleanPath : `${cleanPath}/`;
  return `${baseUrl}/${pathWithSlash}`;
}

/**
 * Generate breadcrumb structure
 * @param {array} items - Array of breadcrumb items [{name, url}]
 * @returns {object} - Structured data object
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url
    }))
  };
}

/**
 * Generate FAQ schema
 * @param {array} faqs - Array of FAQ items [{question, answer}]
 * @returns {object} - Structured data object
 */
export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };
}

/**
 * Generate Product schema
 * @param {object} product - Product object
 * @param {string} category - Category slug
 * @returns {object} - Structured data object
 */
export function generateProductSchema(product, category) {
  return {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    'name': product.name,
    'image': product.images || [product.image],
    'description': product.description,
    'sku': product.id.toString(),
    'brand': {
      '@type': 'Brand',
      'name': product.brand
    },
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': product.rating.toString(),
      'reviewCount': product.reviews.toString(),
      'bestRating': '10',
      'worstRating': '1'
    },
    'offers': {
      '@type': 'Offer',
      'url': `https://smartgadget.com/category/${category}/${product.id}`,
      'priceCurrency': 'USD',
      'price': product.price.toString(),
      'availability': product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      'priceValidUntil': new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      'seller': {
        '@type': 'Organization',
        'name': 'Amazon'
      }
    }
  };
}

/**
 * Extract keywords from text
 * @param {string} text - Text to extract keywords from
 * @param {number} limit - Maximum number of keywords
 * @returns {array} - Array of keywords
 */
export function extractKeywords(text, limit = 10) {
  if (!text) return [];
  
  const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for', 'of', 'on', 'at', 'from', 'by', 'is', 'are', 'was', 'were'];
  
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word));
  
  // Count frequency
  const frequency = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Sort by frequency and return top keywords
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

/**
 * Validate and format URL
 * @param {string} url - URL to validate
 * @returns {string} - Formatted URL or empty string
 */
export function validateUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.href;
  } catch (e) {
    return '';
  }
}

/**
 * Generate OpenGraph image URL
 * @param {string} imagePath - Image path or filename
 * @param {string} baseUrl - Base URL
 * @returns {string} - Full image URL
 */
export function generateOGImageUrl(imagePath, baseUrl = 'https://smartgadget.com') {
  if (!imagePath) return `${baseUrl}/logo.png`;
  if (imagePath.startsWith('http')) return imagePath;
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Format price for display and schema
 * @param {number} price - Price value
 * @param {string} currency - Currency code (default: USD)
 * @returns {object} - {display, schema}
 */
export function formatPrice(price, currency = 'USD') {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
  
  return {
    display: formatted,
    schema: price.toFixed(2)
  };
}

/**
 * Calculate reading time
 * @param {string} text - Text content
 * @param {number} wordsPerMinute - Average reading speed (default: 200)
 * @returns {number} - Estimated reading time in minutes
 */
export function calculateReadingTime(text, wordsPerMinute = 200) {
  if (!text) return 0;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
