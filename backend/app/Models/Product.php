<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sku',
        'category_id',
        'price',
        'original_price',
        'stock',
        'status',
        'description',
        'specifications',
        'images',
        'rating',
        'reviews',
    ];

    protected $casts = [
        'price' => 'integer',
        'original_price' => 'integer',
        'stock' => 'integer',
        'images' => 'json',
        'specifications' => 'json',
        'rating' => 'float',
        'reviews' => 'integer',
    ];

    protected $table = 'products';

    /**
     * Get the category that owns the product.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the car makes compatible with this product.
     */
    public function carMakes()
    {
        return $this->belongsToMany(CarMake::class);
    }
}