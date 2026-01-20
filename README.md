# Aotearoa Adventure Gear

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> A modern, responsive e-commerce prototype for outdoor adventure gear, developed as part of BIT703 Assessment 2.

![Aotearoa Adventure Gear Banner](src/images/banners/banner_newsletter.png)

---

## Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Technologies Used](#-technologies-used)
- [Getting Started](#-getting-started)
- [Pages](#-pages)
- [Form Validation](#-form-validation)
- [Accessibility](#-accessibility)
- [Documentation](#-documentation)
- [Author](#-author)

---

## Overview

Aotearoa Adventure Gear is a fully functional e-commerce prototype showcasing best practices in modern web development. The project demonstrates a complete shopping experience from product browsing to checkout, with robust form validation and responsive design.

### Assessment Tasks Completed

| Task | Description | Status |
|------|-------------|--------|
| Task 1 | HTML/CSS Implementation with Semantic Markup | Complete |
| Task 2 | JavaScript Functionality (Cart, Shipping, Countdown) | Complete |
| Task 3 | Form Validation & Error Handling | Complete |

---

## ✨ Features

### User Interface
- Clean, modern design with consistent branding
- Fully responsive layout (mobile, tablet, desktop)
- Dark green theme inspired by New Zealand's natural landscape
- Smooth animations and transitions (AOS library)
- Interactive product carousel (Swiper.js)

### E-Commerce Functionality
- Dynamic shopping cart with quantity management
- Real-time price calculations (subtotal, taxes, shipping)
- Multiple shipping options with automatic free shipping over $600
- Complete checkout flow (Cart → Shipping → Payment)
- Countdown timer for promotional offers

### Form Validation
- HTML5 native validation attributes
- JavaScript validation for enhanced security
- Country-specific validation (NZ, AU, US postal codes & phone numbers)
- Credit card validation with Luhn algorithm
- Accessible error messages with ARIA support

---

## Project Structure

```
assessment2/
├── index.html              # Home page with featured products
├── about.html              # About the company
├── shop.html               # Product catalog with newsletter
├── product-detail.html     # Individual product view
├── cart.html               # Shopping cart
├── shipping.html           # Shipping details form
├── payment.html            # Payment method selection
├── help.html               # FAQ and support
│
├── css/
│   ├── tailwind.css        # Compiled Tailwind CSS
│   ├── custom-home.css     # Home page styles
│   ├── custom-shop.css     # Shop page styles
│   ├── custom-cart.css     # Cart page styles
│   ├── custom-shipping.css # Shipping page styles
│   ├── custom-payment.css  # Payment page styles
│   ├── custom-product.css  # Product detail styles
│   ├── custom-about.css    # About page styles
│   └── custom-help.css     # Help page styles
│
├── js/
│   ├── common.js           # Shared utilities & constants
│   ├── home.js             # Home page functionality
│   ├── cart.js             # Cart calculations
│   ├── shipping.js         # Shipping logic & free shipping rule
│   ├── payment.js          # Payment form handling
│   └── validation.js       # Form validation module
│
├── src/
│   ├── tailwind-input.css  # Tailwind source file
│   └── images/
│       ├── logo.png        # Site logo
│       ├── banners/        # Promotional banners
│       ├── categories/     # Category images
│       └── products/       # Product images
│
│
├── tailwind.config.js      # Tailwind configuration
├── package.json            # Project dependencies
└── README.md               # This file
```

---

## Technologies Used

### Core Technologies
| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | - | Semantic markup & structure |
| CSS3 | - | Styling & animations |
| JavaScript | ES6+ | Interactivity & validation |
| Tailwind CSS | 3.x | Utility-first CSS framework |

### Libraries
| Library | Purpose |
|---------|---------|
| [Swiper.js](https://swiperjs.com/) | Product carousel/slider |
| [AOS](https://michalsnik.github.io/aos/) | Scroll animations |
| [Floating UI](https://floating-ui.com/) | Tooltip positioning |

### Development Tools
- Node.js & npm for package management
- Tailwind CLI for CSS compilation
- Git for version control

---

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/JorgeGdev/BIT703_Assessment_2.git
   cd BIT703_Assessment_2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build Tailwind CSS** (if making changes)
   ```bash
   npx tailwindcss -i ./src/tailwind-input.css -o ./css/tailwind.css --watch
   ```

4. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server like Live Server (VS Code extension)

---

## Pages

### Home Page (`index.html`)
- Hero section with promotional images
- Featured products carousel
- Category highlights
- Countdown timer for special offers

### Shop Page (`shop.html`)
- Product search functionality
- Category filtering
- Product grid display
- Newsletter subscription form

### Cart Page (`cart.html`)
- Product listing with images
- Quantity selection
- Dynamic price calculation
- Order summary

### Shipping Page (`shipping.html`)
- Customer information form
- Address fields with validation
- Country-specific postal code validation
- Shipping method selection
- Automatic free shipping for orders over $600

### Payment Page (`payment.html`)
- Credit card payment option
- PayPal payment option
- Card number formatting & validation
- Expiry date validation (future dates only)
- CVV validation
- Order confirmation modal

---

## Form Validation

### HTML5 Validation Features
- `required` - Mandatory field enforcement
- `pattern` - Regular expression validation
- `minlength` / `maxlength` - Character limits
- `type="email"` / `type="tel"` - Semantic input types

### JavaScript Validation
- **Email**: RFC 5322 compliant pattern matching
- **Postal Codes**: Country-specific formats
  - 🇳🇿 New Zealand: 4 digits (e.g., 1010)
  - 🇦🇺 Australia: 4 digits
  - 🇺🇸 United States: 5 or 9 digits (ZIP+4)
- **Phone Numbers**: Country-specific formats
- **Credit Cards**: Luhn algorithm validation
- **Expiry Dates**: Future date validation
- **CVV**: 3-4 digit validation

### Error Handling
- Real-time validation feedback
- Clear, accessible error messages
- Focus management for invalid fields
- Visual state indicators (red for error, green for success)

---

## Accessibility

This project follows WCAG 2.1 guidelines:

- Semantic HTML structure
- ARIA labels and attributes
- Keyboard navigation support
- Focus visible indicators
- Screen reader compatible error messages
- Sufficient colour contrast
- Skip navigation links
- Alt text for all images

---

## Documentation

Detailed documentation is available in the `docs/` folder:

| Document | Description |
|----------|-------------|
| [countdown-timer-implementation.md](docs/countdown-timer-implementation.md) | Countdown timer feature documentation |
| [javascript-validation-justification.md](docs/javascript-validation-justification.md) | JavaScript implementation rationale |
| [form-validation-implementation.md](docs/form-validation-implementation.md) | Complete validation system documentation |
| [task3-justification.md](docs/task3-justification.md) | Task 3 technology choices report |

---

## Author

**Jorge Guerrero**

- GitHub: [@JorgeGdev](https://github.com/JorgeGdev)
- Course: BIT703 - Web Development
- Open Polytechnic of New Zealand

---

## License

This project is developed for educational purposes as part of BIT703 Assessment 2.

---

<div align="center">

**Made with ❤️ in Tauranga NZ**

</div>
