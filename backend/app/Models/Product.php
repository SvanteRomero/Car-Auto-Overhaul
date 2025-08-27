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
        'price',
        'stock',
        'status',
        'description',
        'images',
        'rating',
        'reviews',
        'category_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'images' => 'array', // **FIX:** Add this cast
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function carMakes()
    {
        return $this->belongsToMany(CarMake::class);
    }
}