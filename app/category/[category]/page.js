// app/category/[category]/page.js
import DynamicPage from "@/page/DynamicPage";
import { fetchCategories } from "@/lib/api";

export async function generateStaticParams() {
  const categories = await fetchCategories();
  
  const categorySlugMap = {
    'electronics': 'electronics',
    'jewelery': 'jewelery',
    "men's clothing": 'mens-clothing',
    "women's clothing": 'womens-clothing'
  };
  
  return categories.map((cat) => ({
    category: categorySlugMap[cat] || cat
  }));
}

export default async function Page({ params }) {
  return (
    <>
      <DynamicPage />
    </>
  );
}