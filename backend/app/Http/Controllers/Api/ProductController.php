<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProductController extends Controller
{
    /**
     * Get paginated list of products.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Product::with(['category', 'carModels.make'])
                ->withCount('likes');

            // Filter by category
            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            // Filter by car make
            if ($request->has('make_id')) {
                $query->whereHas('carModels.make', function ($q) use ($request) {
                    $q->where('id', $request->make_id);
                });
            }

            // Search by name or part number
            if ($request->has('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('part_number', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            }

            // Filter by featured products
            if ($request->has('featured') && $request->featured) {
                $query->featured();
            }

            // Filter by in stock
            if ($request->has('in_stock') && $request->in_stock) {
                $query->inStock();
            }

            // Sort options
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            
            if (in_array($sortBy, ['name', 'price', 'created_at', 'likes_count'])) {
                $query->orderBy($sortBy, $sortOrder);
            }

            $products = $query->paginate($request->get('per_page', 12));

            // Add like status for authenticated users
            if ($request->user()) {
                $products->getCollection()->transform(function ($product) use ($request) {
                    $product->is_liked = $product->isLikedBy($request->user()->id);
                    return $product;
                });
            }

            return response()->json($products, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching products',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get a specific product by ID.
     */
    public function show(Request $request, string $id): JsonResponse
    {
        try {
            $product = Product::with(['category', 'carModels.make'])
                ->withCount('likes')
                ->findOrFail($id);

            // Add like status for authenticated users
            if ($request->user()) {
                $product->is_liked = $product->isLikedBy($request->user()->id);
            }

            return response()->json($product, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Product not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Get featured products.
     */
    public function featured(Request $request): JsonResponse
    {
        try {
            $products = Product::with(['category', 'carModels.make'])
                ->withCount('likes')
                ->featured()
                ->inStock()
                ->limit($request->get('limit', 8))
                ->get();

            // Add like status for authenticated users
            if ($request->user()) {
                $products->transform(function ($product) use ($request) {
                    $product->is_liked = $product->isLikedBy($request->user()->id);
                    return $product;
                });
            }

            return response()->json($products, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching featured products',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get products by category.
     */
    public function byCategory(Request $request, string $categoryId): JsonResponse
    {
        try {
            $products = Product::with(['category', 'carModels.make'])
                ->withCount('likes')
                ->where('category_id', $categoryId)
                ->inStock()
                ->paginate($request->get('per_page', 12));

            // Add like status for authenticated users
            if ($request->user()) {
                $products->getCollection()->transform(function ($product) use ($request) {
                    $product->is_liked = $product->isLikedBy($request->user()->id);
                    return $product;
                });
            }

            return response()->json($products, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching products by category',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get products compatible with a specific car make.
     */
    public function byCarMake(Request $request, string $makeId): JsonResponse
    {
        try {
            $products = Product::with(['category', 'carModels.make'])
                ->withCount('likes')
                ->whereHas('carModels.make', function ($query) use ($makeId) {
                    $query->where('id', $makeId);
                })
                ->inStock()
                ->paginate($request->get('per_page', 12));

            // Add like status for authenticated users
            if ($request->user()) {
                $products->getCollection()->transform(function ($product) use ($request) {
                    $product->is_liked = $product->isLikedBy($request->user()->id);
                    return $product;
                });
            }

            return response()->json($products, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching products by car make',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
