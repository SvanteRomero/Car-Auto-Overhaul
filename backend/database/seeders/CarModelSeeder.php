<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarModelSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('car_models')->insert([
            // Toyota models
            ['make_id' => 1, 'name' => 'Hilux', 'year_from' => 2005, 'year_to' => 2024],
            ['make_id' => 1, 'name' => 'Corolla', 'year_from' => 2003, 'year_to' => 2024],
            ['make_id' => 1, 'name' => 'Camry', 'year_from' => 2006, 'year_to' => 2024],
            ['make_id' => 1, 'name' => 'Land Cruiser', 'year_from' => 2008, 'year_to' => 2024],
            ['make_id' => 1, 'name' => 'RAV4', 'year_from' => 2006, 'year_to' => 2024],

            // Nissan models
            ['make_id' => 2, 'name' => 'X-Trail', 'year_from' => 2007, 'year_to' => 2024],
            ['make_id' => 2, 'name' => 'Navara', 'year_from' => 2005, 'year_to' => 2024],
            ['make_id' => 2, 'name' => 'Patrol', 'year_from' => 2010, 'year_to' => 2024],
            ['make_id' => 2, 'name' => 'Qashqai', 'year_from' => 2007, 'year_to' => 2024],

            // Honda models
            ['make_id' => 3, 'name' => 'Civic', 'year_from' => 2006, 'year_to' => 2024],
            ['make_id' => 3, 'name' => 'CR-V', 'year_from' => 2007, 'year_to' => 2024],
            ['make_id' => 3, 'name' => 'Accord', 'year_from' => 2008, 'year_to' => 2024],
            ['make_id' => 3, 'name' => 'Pilot', 'year_from' => 2009, 'year_to' => 2024],

            // Mazda models
            ['make_id' => 4, 'name' => 'Demio', 'year_from' => 2007, 'year_to' => 2024],
            ['make_id' => 4, 'name' => 'CX-5', 'year_from' => 2012, 'year_to' => 2024],
            ['make_id' => 4, 'name' => 'Mazda3', 'year_from' => 2009, 'year_to' => 2024],
            ['make_id' => 4, 'name' => 'BT-50', 'year_from' => 2011, 'year_to' => 2024],

            // Mitsubishi models
            ['make_id' => 5, 'name' => 'Pajero', 'year_from' => 2006, 'year_to' => 2024],
            ['make_id' => 5, 'name' => 'L200', 'year_from' => 2006, 'year_to' => 2024],
            ['make_id' => 5, 'name' => 'Outlander', 'year_from' => 2007, 'year_to' => 2024],
            ['make_id' => 5, 'name' => 'ASX', 'year_from' => 2010, 'year_to' => 2024],

            // Subaru models
            ['make_id' => 6, 'name' => 'Forester', 'year_from' => 2008, 'year_to' => 2024],
            ['make_id' => 6, 'name' => 'Impreza', 'year_from' => 2007, 'year_to' => 2024],
            ['make_id' => 6, 'name' => 'Outback', 'year_from' => 2009, 'year_to' => 2024],
            ['make_id' => 6, 'name' => 'XV', 'year_from' => 2012, 'year_to' => 2024],

            // Isuzu models
            ['make_id' => 7, 'name' => 'D-Max', 'year_from' => 2012, 'year_to' => 2024],
            ['make_id' => 7, 'name' => 'MU-X', 'year_from' => 2013, 'year_to' => 2024],
            ['make_id' => 7, 'name' => 'Trooper', 'year_from' => 2000, 'year_to' => 2015],

            // Suzuki models
            ['make_id' => 8, 'name' => 'Swift', 'year_from' => 2010, 'year_to' => 2024],
            ['make_id' => 8, 'name' => 'Vitara', 'year_from' => 2015, 'year_to' => 2024],
            ['make_id' => 8, 'name' => 'Jimny', 'year_from' => 2018, 'year_to' => 2024],
            ['make_id' => 8, 'name' => 'Baleno', 'year_from' => 2016, 'year_to' => 2024],

            // Hyundai models
            ['make_id' => 9, 'name' => 'Tucson', 'year_from' => 2015, 'year_to' => 2024],
            ['make_id' => 9, 'name' => 'Elantra', 'year_from' => 2011, 'year_to' => 2024],
            ['make_id' => 9, 'name' => 'Santa Fe', 'year_from' => 2012, 'year_to' => 2024],
            ['make_id' => 9, 'name' => 'i20', 'year_from' => 2014, 'year_to' => 2024],

            // Volkswagen models
            ['make_id' => 10, 'name' => 'Golf', 'year_from' => 2009, 'year_to' => 2024],
            ['make_id' => 10, 'name' => 'Polo', 'year_from' => 2010, 'year_to' => 2024],
            ['make_id' => 10, 'name' => 'Tiguan', 'year_from' => 2016, 'year_to' => 2024],
            ['make_id' => 10, 'name' => 'Passat', 'year_from' => 2011, 'year_to' => 2024],
        ]);
    }
}