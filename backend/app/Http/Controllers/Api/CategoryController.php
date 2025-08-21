<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::withCount('products')->orderBy('name')->get();
    }

    public function show(string $id)
    {
        return Category::with('products')->findOrFail($id);
    }
}
