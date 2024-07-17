# Street Heat - Documentation

https://streetheat.vercel.app/

## Purpose

Street Heat is a mock e-commerce store specializing in sneakers, designed to provide a comprehensive learning experience in building modern web applications. The project showcases various technologies and methodologies in web development, focusing on a seamless and responsive user experience.

## Key Features

- **Frontend**: Built with Next.js, TypeScript, and Tailwind CSS for a modern, responsive design.
- **State Management**: Uses Zustand for efficient and easy state management.
- **Authentication**: Custom User authentication system.
- **Cart Functionality**: Fully functional shopping cart.
- **Payment Processing**: Integrated with Stripe API for secure and reliable payment processing.
- **Search and Indexing**: Advanced search and indexing capabilities for easy product discovery.
- **Database**: Uses MongoDB for scalable and flexible data storage.
- **Backend**: Powered by Node.js and Express for robust backend operations.

## Code Structure

### ecommerce-backend

- **api**:
  - **controllers**: Contains business logic for handling requests.
    - `brandController.ts`: Handles operations related to brands.
    - `cartController.ts`: Manages cart operations.
    - `orderController.ts`: Manages order operations.
    - `paymentController.ts`: Handles payment processing.
    - `productControllers.ts`: Manages product operations.
    - `userController.ts`: Manages user operations.
    - `webhookControllers.ts`: Handles webhook events from external services.
  - **middleware**: Middleware functions for request processing.
    - `authMiddleware.ts`: Handles authentication.
    - `errorMiddleware.ts`: Manages error handling.
  - **models**: MongoDB models for data representation.
    - `Brand.ts`: Schema for brand data.
    - `Cart.ts`: Schema for cart data.
    - `Order.ts`: Schema for order data.
    - `Product.ts`: Schema for product data.
    - `User.ts`: Schema for user data.
  - **routes**: Defines API endpoints and maps them to controllers.
    - `brandRoutes.ts`: Routes for brand operations.
    - `cartRoutes.ts`: Routes for cart operations.
    - `orderRoutes.ts`: Routes for order operations.
    - `paymentRoutes.ts`: Routes for payment processing.
    - `productRoutes.ts`: Routes for product operations.
    - `userRoutes.ts`: Routes for user operations.
    - `webhookRoutes.ts`: Routes for webhook events.
  - **utils**: Utility functions.
    - `app.ts`: Main application setup.
    - `generateToken.ts`: Utility to generate authentication tokens.
    - `server.ts`: Server setup and configuration.
    - `index.ts`: Entry point for the backend application.

### ecommerce-frontend

- **app**:
  - **about**: About page components and logic.
  - **api**: API utilities.
  - **auth**: Authentication-related components and logic.
  - **brands**: Brand-specific components and logic.
  - **checkout**: Checkout page components and logic.
  - **create**: Components and logic for creating new entities (e.g., products).
  - **products**: Product listing and detail components.
  - **profile**: User profile components and logic.
  - **search**: Search page components and logic.
  - **success**: Success page components.
  - **globals.css**: Global CSS styles.
  - **layout.tsx**: Layout component for consistent page structure.
  - **page.tsx**: Main page component.
- **components**: Reusable UI components.
  - **profilePage**:
    - `About.tsx`: About page component.
    - `Cart.tsx`: Shopping cart component.
    - `CheckoutForm.tsx`: Checkout form component.
    - `createBrand.tsx`: Component to create a new brand.
    - `createProduct.tsx`: Component to create a new product.
    - `DoubleBanner.tsx`: Double banner component.
    - `DunksCarousel.tsx`: Carousel component for displaying Dunk sneakers.
    - `FeatureSection.tsx`: Section for featured products.
    - `Footer.tsx`: Footer component.
    - `HoverImageDisplay.tsx`: Component for displaying images on hover.
    - `Login.tsx`: Login component.
    - `Navbar.tsx`: Navigation bar component.
    - `NewArrivalsCarousel.tsx`: Carousel component for new arrivals.
    - `ProtectedRoute.tsx`: Component to protect routes that require authentication.
    - `Register.tsx`: Registration component.
    - `Showcase.tsx`: Showcase component.
    - `Testimonials.tsx`: Testimonials component.
- **context**: Context providers for state management.
  - `HoverImageContext.tsx`: Context for managing hover image state.
  - `useCartStore.ts`: Zustand store for cart state.
  - `userStore.ts`: Zustand store for user state.
- **hooks**: Custom React hooks.
  - `useBrands.ts`: Hook for brand-related logic.
  - `useCart.ts`: Hook for cart-related logic.
  - `useProduct.ts`: Hook for product-related logic.

## Models Structure

### Summary of Relationships

- **One-to-Many**:
  - A user can have many orders (User to Order).
  - A user can have many reviews (User to Review).
  - A product can have many reviews (Product to Review).
  - A category can have many products (Category to Product).
  - An order can have many order items (Order to OrderItem).
  - A cart can have many cart items (Cart to CartItem).

- **Many-to-One**:
  - An order belongs to one user (Order to User).
  - A review belongs to one user (Review to User).
  - A review belongs to one product (Review to Product).
  - A cart belongs to one user (Cart to User).

- **Many-to-Many (Indirectly through intermediate models like order items and cart items)**:
  - Users can order multiple products through orders.
  - Users can add multiple products to their cart.
  - Products can belong to multiple orders and carts.
