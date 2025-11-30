// Generate breadcrumb structured data for product pages
const BreadcrumbStructuredData = ({ category, product }) => {
  // Return null if product data is not available yet
  if (!product) return null;

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://smartgadget.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category || product.category || "Products",
        item: `https://smartgadget.com/category/${
          category || product.category
        }`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name || product.title,
        item: `https://smartgadget.com/category/${
          category || product.category
        }/${product.id}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
};

export default BreadcrumbStructuredData;
