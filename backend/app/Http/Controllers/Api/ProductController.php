<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * @OA\Get(
     * path="/api/products",
     * summary="Get a list of all products",
     * tags={"Products"},
     * @OA\Response(
     * response=200,
     * description="Successful operation",
     * @OA\JsonContent(
     * type="array",
     * @OA\Items(ref="#/components/schemas/Product")
     * )
     * )
     * )
     */
    public function index()
    {
        return Product::all();
    }

    /**
     * @OA\Post(
     * path="/api/products/create",
     * summary="Create a new product",
     * tags={"Products (Admin)"},
     * security={{"cookieAuth":{}}},
     * @OA\RequestBody(
     * required=true,
     * description="Product data",
     * @OA\JsonContent(
     * required={"name", "sku", "category", "price", "stock"},
     * @OA\Property(property="name", type="string", example="New Engine Gasket"),
     * @OA\Property(property="sku", type="string", example="EG-001"),
     * @OA\Property(property="category", type="string", example="Engine Parts"),
     * @OA\Property(property="price", type="integer", example=15000),
     * @OA\Property(property="stock", type="integer", example=100),
     * @OA\Property(property="description", type="string", nullable=true, example="A high-quality gasket for Toyota engines.")
     * )
     * ),
     * @OA\Response(
     * response=201,
     * description="Product created successfully",
     * @OA\JsonContent(ref="#/components/schemas/Product")
     * ),
     * @OA\Response(response=401, description="Unauthenticated"),
     * @OA\Response(response=403, description="Forbidden (User is not an admin)"),
     * @OA\Response(response=422, description="Validation error")
     * )
     */
    public function store(StoreProductRequest $request)
    {
        $product = Product::create($request->validated());
        return response()->json($product, 201);
    }

    /**
     * @OA\Get(
     * path="/api/products/{product}",
     * summary="Get a single product by its ID",
     * tags={"Products"},
     * @OA\Parameter(
     * name="product",
     * in="path",
     * required=true,
     * description="ID of the product",
     * @OA\Schema(type="integer")
     * ),
     * @OA\Response(
     * response=200,
     * description="Successful operation",
     * @OA\JsonContent(ref="#/components/schemas/Product")
     * ),
     * @OA\Response(
     * response=404,
     * description="Product not found"
     * )
     * )
     */
    public function show(Product $product)
    {
        return $product;
    }

    /**
     * @OA\Put(
     * path="/api/products/{product}",
     * summary="Update an existing product",
     * tags={"Products (Admin)"},
     * security={{"cookieAuth":{}}},
     * @OA\Parameter(
     * name="product",
     * in="path",
     * required=true,
     * description="ID of the product to update",
     * @OA\Schema(type="integer")
     * ),
     * @OA\RequestBody(
     * required=true,
     * description="Product data to update",
     * @OA\JsonContent(ref="#/components/schemas/Product")
     * ),
     * @OA\Response(
     * response=200,
     * description="Product updated successfully",
     * @OA\JsonContent(ref="#/components/schemas/Product")
     * ),
     * @OA\Response(response=401, description="Unauthenticated"),
     * @OA\Response(response=403, description="Forbidden"),
     * @OA\Response(response=404, description="Product not found"),
     * @OA\Response(response=422, description="Validation error")
     * )
     */
    public function update(StoreProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        return response()->json($product);
    }

    /**
     * @OA\Delete(
     * path="/api/products/{product}",
     * summary="Delete a product",
     * tags={"Products (Admin)"},
     * security={{"cookieAuth":{}}},
     * @OA\Parameter(
     * name="product",
     * in="path",
     * required=true,
     * description="ID of the product to delete",
     * @OA\Schema(type="integer")
     * ),
     * @OA\Response(response=204, description="Product deleted successfully"),
     * @OA\Response(response=401, description="Unauthenticated"),
     * @OA\Response(response=403, description="Forbidden"),
     * @OA\Response(response=404, description="Product not found")
     * )
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->json(null, 204);
    }
}