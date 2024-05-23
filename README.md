# eccom

Models structure
Summary of Relationships

One-to-Many:
A user can have many orders (User to Order).
A user can have many reviews (User to Review).
A product can have many reviews (Product to Review).
A category can have many products (Category to Product).
An order can have many order items (Order to OrderItem).
A cart can have many cart items (Cart to CartItem).

Many-to-One:
An order belongs to one user (Order to User).
A review belongs to one user (Review to User).
A review belongs to one product (Review to Product).
A cart belongs to one user (Cart to User).

Many-to-Many (Indirectly through intermediate models like order items and cart items):
Users can order multiple products through orders.
Users can add multiple products to their cart.
Products can belong to multiple orders and carts.
