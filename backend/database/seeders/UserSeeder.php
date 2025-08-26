<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create an Admin user
        User::create([
            'name' => 'Admin User',
            'username' => 'admin',
            'email' => 'admin@autoparts.tz',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'phone' => '+255 789 123 456',
            'address' => [
                'street' => '123 Admin Street',
                'city' => 'Dar es Salaam',
                'region' => 'Dar es Salaam',
                'postalCode' => '12345',
                'country' => 'Tanzania',
            ],
        ]);

        // Create a regular customer
        User::create([
            'name' => 'John Mwalimu',
            'username' => 'johnmwalimu',
            'email' => 'john.mwalimu@email.com',
            'password' => Hash::make('password'),
            'role' => 'customer',
            'phone' => '+255 754 987 654',
            'address' => [
                'street' => '456 Sample Avenue',
                'city' => 'Dar es Salaam',
                'region' => 'Dar es Salaam',
                'postalCode' => '67890',
                'country' => 'Tanzania',
            ],
        ]);
    }
}