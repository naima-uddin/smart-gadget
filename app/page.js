// app/page.js
import HeroSection from "@/components/home-component/hero-section";
import CategoryGrid from "@/components/home-component/CategoryGrid";
import ServicesBanner from "@/components/home-component/ServicesSlider";
import ReviewCarousel from "@/components/home-component/Reviews";
import FeaturedProducts from "@/components/home-component/FeaturedProducts";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <ServicesBanner />
      <FeaturedProducts />
      <ReviewCarousel />
    </>
  );
}
