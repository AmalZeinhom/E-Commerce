# E-Commerce Frontend Application

## Project Overview

### Problem

Building a scalable and user-friendly e-commerce application requires handling multiple complex flows such as authentication, product browsing, cart management, and order processing. The challenge is maintaining clean state management and smooth user experience while integrating real backend APIs.

### Solution

This project is a React-based e-commerce frontend that delivers a complete shopping experience, including authentication, product management, cart operations, and order handling. It focuses on clean architecture, modular design, and real API integration.

---

## Live Demo

https://AmalZeinhom.github.io/E-Commerce

---

## Tech Stack

* **Frontend Framework**: React 19
* **Build Tool**: Vite
* **Routing**: React Router DOM
* **State Management**: React Context API
* **Styling**: Bootstrap 5
* **Forms & Validation**: Formik + Yup
* **HTTP Client**: Axios
* **Animations**: Framer Motion
* **UI Enhancements**: React Hot Toast, React Loading Skeleton
* **Deployment**: GitHub Pages

---

## Architecture Decisions

* **Component-Based Architecture**
  The application is structured into reusable components (Navbar, Cards, Layout, etc.) to ensure scalability and maintainability.

* **State Management (Context API)**
  Context API is used for managing global states such as authentication, cart, and wishlist.
  It was chosen for simplicity and faster development since the application does not require complex state normalization.

* **Routing Strategy**
  Hash-based routing is used to ensure compatibility with GitHub Pages deployment.

* **Authentication Handling**
  Token-based authentication is implemented using localStorage, with protected routes controlling access to authenticated pages.

* **API Integration**
  Axios is configured centrally to handle all API requests, ensuring consistent error handling and request structure.

* **Styling Approach**
  Bootstrap is used for responsive layout and UI consistency, enabling faster development without overcomplicating styling.

---

## Data Flow

1. **Authentication**
   User credentials → API request → Token stored in localStorage → AuthContext updates → Protected routes enabled

2. **Product Browsing**
   Page load → Fetch products from API → Store in state → Render UI

3. **Cart Management**
   User action → API request → CartContext updates → UI re-renders with updated data

4. **Wishlist Management**
   Similar flow to cart using a separate context for better separation of concerns

5. **Checkout Process**
   Cart data → Order API request → Confirmation → Cart reset

---

## Technical Highlights

* Implemented token-based authentication with protected routes
* Centralized API handling using Axios instance
* Managed cart and wishlist with real-time UI updates
* Structured modular architecture for scalability
* Built reusable components to reduce duplication
* Handled loading and error states for better UX

---

## Key Features

* User authentication (login, signup, forgot password, OTP verification)
* Product listing with search and filtering
* Categories and brands browsing
* Shopping cart with quantity control
* Wishlist functionality
* Product details view
* Order management
* Responsive design across devices
* Loading states and error handling
* Toast notifications for feedback

---

## Performance Optimization

* Efficient state updates using Context API
* Skeleton loaders to improve perceived performance
* API request handling with minimized unnecessary calls
* Route-based code splitting via React Router
* Optimized rendering to avoid unnecessary re-renders

---

## Folder Structure

```
src/
├── Components/          # Reusable UI components
├── Context/             # Global state management
├── Pages/               # Main application pages
├── Protected/           # Route guards
└── SubPages/            # Feature-specific pages
```

---

## Installation

```bash
npm install
npm run dev
```

---

## Limitations

* Context API may not scale well for large applications
* No advanced caching or state persistence strategy
* No payment gateway integration
* Performance optimizations can be improved further

---

## Future Improvements

* Migrate to Redux Toolkit or Zustand for better scalability
* Implement lazy loading for better performance
* Add unit and integration testing
* Integrate payment gateway
* Add product reviews and ratings
* Improve filtering and sorting logic
* Optimize for Core Web Vitals

---
