<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'sku' => $this->faker->unique()->bothify('??-###'),
            'category' => $this->faker->randomElement(['Brake System', 'Filters', 'Suspension', 'Electrical', 'Engine Parts', 'Body Parts']),
            'price' => $this->faker->numberBetween(10000, 250000), // Price in TSh
            'stock' => $this->faker->numberBetween(0, 50),
            'status' => 'active',
            'image' => '/placeholder.svg',
            'description' => $this->faker->paragraph,
        ];
    }
}
