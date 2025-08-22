<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\ProductLike;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class LikeController extends Controller
{
    /**
     * Toggle like status for a product.
     */
    public function toggleLike(Request $request, $productId): JsonResponse
    {
        try {
            $user = $request->user();
            $product = Product::findOrFail($productId);

            $existingLike = ProductLike::where('user_id', $user->id)
                ->where('product_id', $product->id)
                ->first();

            if ($existingLike) {
                // Unlike the product
                $existingLike->delete();
                
                return response()->json([
                    'message' => 'Product unliked successfully',
                    'liked' => false,
                    'likes_count' => $product->likes()->count()
                ], 200);
            } else {
                // Like the product
                ProductLike::create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                ]);

                return response()->json([
                    'message' => 'Product liked successfully',
                    'liked' => true,
                    'likes_count' => $product->likes()->count()
                ], 201);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while processing your request',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user's liked products.
     */
    public function getUserLikes(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            $likedProducts = $user->likedProducts()
                ->with(['category', 'carModels.make'])
                ->paginate(12);

            return response()->json($likedProducts, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while fetching liked products',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check if user has liked a specific product.
     */
    public function checkLikeStatus(Request $request, $productId): JsonResponse
    {
        try {
            $user = $request->user();
            $product = Product::findOrFail($productId);
            
            $isLiked = $product->isLikedBy($user->id);
            $likesCount = $product->likes()->count();

            return response()->json([
                'liked' => $isLiked,
                'likes_count' => $likesCount
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while checking like status',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
