<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Engine Parts', 'slug' => 'engine-parts'],
            ['name' => 'Brake System', 'slug' => 'brake-system'],
            ['name' => 'Suspension', 'slug' => 'suspension'],
            ['name' => 'Electrical', 'slug' => 'electrical'],
            ['name' => 'Filters', 'slug' => 'filters'],
            ['name' => 'Body Parts', 'slug' => 'body-parts'],
            ['name' => 'Cooling System', 'slug' => 'cooling-system'],
            ['name' => 'Transmission', 'slug' => 'transmission'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}