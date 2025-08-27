<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    /**
     * Get the authenticated user's cart.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $cart = $user->cart()->with('items.product')->firstOrCreate();
        return response()->json($cart->items);
    }

    /**
     * Add a product to the cart.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::findOrFail($request->product_id);

        // Use a database transaction to ensure data integrity
        return DB::transaction(function () use ($request, $product) {
            // Check if there is enough stock
            if ($product->stock < $request->quantity) {
                return response()->json(['message' => 'Not enough stock available.'], 400);
            }

            /** @var \App\Models\User $user */
            $user = Auth::user();
            $cart = $user->cart()->firstOrCreate();

            $cartItem = CartItem::where('cart_id', $cart->id)
                ->where('product_id', $request->product_id)
                ->first();

            if ($cartItem) {
                $cartItem->quantity += $request->quantity;
                $cartItem->reserved_at = now(); // Refresh the reservation time
                $cartItem->save();
            } else {
                $cartItem = $cart->items()->create([
                    'product_id' => $request->product_id,
                    'quantity' => $request->quantity,
                    'reserved_at' => now(), // Set the reservation time
                ]);
            }

            // Decrement the product's stock
            $product->decrement('stock', $request->quantity);

            return response()->json($cartItem, 201);
        });
    }

    /**
     * Update the quantity of a product in the cart.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        /** @var \App\Models\User $user */
        $user = Auth::user();
        $cart = $user->cart()->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        $cartItem = $cart->items()->findOrFail($id);
        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json($cartItem);
    }

    /**
     * Remove a product from the cart.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function remove(Request $request, $id)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $cart = $user->cart()->first();

        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        $cartItem = $cart->items()->findOrFail($id);
        $cartItem->delete();

        return response()->json(null, 204);
    }

    
}