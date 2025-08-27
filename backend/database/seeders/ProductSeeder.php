<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\CarMake;
use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();
        $carMakes = CarMake::all();

        // Find specific categories by name for mapping
        $brakesCategory = $categories->firstWhere('name', 'Brake System');
        $filtersCategory = $categories->firstWhere('name', 'Filters');
        $suspensionCategory = $categories->firstWhere('name', 'Suspension');
        $engineCategory = $categories->firstWhere('name', 'Engine Parts');
        $electricalCategory = $categories->firstWhere('name', 'Electrical');
        $bodyCategory = $categories->firstWhere('name', 'Body Parts');
        $coolingCategory = $categories->firstWhere('name', 'Cooling System');
        $transmissionCategory = $categories->firstWhere('name', 'Transmission');

        // Mock Products
        $productsData = [
            [
                'name' => 'Premium Brake Pads Set',
                'sku' => 'BP-001',
                'category_id' => $brakesCategory->id,
                'price' => 45000,
                'original_price' => 50000,
                'stock' => 25,
                'status' => 'active',
                'description' => 'High-quality brake pads designed for optimal stopping power and durability.',
                'specifications' => [['label' => 'Material', 'value' => 'Ceramic Composite']],
                'images' => ['/storage/products/brake-pads-close-up.png', '/storage/products/brake-pads-auto-parts.png'],
                'rating' => 4.8,
                'reviews' => 124,
                'makes' => ['Toyota', 'Honda', 'Nissan'],
            ],
            [
                'name' => 'Engine Oil Filter',
                'sku' => 'OF-002',
                'category_id' => $filtersCategory->id,
                'price' => 12000,
                'stock' => 3,
                'status' => 'active',
                'description' => 'A high-performance oil filter that ensures your engine runs clean and efficiently.',
                'specifications' => [['label' => 'Type', 'value' => 'Spin-on']],
                'images' => ['/storage/products/oil-filter.png'],
                'rating' => 4.6,
                'reviews' => 89,
                'makes' => ['Toyota', 'Mazda', 'Subaru'],
            ],
            [
                'name' => 'Shock Absorber Front',
                'sku' => 'SA-003',
                'category_id' => $suspensionCategory->id,
                'price' => 85000,
                'stock' => 15,
                'status' => 'active',
                'description' => 'Front shock absorber for a smooth and stable ride.',
                'specifications' => [['label' => 'Position', 'value' => 'Front']],
                'images' => ['/storage/products/shock-absorber.png'],
                'rating' => 4.7,
                'reviews' => 156,
                'makes' => ['BMW', 'Mercedes-Benz', 'Audi'],
            ],
            [
                'name' => 'Car Battery 12V',
                'sku' => 'CB-004',
                'category_id' => $electricalCategory->id,
                'price' => 120000,
                'stock' => 2,
                'status' => 'active',
                'description' => 'Reliable 12V car battery with a long lifespan.',
                'specifications' => [['label' => 'Voltage', 'value' => '12V']],
                'images' => ['/storage/products/car-battery.png'],
                'rating' => 4.5,
                'reviews' => 203,
                'makes' => ['Toyota', 'Honda', 'Nissan', 'Mazda'],
            ],
            [
                'name' => 'Air Filter Element',
                'sku' => 'AF-005',
                'category_id' => $filtersCategory->id,
                'price' => 18000,
                'stock' => 12,
                'status' => 'active',
                'description' => 'Ensures clean airflow to your engine for better performance and fuel economy.',
                'specifications' => [['label' => 'Material', 'value' => 'Paper']],
                'images' => ['/storage/products/air-filter.png'],
                'rating' => 4.4,
                'reviews' => 67,
                'makes' => ['Honda', 'Suzuki', 'Mitsubishi'],
            ],
            [
                'name' => 'Timing Belt Kit',
                'sku' => 'TB-006',
                'category_id' => $engineCategory->id,
                'price' => 95000,
                'stock' => 1,
                'status' => 'active',
                'description' => 'Complete timing belt replacement kit.',
                'specifications' => [['label' => 'Includes', 'value' => 'Belt, Tensioner, Idler']],
                'images' => ['/storage/products/timing-belt.png'],
                'rating' => 4.9,
                'reviews' => 178,
                'makes' => ['Toyota', 'Honda'],
            ],
            [
                'name' => 'Brake Disc Rotor',
                'sku' => 'BD-007',
                'category_id' => $brakesCategory->id,
                'price' => 65000,
                'stock' => 8,
                'status' => 'active',
                'description' => 'Vented brake disc rotor for improved stopping performance.',
                'specifications' => [['label' => 'Diameter', 'value' => '280mm']],
                'images' => ['/storage/products/brake-disc.png'],
                'rating' => 4.6,
                'reviews' => 92,
                'makes' => ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen'],
            ],
        ];

        foreach ($productsData as $data) {
            // Retrieve and remove the 'makes' key from the data array
            $makes = $data['makes'];
            unset($data['makes']);
            
            // Create the product
            $product = Product::create($data);
            
            // Get the IDs of the car makes and attach them to the product
            $makesToAttach = CarMake::whereIn('name', $makes)->pluck('id');
            $product->carMakes()->attach($makesToAttach);
        }
    }
}