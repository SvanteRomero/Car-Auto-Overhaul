<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\Category;

class ProductFactory extends Factory
{
    /**
     * The name of the corresponding model.
     *
     * @var string
     */
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->words(3, true),
            'sku' => $this->faker->unique()->ean8,
            'price' => $this->faker->numberBetween(1000, 50000), // Use integer prices
            'stock' => $this->faker->numberBetween(1, 100),
            'status' => 'active',
            'description' => $this->faker->sentence,
            'images' => json_encode([$this->faker->imageUrl()]),
            'rating' => $this->faker->randomFloat(2, 1, 5),
            'reviews' => $this->faker->numberBetween(0, 100),
            'category_id' => Category::factory(),
        ];
    }
}