<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('categories')->insert([
            ['name' => 'Engine Parts', 'description' => 'Engine components and accessories'],
            ['name' => 'Brake System', 'description' => 'Brake pads, discs, and brake system components'],
            ['name' => 'Suspension', 'description' => 'Shock absorbers, springs, and suspension parts'],
            ['name' => 'Electrical', 'description' => 'Lights, batteries, and electrical components'],
            ['name' => 'Filters', 'description' => 'Air filters, oil filters, and fuel filters'],
            ['name' => 'Transmission', 'description' => 'Gearbox and transmission components'],
            ['name' => 'Cooling System', 'description' => 'Radiators, water pumps, and cooling parts'],
            ['name' => 'Exhaust System', 'description' => 'Exhaust pipes, mufflers, and catalytic converters'],
            ['name' => 'Body Parts', 'description' => 'Bumpers, mirrors, and body accessories'],
            ['name' => 'Interior', 'description' => 'Seats, dashboard, and interior accessories'],
            ['name' => 'Performance Upgrades', 'description' => 'High-performance parts for enhanced vehicle performance'],
            ['name' => 'Maintenance & Service', 'description' => 'Regular maintenance and service parts'],
            ['name' => 'Tires & Wheels', 'description' => 'Tires, rims, and wheel accessories'],
            ['name' => 'Audio & Electronics', 'description' => 'Car audio systems and electronic accessories'],
            ['name' => 'Security & Safety', 'description' => 'Security systems, alarms, and safety equipment'],
            ['name' => 'Exterior Accessories', 'description' => 'External styling and functional accessories'],
            ['name' => 'Interior Accessories', 'description' => 'Interior comfort and styling accessories'],
            ['name' => 'Tools & Equipment', 'description' => 'Automotive tools and diagnostic equipment'],
            ['name' => 'Fluids & Chemicals', 'description' => 'Engine oils, coolants, and automotive chemicals'],
            ['name' => 'Gaskets & Seals', 'description' => 'Engine and transmission gaskets and seals'],
        ]);
    }
}