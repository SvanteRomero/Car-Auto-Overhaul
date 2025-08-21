<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarMakeSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('car_makes')->insert([
            ['name' => 'Toyota', 'logo_url' => '/assets/images/logos/toyota-logo.png'],
            ['name' => 'Nissan', 'logo_url' => '/assets/images/logos/nissan-logo.png'],
            ['name' => 'Honda', 'logo_url' => '/assets/images/logos/honda-logo.png'],
            ['name' => 'Mazda', 'logo_url' => '/assets/images/logos/mazda-logo.png'],
            ['name' => 'Mitsubishi', 'logo_url' => '/assets/images/logos/mitsubishi-logo.png'],
            ['name' => 'Subaru', 'logo_url' => '/assets/images/logos/subaru-logo.png'],
            ['name' => 'Isuzu', 'logo_url' => '/assets/images/logos/isuzu-logo.png'],
            ['name' => 'Suzuki', 'logo_url' => '/assets/images/logos/suzuki-logo.png'],
            ['name' => 'Hyundai', 'logo_url' => '/assets/images/logos/hyundai-logo.png'],
            ['name' => 'Volkswagen', 'logo_url' => '/assets/images/logos/vw-logo.png'],
        ]);
    }
}