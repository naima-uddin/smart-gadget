// app/category/[category]/[id]/page.js
import ProductDetailPage from "@/page/ProductDetailPage";
import { fetchAllProducts } from "@/lib/api";

export async function generateStaticParams() {
  const products = await fetchAllProducts();
  
  const categorySlugMap = {
    'electronics': 'electronics',
    'jewelery': 'jewelery',
    "men's clothing": 'mens-clothing',
    "women's clothing": 'womens-clothing'
  };

  return products.map(product => ({
    category: categorySlugMap[product.category] || product.category,
    id: String(product.id)
  }));
}

export default function Page({ params }) {
  return (
    <>
      <ProductDetailPage />
    </>
  );
}