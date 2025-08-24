<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product; // Add this
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create one Admin User
        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@autoparts.tz',
            'role' => 'admin',
        ]);

        // Create 10 regular customer users
        User::factory(10)->create();

        // Create 50 products
        Product::factory(50)->create();
    }
}