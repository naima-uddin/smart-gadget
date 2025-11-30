// components/StructuredData.jsx
export function ProductStructuredData({ product, category }) {
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    image: product.images || [product.image],
    description: product.description,
    sku: product.id.toString(),
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: product.rating.toString(),
        bestRating: '10'
      },
      author: {
        '@type': 'Organization',
        name: 'SmartGadget'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toString(),
      reviewCount: product.reviews.toString()
    },
    offers: {
      '@type': 'Offer',
      url: `https://smartgadget.com/category/${category}/${product.id}`,
      priceCurrency: 'USD',
      price: product.price.toString(),
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Amazon'
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function CategoryStructuredData({ category, products }) {
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'ItemList',
    name: `${category.name} - Best Products 2025`,
    description: category.description,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        url: `https://smartgadget.com/category/${category.slug}/${product.id}`,
        image: product.images?.[0] || product.image,
        description: product.description.substring(0, 150),
        brand: {
          '@type': 'Brand',
          name: product.brand
        },
        offers: {
          '@type': 'Offer',
          price: product.price.toString(),
          priceCurrency: 'USD'
        }
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}