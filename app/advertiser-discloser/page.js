// app/amazon-affiliate-advertiser-disclosure/page.tsx
import AmazonAffiliateAdvertiserDisclosure from "@/page/AmazonAffiliateAdvertiserDisclosure";
import { ArticleSchema } from "@/components/FAQSchema";
import React from "react";

// ✅ SEO metadata for Affiliate Disclosure page
export const metadata = {
  title: "Amazon Affiliate Disclosure | SmartGadget",
  description:
    "SmartGadget participates in the Amazon Services LLC Associates Program. Learn more about our affiliate disclosure and how we earn commissions.",
  openGraph: {
    title: "Amazon Affiliate Disclosure | SmartGadget",
    description:
      "Transparency matters. Read our Amazon Affiliate Disclosure to understand how SmartGadget earns commissions from qualifying purchases.",
    url: "https://smartgadget.com/amazon-affiliate-advertiser-disclosure",
    siteName: "SmartGadget",
    images: [
      {
        url: "https://smartgadget.com/affiliate-og.jpg", // 🔄 replace with your image
        width: 1200,
        height: 630,
        alt: "Amazon Affiliate Disclosure - SmartGadget",
      },
    ],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amazon Affiliate Disclosure | SmartGadget",
    description:
      "SmartGadget is part of the Amazon Associates Program. Learn about our affiliate disclosure and commissions policy.",
    images: ["https://smartgadget.com/affiliate-og.jpg"],
  },
  alternates: {
    canonical: "https://smartgadget.com/amazon-affiliate-advertiser-disclosure",
  },
};

export default function Page() {
  const articleData = {
    title: "Amazon Affiliate Disclosure | SmartGadget",
    description: "SmartGadget participates in the Amazon Services LLC Associates Program. Learn more about our affiliate disclosure.",
    url: "https://smartgadget.com/advertiser-discloser",
    datePublished: "2024-01-01T00:00:00Z",
    dateModified: new Date().toISOString(),
  };

  return (
    <>
      <ArticleSchema article={articleData} />
      <AmazonAffiliateAdvertiserDisclosure />
    </>
  );
}
