<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
|
| These routes are accessible to all users, whether they are authenticated or not.
|
*/

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Categories and Makes (for dynamic menus and filters)
Route::get('/categories', [ProductController::class, 'categories']);
Route::get('/makes', [ProductController::class, 'makes']);

/*
|--------------------------------------------------------------------------
| Authenticated User Routes
|--------------------------------------------------------------------------
|
| These routes require the user to be authenticated with a Sanctum token.
|
*/

Route::middleware('auth:sanctum')->group(function () {
    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // User Profile
    Route::get('/user/profile', [UserController::class, 'show']);
    Route::put('/user/profile', [UserController::class, 'update']);

    // Shopping Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::put('/cart/update/{id}', [CartController::class, 'update']);
    Route::delete('/cart/remove/{id}', [CartController::class, 'remove']);

    // Orders and Checkout
    Route::post('/checkout', [OrderController::class, 'store']);
    Route::get('/user/orders', [OrderController::class, 'index']);
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| These routes are for administrators only and are protected by authentication
| and the `is_admin` middleware.
|
*/

Route::middleware(['auth:sanctum', 'is_admin'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminController::class, 'index']);

    // Product Management
    Route::get('/products', [ProductController::class, 'adminIndex']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/products/bulk-actions', [ProductController::class, 'bulkActions']);
    Route::get('/products/{id}', [ProductController::class, 'adminShow']);
    Route::post('/products/{id}', [ProductController::class, 'update']); // Using POST for file uploads
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // User Management
    Route::get('/users', [UserController::class, 'adminIndex']);
    Route::put('/users/{id}', [UserController::class, 'adminUpdate']);

    // Order Management
    Route::get('/orders', [OrderController::class, 'adminIndex']);
    Route::put('/orders/{id}', [OrderController::class, 'adminUpdate']);
});