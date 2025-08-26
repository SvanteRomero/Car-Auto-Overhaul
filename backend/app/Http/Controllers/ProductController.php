<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    /**
     * Display a paginated list of products for the public catalog.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $query = Product::where('status', 'active');

        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('sku', 'like', "%{$searchTerm}%");
        }

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->has('make')) {
            // Updated to use the new relationship
            $query->whereHas('carMakes', function ($q) use ($request) {
                $q->where('slug', $request->input('make'));
            });
        }

        if ($request->has('price_range')) {
            $priceRange = explode(',', $request->input('price_range'));
            $query->whereBetween('price', [$priceRange[0], $priceRange[1]]);
        }

        if ($request->has('sort_by')) {
            switch ($request->input('sort_by')) {
                case 'price-low':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price-high':
                    $query->orderBy('price', 'desc');
                    break;
                case 'rating':
                    $query->orderBy('rating', 'desc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
                    break;
            }
        }

        $products = $query->paginate(9);

        return response()->json($products);
    }

    /**
     * Display the specified product.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $product = Product::with('carMakes')->where('status', 'active')->findOrFail($id);

        return response()->json($product);
    }

    /**
     * Get a list of all unique categories.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function categories()
    {
        $categories = Product::distinct('category')->pluck('category');

        return response()->json($categories);
    }

    /**
     * Get a list of all unique car makes.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function makes()
    {
        $makes = Product::distinct('compatible_makes')->pluck('compatible_makes');
        $uniqueMakes = collect($makes)->flatten()->unique()->values();

        return response()->json($uniqueMakes);
    }

    /**
     * Display a list of all products for admin management.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function adminIndex(Request $request)
    {
        $query = Product::with('carMakes');

        if ($request->has('search')) {
            $searchTerm = $request->input('search');
            $query->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('sku', 'like', "%{$searchTerm}%");
        }

        if ($request->has('category')) {
            $query->where('category', $request->input('category'));
        }

        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }

        if ($request->has('sort_by')) {
            switch ($request->input('sort_by')) {
                case 'name':
                    $query->orderBy('name');
                    break;
                case 'price':
                    $query->orderBy('price');
                    break;
                case 'stock':
                    $query->orderBy('stock');
                    break;
                case 'created':
                    $query->orderBy('created_at', 'desc');
                    break;
            }
        }

        $products = $query->get();

        return response()->json($products);
    }

    /**
     * Store a newly created product.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products,sku',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'status' => ['required', Rule::in(['active', 'inactive'])],
            'description' => 'nullable|string',
            'specifications' => 'nullable|array',
            'car_make_ids' => 'nullable|array',
            'car_make_ids.*' => 'exists:car_makes,id',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:5120',
        ]);

        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $images[] = Storage::url($path);
            }
        }

        $product = Product::create(array_merge($request->except('car_make_ids'), ['images' => $images]));
        $product->carMakes()->sync($request->input('car_make_ids'));

        return response()->json($product, 201);
    }

    /**
     * Update the specified product.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'sku' => 'required|string|unique:products,sku,' . $product->id,
            'category' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'status' => ['required', Rule::in(['active', 'inactive'])],
            'description' => 'nullable|string',
            'specifications' => 'nullable|array',
            'car_make_ids' => 'nullable|array',
            'car_make_ids.*' => 'exists:car_makes,id',
            'images' => 'nullable|array', 
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:5120',
        ]);

        $images = $product->images;
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                $images[] = Storage::url($path);
            }
        }

        $product->update(array_merge($request->except('car_make_ids', 'images'), ['images' => $images]));
        $product->carMakes()->sync($request->input('car_make_ids'));

        return response()->json($product);
    }

    /**
     * Remove the specified product.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(null, 204);
    }

    /**
     * Handle bulk actions for products.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function bulkActions(Request $request)
    {
        $request->validate([
            'action' => ['required', Rule::in(['activate', 'deactivate', 'delete'])],
            'product_ids' => 'required|array',
            'product_ids.*' => 'exists:products,id',
        ]);

        $action = $request->input('action');
        $productIds = $request->input('product_ids');

        if ($action === 'delete') {
            Product::whereIn('id', $productIds)->delete();
        } else {
            $status = $action === 'activate' ? 'active' : 'inactive';
            Product::whereIn('id', $productIds)->update(['status' => $status]);
        }

        return response()->json(['message' => 'Bulk action completed successfully']);
    }
}