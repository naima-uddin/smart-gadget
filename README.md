# 🛒 Best Smart Gadget

A modern e-commerce platform built with Next.js 15, showcasing quality products across Electronics, Jewelry, and Fashion categories. This application integrates with the Fake Store API to provide a seamless shopping experience with product listings, detailed views, and category browsing.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **📱 Product Categories**: Electronics, Jewelry, Men's Clothing, Women's Clothing
- **⭐ Product Reviews**: Detailed reviews with ratings and customer feedback
- **🔍 Advanced Filtering**: Filter products by category, price, rating, and brand
- **📊 Comprehensive Specs**: Detailed technical specifications for each product
- **🎨 Modern UI/UX**: Built with Tailwind CSS and Material-UI components
- **🚀 Fast Performance**: Optimized with Next.js 15 and Turbopack
- **📱 Responsive Design**: Mobile-first approach for all devices
- **🔗 Amazon Affiliate**: Direct purchase links to Amazon products
- **🎯 SEO Optimized**: Structured data, sitemaps, and robots.txt
- **💳 Coupon System**: Promotional codes and special offers

## 🎨 Color Palette

- **Primary**: `#7c3aed` (Purple)
- **Secondary**: `#06b6d4` (Cyan)
- **Background**: `#fafafa` (White)
- **Text**: `#374151` (Dark Gray)
- **Accent**: `#f59e0b` (Amber)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/naima-uddin/smart.gadget.git
cd smart.gadget
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## 📂 Project Structure

```
best-smart-gadget/
├── app/
│   ├── about/              # About page
│   ├── advertiser-discloser/  # Disclosure page
│   ├── category/           # Category pages
│   │   └── [category]/     # Dynamic category routes
│   │       └── [id]/       # Product detail pages
│   ├── contact/            # Contact page
│   ├── privacy-policy/     # Privacy policy
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout
│   ├── page.js             # Homepage
│   ├── robots.js           # Robots.txt configuration
│   └── sitemap.js          # Sitemap configuration
├── components/
│   ├── home-component/     # Homepage components
│   │   ├── CategoryGrid.jsx
│   │   ├── FeaturedProducts.jsx
│   │   ├── hero-section.jsx
│   │   ├── Reviews.jsx
│   │   └── ServicesSlider.jsx
│   ├── shared/             # Shared components
│   │   ├── BreadcrumbStructuredData.jsx
│   │   ├── Footer.jsx
│   │   ├── header.jsx
│   │   └── Logo.jsx
│   ├── ui/                 # UI components
│   │   ├── Button.jsx
│   │   └── input.jsx
│   ├── CouponPopup.jsx
│   └── StructuredData.jsx
├── data/
│   ├── couponData.json     # Coupon codes
│   ├── featureProducts.json # Featured products
│   ├── products.json       # Complete product catalog
│   └── testimonials.json   # Customer testimonials
├── page/
│   ├── AboutPage.jsx
│   ├── AmazonAffiliateAdvertiserDisclosure.jsx
│   ├── ContactPage.jsx
│   ├── DynamicPage.jsx
│   ├── PrivacyPolicy.jsx
│   └── ProductDetailPage.jsx
└── public/
    ├── category-banner/    # Category banner images
    ├── hero-img/           # Hero section images
    └── images/             # Product images
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 15.5.4](https://nextjs.org/)
- **React**: 19.1.0
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **UI Components**: [Material-UI 7.3.2](https://mui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [Fake Store API](https://fakestoreapi.com/)
- **Build Tool**: Turbopack
- **Linting**: ESLint

## 📦 Product Categories

1. **Electronics** - Latest tech devices and gadgets
2. **Jewelry** - Fine jewelry and accessories
3. **Men's Clothing** - Fashion and apparel for men
4. **Women's Clothing** - Fashion and apparel for women

## 🔗 Key Pages

- **Homepage**: Featured products, categories, and reviews
- **Category Pages**: Filtered product listings by category
- **Product Detail Pages**: Comprehensive product information, specs, and reviews
- **About**: Company information and mission
- **Contact**: Contact form and information
- **Privacy Policy**: Data protection and privacy information
- **Advertiser Disclosure**: Amazon affiliate disclosure

## 🎯 SEO Features

- Dynamic sitemap generation
- Robots.txt configuration
- Structured data (JSON-LD) for products and breadcrumbs
- Meta tags optimization
- Open Graph tags for social sharing

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any inquiries, please visit the [contact page](https://yourwebsite.com/contact).

## 🔗 Links

- **Repository**: [https://github.com/naima-uddin/smart.gadget](https://github.com/naima-uddin/smart.gadget)
- **Live Demo**: Coming soon

---

Made with ❤️ using Next.js and Tailwind CSS