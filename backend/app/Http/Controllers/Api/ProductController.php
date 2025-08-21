<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category')->latest()->paginate(12);
        return response()->json($products);
    }

    public function show(string $id)
    {
        $product = Product::with('category', 'carModels.make')->findOrFail($id);
        return response()->json($product);
    }
}
