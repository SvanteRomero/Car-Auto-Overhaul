<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'username' => 'admin',
                'email' => 'admin@carparts.co.tz',
                'password' => Hash::make('password'),
                'full_name' => 'System Administrator',
                'role' => 'admin',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'username' => 'john_doe',
                'email' => 'john@example.com',
                'password' => Hash::make('password'),
                'full_name' => 'John Doe',
                'role' => 'customer',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}