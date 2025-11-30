// app/privacy-policy/page.tsx
import PrivacyPolicy from "@/page/PrivacyPolicy";
import { ArticleSchema } from "@/components/FAQSchema";
import React from "react";

// ✅ SEO metadata for Privacy Policy page
export const metadata = {
  title: "Privacy Policy | SmartGadget",
  description:
    "Read SmartGadget's Privacy Policy to understand how we collect, use, and protect your information when you browse our online store.",
  openGraph: {
    title: "Privacy Policy | SmartGadget",
    description:
      "Learn how SmartGadget protects your privacy and handles your data in compliance with global standards.",
    url: "https://smartgadget.com/privacy-policy",
    siteName: "SmartGadget",
    images: [
      {
        url: "https://smartgadget.com/privacy-og.jpg", // 🔄 replace with your image
        width: 1200,
        height: 630,
        alt: "Privacy Policy - SmartGadget",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | SmartGadget",
    description:
      "Understand SmartGadget’s data collection and usage practices by reading our Privacy Policy.",
    images: ["https://smartgadget.com/privacy-og.jpg"],
  },
  alternates: {
    canonical: "https://smartgadget.com/privacy-policy",
  },
};

const Page = () => {
  const articleData = {
    title: "Privacy Policy | SmartGadget",
    description: "Read SmartGadget's Privacy Policy to understand how we collect, use, and protect your information.",
    url: "https://smartgadget.com/privacy-policy",
    datePublished: "2024-01-01T00:00:00Z",
    dateModified: new Date().toISOString(),
  };

  return (
    <>
      <ArticleSchema article={articleData} />
      <PrivacyPolicy />
    </>
  );
};

export default Page;
