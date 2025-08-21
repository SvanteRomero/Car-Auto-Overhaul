<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarMake extends Model
{
    use HasFactory;

    /**
     * Get the models for the car make.
     */
    public function carModels()
    {
        return $this->hasMany(CarModel::class, 'make_id');
    }
}
