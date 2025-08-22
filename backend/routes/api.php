<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CarMakeController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\AnalyticsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- Public Routes ---
// These routes are accessible without authentication.

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Product routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/featured', [ProductController::class, 'featured']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/category/{categoryId}', [ProductController::class, 'byCategory']);
Route::get('/products/make/{makeId}', [ProductController::class, 'byCarMake']);

// Category routes
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

// Car Make routes
Route::get('/car-makes', [CarMakeController::class, 'index']);
Route::get('/car-makes/{id}', [CarMakeController::class, 'show']);

// Analytics (public events for guest users)
Route::post('/analytics/event', [AnalyticsController::class, 'logEvent']);

// --- Protected Routes ---
// These routes require authentication via Sanctum.
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Order routes
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);

    // Product likes
    Route::post('/products/{id}/like', [LikeController::class, 'toggleLike']);
    Route::get('/products/{id}/like-status', [LikeController::class, 'checkLikeStatus']);
    Route::get('/user/likes', [LikeController::class, 'getUserLikes']);

    // Admin-only routes (we'll create the middleware later)
    Route::middleware('admin')->group(function () {
        Route::get('/analytics/dashboard', [AnalyticsController::class, 'getDashboardData']);
        Route::get('/analytics/behavior', [AnalyticsController::class, 'getUserBehaviorPatterns']);
    });
});
