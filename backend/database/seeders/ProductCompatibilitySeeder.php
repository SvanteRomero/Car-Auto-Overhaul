<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductCompatibilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('product_compatibility')->insert([
            // Toyota parts compatibility
            ['product_id' => 1, 'car_model_id' => 1], ['product_id' => 1, 'car_model_id' => 4], ['product_id' => 1, 'car_model_id' => 5],
            ['product_id' => 2, 'car_model_id' => 2], ['product_id' => 2, 'car_model_id' => 3],
            ['product_id' => 3, 'car_model_id' => 3],
            ['product_id' => 4, 'car_model_id' => 1],
            ['product_id' => 5, 'car_model_id' => 1], ['product_id' => 5, 'car_model_id' => 2], ['product_id' => 5, 'car_model_id' => 3], ['product_id' => 5, 'car_model_id' => 4], ['product_id' => 5, 'car_model_id' => 5],
            ['product_id' => 6, 'car_model_id' => 2],
            ['product_id' => 7, 'car_model_id' => 3],
            ['product_id' => 11, 'car_model_id' => 1],
            ['product_id' => 12, 'car_model_id' => 2],
            ['product_id' => 13, 'car_model_id' => 3],

            // Nissan parts compatibility
            ['product_id' => 8, 'car_model_id' => 4],
            ['product_id' => 9, 'car_model_id' => 5],
            ['product_id' => 10, 'car_model_id' => 4],
            ['product_id' => 14, 'car_model_id' => 4],
            ['product_id' => 15, 'car_model_id' => 5],
            ['product_id' => 16, 'car_model_id' => 4],

            // Honda parts compatibility
            ['product_id' => 17, 'car_model_id' => 6],
            ['product_id' => 18, 'car_model_id' => 7],
            ['product_id' => 19, 'car_model_id' => 6],

            // Mazda parts compatibility
            ['product_id' => 20, 'car_model_id' => 8],
            ['product_id' => 21, 'car_model_id' => 8],
            ['product_id' => 22, 'car_model_id' => 8],

            // Mitsubishi parts compatibility
            ['product_id' => 23, 'car_model_id' => 9],
            ['product_id' => 24, 'car_model_id' => 9],
            ['product_id' => 25, 'car_model_id' => 9],

            // Subaru parts compatibility
            ['product_id' => 26, 'car_model_id' => 10],
            ['product_id' => 27, 'car_model_id' => 10],
            ['product_id' => 28, 'car_model_id' => 10],

            // Isuzu parts compatibility
            ['product_id' => 29, 'car_model_id' => 7], // Assuming D-Max is make_id 2, model_id 7
            ['product_id' => 30, 'car_model_id' => 7],
            ['product_id' => 31, 'car_model_id' => 7],

            // Suzuki parts compatibility
            ['product_id' => 32, 'car_model_id' => 8], // Assuming Vitara is make_id 4, model_id 8
            ['product_id' => 33, 'car_model_id' => 6], // Assuming Swift is make_id 3, model_id 6
            ['product_id' => 34, 'car_model_id' => 8],

            // Hyundai parts compatibility
            ['product_id' => 35, 'car_model_id' => 7], // Assuming Tucson is make_id 3, model_id 7
            ['product_id' => 36, 'car_model_id' => 6], // Assuming Elantra is make_id 3, model_id 6
            ['product_id' => 37, 'car_model_id' => 7],

            // VW parts compatibility
            ['product_id' => 38, 'car_model_id' => 10], // Assuming Golf is make_id 6, model_id 10
            ['product_id' => 39, 'car_model_id' => 10],
            ['product_id' => 40, 'car_model_id' => 10],
        ]);
    }
}
