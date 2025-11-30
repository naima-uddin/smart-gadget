// app/sitemap.js
export const dynamic = "force-static";

const baseUrl = "https://smartgadget.com";

// Category mapping from API to URL slugs
const categories = [
  { name: 'electronics', slug: 'electronics' },
  { name: 'jewelery', slug: 'jewelery' },
  { name: "men's clothing", slug: 'mens-clothing' },
  { name: "women's clothing", slug: 'womens-clothing' }
];

export default async function sitemap() {
  // ✅ Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/advertiser-discloser`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // ✅ Category pages
  const categoryPages = categories.map(cat => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // ✅ Fetch products from API and create product pages
  const productPages = [];
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    
    products.forEach(product => {
      const category = categories.find(c => c.name === product.category);
      const categorySlug = category ? category.slug : product.category;
      
      productPages.push({
        url: `${baseUrl}/category/${categorySlug}/${product.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  // ✅ Combine ALL pages
  return [
    ...staticPages,
    ...categoryPages,
    ...productPages,
  ];
}