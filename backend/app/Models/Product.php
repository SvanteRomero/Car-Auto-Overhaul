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
        'category',
        'price',
        'original_price',
        'stock',
        'status',
        'description',
        'specifications',
        'compatible_makes',
        'images',
        'rating',
        'reviews',
    ];

    protected $casts = [
        'price' => 'integer',
        'original_price' => 'integer',
        'stock' => 'integer',
        'images' => 'json',
        'compatible_makes' => 'json',
        'specifications' => 'json',
        'rating' => 'float',
        'reviews' => 'integer',
    ];

    protected $table = 'products';
}