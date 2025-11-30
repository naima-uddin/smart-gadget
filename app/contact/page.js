// app/contact/page.tsx
import ContactPage from "@/page/ContactPage";
import { FAQSchema } from "@/components/FAQSchema";
import React from "react";

// ✅ SEO metadata for Contact page
export const metadata = {
  title: "Contact Us | SmartGadget",
  description:
    "Get in touch with SmartGadget. Have questions about our products or services? Contact us today for assistance.",
  openGraph: {
    title: "Contact SmartGadget",
    description:
      "Reach out to SmartGadget for inquiries, support, or collaboration. We're here to help with all your shopping needs.",
    url: "https://smartgadget.com/contact",
    siteName: "SmartGadget",
    images: [
      {
        url: "https://smartgadget.com/contact-og.jpg", // 🔄 replace with your image
        width: 1200,
        height: 630,
        alt: "Contact SmartGadget",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | SmartGadget",
    description:
      "Have questions or feedback? Get in touch with SmartGadget today.",
    images: ["https://smartgadget.com/contact-og.jpg"],
  },
  alternates: {
    canonical: "https://smartgadget.com/contact",
  },
};

export default function Page() {
  const contactFAQs = [
    {
      question: "How can I contact SmartGadget?",
      answer: "You can reach us via email at contact@smartgadget.com or call us at +1 (555) 123-4567. Our address is 123 Tech Street, San Francisco, CA 94102."
    },
    {
      question: "What are your business hours?",
      answer: "We respond to inquiries Monday through Friday, 9 AM to 5 PM PST."
    },
    {
      question: "Do you accept product review requests?",
      answer: "Yes, we accept product review requests. Please contact us with details about your product and we'll get back to you."
    }
  ];

  return (
    <>
      <FAQSchema faqs={contactFAQs} />
      <ContactPage />
    </>
  );
}
