<?php

namespace Database\Seeders;

use App\Models\CarMake;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarMakeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $makes = [
            ['name' => 'Toyota', 'slug' => 'toyota'],
            ['name' => 'Honda', 'slug' => 'honda'],
            ['name' => 'Nissan', 'slug' => 'nissan'],
            ['name' => 'Mazda', 'slug' => 'mazda'],
            ['name' => 'Mitsubishi', 'slug' => 'mitsubishi'],
            ['name' => 'Subaru', 'slug' => 'subaru'],
            ['name' => 'Isuzu', 'slug' => 'isuzu'],
            ['name' => 'Suzuki', 'slug' => 'suzuki'],
            ['name' => 'BMW', 'slug' => 'bmw'],
            ['name' => 'Mercedes-Benz', 'slug' => 'mercedes-benz'],
            ['name' => 'Audi', 'slug' => 'audi'],
            ['name' => 'Volkswagen', 'slug' => 'volkswagen'],
        ];

        foreach ($makes as $make) {
            CarMake::create($make);
        }
    }
}