<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CarMakesController;  

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Categories and Makes (for dynamic menus and filters)
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/car-makes', [CarMakesController::class, 'index']);

/*
|--------------------------------------------------------------------------
| Authenticated User Routes
|--------------------------------------------------------------------------
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
*/

Route::middleware(['auth:sanctum', 'is_admin'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminController::class, 'index']);

    // Product Management
    Route::get('/products', [ProductController::class, 'adminIndex']);
    Route::post('/products', [ProductController::class, 'store']);
    Route::post('/products/bulk-actions', [ProductController::class, 'bulkActions']);
    Route::get('/products/{id}', [ProductController::class, 'adminShow']);
    Route::post('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Category Management
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

    // Car Make Management
    Route::post('/car-makes', [CarMakesController::class, 'store']);
    Route::put('/car-makes/{id}', [CarMakesController::class, 'update']);
    Route::delete('/car-makes/{id}', [CarMakesController::class, 'destroy']);

    // User Management
    Route::get('/users', [UserController::class, 'adminIndex']);
    Route::put('/users/{id}', [UserController::class, 'adminUpdate']);

    // Order Management
    Route::get('/orders', [OrderController::class, 'adminIndex']);
    Route::put('/orders/{id}', [OrderController::class, 'adminUpdate']);
});