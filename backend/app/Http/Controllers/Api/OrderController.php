<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('items.product')->latest()->get();
        return response()->json($orders);
    }

    public function show(Request $request, string $id)
    {
        $order = $request->user()->orders()->with('items.product')->findOrFail($id);
        return response()->json($order);
    }

    public function store(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string',
            'phone' => 'required|string',
            'cart' => 'required|array',
            'cart.*.id' => 'required|integer|exists:products,id',
            'cart.*.quantity' => 'required|integer|min:1',
        ]);

        $cartItems = $request->cart;
        $productIds = array_column($cartItems, 'id');
        $products = Product::find($productIds);

        $totalAmount = 0;
        foreach ($cartItems as $item) {
            $product = $products->find($item['id']);
            if ($product->stock_quantity < $item['quantity']) {
                return response()->json(['message' => 'Not enough stock for ' . $product->name], 400);
            }
            $totalAmount += $product->price * $item['quantity'];
        }

        $order = null;
        DB::transaction(function () use ($request, $totalAmount, $cartItems, $products, &$order) {
            $order = $request->user()->orders()->create([
                'total_amount' => $totalAmount,
                'shipping_address' => $request->shipping_address,
                'phone' => $request->phone,
            ]);

            foreach ($cartItems as $item) {
                $product = $products->find($item['id']);
                $order->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price' => $product->price,
                ]);
                $product->decrement('stock_quantity', $item['quantity']);
            }
        });

        // If the order was created successfully, return it.
        if ($order) {
            return response()->json($order->load('items.product'), 201);
        }

        // Otherwise, return a server error response.
        return response()->json(['message' => 'Failed to create order.'], 500);
    }
}
