# AutoParts TZ - Modern Overhaul

![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?style=for-the-badge&logo=laravel)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![MySQL](https://img.shields.io/badge/MySQL-blue?style=for-the-badge&logo=mysql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

Welcome to the modernized version of **AutoParts TZ**, a premier e-commerce platform for car parts and accessories in Tanzania. This project is an overhaul of the original PHP-based system, rebuilt with a modern, robust, and scalable architecture using Laravel for the backend and Next.js for the frontend.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Backend Setup (Laravel)](#1-backend-setup-laravel)
  - [Frontend Setup (Next.js)](#2-frontend-setup-nextjs)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

This project is built with a modern technology stack to ensure performance, scalability, and a great developer experience.

- **Backend:** [Laravel 12](https://laravel.com/)
- **Frontend:** [Next.js 14](https://nextjs.org/) (with App Router)
- **Database:** SQLite (for development) / MySQL (for production)
- **API:** RESTful API with [Laravel Sanctum](https://laravel.com/docs/sanctum) for authentication
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components

## Features

- **Product Catalog:** Browse a wide range of auto parts with detailed descriptions, images, and compatibility information.
- **Advanced Search:** Easily find parts by name, part number, or filter by car make and category.
- **User Authentication:** Secure user registration and login system with roles for customers and administrators.
- **Shopping Cart:** A fully functional shopping cart to add, update, and remove items.
- **Order Management:** A complete order processing workflow from checkout to delivery.
- **Admin Dashboard:** A powerful backend interface for managing products, categories, orders, and users.
- **RESTful API:** A well-structured API to connect the Laravel backend with the Next.js frontend.

## Project Structure

This project is organized as a monorepo with two main directories:

```
/
|-- /backend/       # The Laravel API
|-- /frontend/      # The Next.js web application
`-- README.md       # This file
```

## Getting Started

Follow these instructions to get both the backend and frontend running on your local machine for development and testing.

### 1. Backend Setup (Laravel)

**Prerequisites:** PHP >= 8.2, Composer, and a database (SQLite is recommended for ease of setup).

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install PHP dependencies:**
    ```bash
    composer install
    ```

3.  **Create your environment file:**
    Copy the example environment file.
    ```bash
    cp .env.example .env
    ```

4.  **Generate an application key:**
    ```bash
    php artisan key:generate
    ```

5.  **Configure your database:**
    Open the `.env` file and set up your database connection. For SQLite, simply ensure the following line is present and the other `DB_*` variables are removed or commented out:
    ```env
    DB_CONNECTION=sqlite
    ```

6.  **Run the database migrations and seed the data:**
    This command will create all the necessary tables and populate them with the initial data.
    ```bash
    php artisan migrate --seed
    ```

7.  **Start the development server:**
    ```bash
    php artisan serve
    ```
    The backend API will now be running at `http://127.0.0.1:8000`.

### 2. Frontend Setup (Next.js)

**Prerequisites:** Node.js >= 18.17 and npm or yarn.

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```

3.  **Create your environment file:**
    Create a new file named `.env.local` in the `frontend` directory and add the following line to tell your Next.js app where to find the Laravel API:
    ```env
    NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The frontend application will now be running at `http://localhost:3000`.

You should now have the full application running locally! 🎉

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

