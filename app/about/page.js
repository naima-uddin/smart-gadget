// app/about/page.tsx
import AboutPage from "@/page/AboutPage";
import { ArticleSchema, FAQSchema } from "@/components/FAQSchema";
import React from "react";

// ✅ SEO metadata for About page
export const metadata = {
  title: "About Us | SmartGadget",
  description:
    "Learn more about SmartGadget, your trusted online store for quality electronics, jewelry, and fashion.",
  openGraph: {
    title: "About SmartGadget",
    description:
      "Discover our mission to provide quality products and excellent shopping experience across multiple categories.",
    url: "https://smartgadget.com/about",
    siteName: "SmartGadget",
    images: [
      {
        url: "https://smartgadget.com/about-og.jpg", // 🔄 replace with real image
        width: 1200,
        height: 630,
        alt: "About SmartGadget",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | SmartGadget",
    description:
      "Get to know SmartGadget — your destination for quality electronics, jewelry, and fashion.",
    images: ["https://smartgadget.com/about-og.jpg"], // 🔄 replace
  },
  alternates: {
    canonical: "https://smartgadget.com/about",
  },
};

const Page = () => {
  const articleData = {
    title: "About SmartGadget",
    description: "Learn more about SmartGadget, your trusted online store for quality electronics, jewelry, and fashion.",
    url: "https://smartgadget.com/about",
    datePublished: "2024-01-01T00:00:00Z",
    dateModified: new Date().toISOString(),
  };

  const faqData = [
    {
      question: "What is SmartGadget?",
      answer: "SmartGadget is your trusted source for expert reviews and comprehensive buying guides on the latest smart gadgets including drones, smartwatches, soundbars, cordless drills, and earbuds."
    },
    {
      question: "How do you review products?",
      answer: "We thoroughly test each product, analyze customer feedback, compare specifications, and evaluate value for money to provide honest, unbiased reviews."
    },
    {
      question: "Are your product links affiliate links?",
      answer: "Yes, we participate in the Amazon Services LLC Associates Program. When you purchase through our links, we may earn a commission at no extra cost to you."
    }
  ];

  return (
    <>
      <ArticleSchema article={articleData} />
      <FAQSchema faqs={faqData} />
      <AboutPage />
    </>
  );
};

export default Page;
