<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Store a newly created order in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $cart = $user->cart()->with('items.product')->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Your cart is empty'], 400);
        }

        $total = $cart->items->sum(fn ($item) => $item->product->price * $item->quantity);

        $order = Order::create([
            'user_id' => $user->id,
            'total' => $total,
            'status' => 'processing',
        ]);

        foreach ($cart->items as $item) {
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item->product_id,
                'name' => $item->product->name,
                'price' => $item->product->price,
                'quantity' => $item->quantity,
            ]);
        }

        $cart->items()->delete();

        return response()->json(['message' => 'Order placed successfully', 'order' => $order], 201);
    }

    /**
     * Display a list of orders for the authenticated user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $orders = $user->orders()->with('items')->get();

        return response()->json($orders);
    }

    /**
     * Display a list of all orders for the admin.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function adminIndex()
    {
        $orders = Order::with('user')->get();

        return response()->json($orders);
    }

    /**
     * Update the specified order by the admin.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function adminUpdate(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
            'tracking_number' => 'nullable|string',
        ]);

        $order = Order::findOrFail($id);
        $order->update($request->all());

        return response()->json($order);
    }
}