# Simple Shopping Cart

A **simple e-commerce shopping cart system** built with **Laravel, React (Inertia), Tailwind CSS**, and **MySQL/MariaDB**.

This project allows users to browse products, add items to a cart, update quantities, remove items, and place orders. It also includes features like **low stock notifications** and **daily sales reports**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Database Migrations & Seeding](#database-migrations--seeding)
- [Queue & Scheduler](#queue--scheduler)
- [File Structure](#file-structure)
- [License](#license)

---

## Features

- User authentication (Laravel Breeze + React + Inertia)
- Browse products with stock display
- Add, update, and remove items from cart
- Checkout system with stock validation and order creation
- Low stock notification via email
- Daily sales report via scheduled email
- Responsive UI with Tailwind CSS
- Modern React-based frontend with toast notifications

---

## Tech Stack

- Backend: **Laravel 11+**
- Frontend: **React + Inertia.js + Tailwind CSS**
- Database: **MySQL / MariaDB**
- Mail: **SMTP** (Mailtrap for testing)
- Queue: **Laravel Queues (sync/local)**

---

## Requirements

- PHP 8.2+
- Composer
- Node.js & npm/yarn
- MySQL / MariaDB (XAMPP/LAMP/WAMP)
- Laravel CLI

---

## Installation

Clone the repository:

```bash
git clone https://github.com/kh-rony/test.git
cd test
```

Install PHP dependencies:

```bash
composer install
```

Install JS dependencies:

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

## Configuration

Database: Update `.env`:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=shopping_cart
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
```

Define `LOW_STOCK_THRESHOLD`:

```bash
LOW_STOCK_THRESHOLD=5
```

Admin email (receives notifications):

```bash
SHOP_ADMIN_EMAIL=your-email@example.com
```

## Database Migrations & Seeding

Run Migrations:

```bash
php artisan migrate
```

Seed products table (or any table separately):

```bash
php artisan db:seed --class=ProductSeeder
```

Verify tables:

`users`

`products`

`carts` + `cart_items`

`orders` + `order_items`

## Running the Project

Start the local server:

```bash
php artisan serve
```

Start the Vite dev server:

```bash
npm run dev
```

Open your browser at `http://127.0.0.1:8000`

## Queue & Scheduler

Start the queue worker (for low stock notification and other jobs):

```
php artisan queue:work
```

Run scheduled tasks manually:

```
php artisan schedule:run
```

## File Structure

`app/Models/` – Eloquent models (`User`, `Product`, `Cart`, `CartItem`, `Order`, `OrderItem`)

`app/Http/Controllers/` Controllers (`ProductController`, `CartController`, `OrderController`)

`app/Jobs/LowStockNotification.php` – Sends email when stock is low.

`app/Jobs/DailySalesReport.php` – Generates daily sales report email.

`resources/js/Pages/` – React pages (`Products/Index.jsx`, `Cart/Index.jsx`, `Orders/Index.jsx`)

`resources/views/emails/` – Blade templates for emails (`low-stock.blade.php`, `daily-sales-report.blade.php`)

`routes/web.php` – Web routes

`routes/console.php` – Scheduler tasks

## License

This project is open source and available under the MIT License.
