<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarMake extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'name',
        'slug',
    ];

    /**
     * Get the products that are compatible with this car make.
     */
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_car_make', 'car_make_id', 'product_id');
    }
}