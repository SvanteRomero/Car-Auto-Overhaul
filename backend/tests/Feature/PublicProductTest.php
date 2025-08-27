<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Product;
use App\Models\Category;
use App\Models\CarMake;

class PublicProductTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    /** @test */
    public function a_user_can_get_a_list_of_active_products()
    {
        // Create 3 active products and 2 inactive products
        Product::factory()->count(3)->create(['status' => 'active']);
        Product::factory()->count(2)->create(['status' => 'inactive']);

        $response = $this->getJson('/api/products');

        $response->assertStatus(200)
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => ['id', 'name', 'price', 'status']
                ]
            ]);
    }

    /** @test */
    public function a_user_can_filter_products_by_search_term()
    {
        // Create a product with a unique name and an extra product for noise
        $product = Product::factory()->create(['name' => 'Brake Fluid']);
        Product::factory()->create();

        $response = $this->getJson('/api/products?search=Brake');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['name' => 'Brake Fluid']);
    }

    /** @test */
    public function a_user_can_filter_products_by_category()
    {
        // Create a category and a product associated with it
        $category = Category::factory()->create();
        Product::factory()->count(2)->create();
        Product::factory()->create(['category_id' => $category->id]);

        $response = $this->getJson('/api/products?category=' . $category->slug);

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    /** @test */
    public function a_user_can_filter_products_by_car_make()
    {
        // Create a car make and a product attached to it
        $carMake = CarMake::factory()->create();
        $product = Product::factory()->create();
        $product->carMakes()->attach($carMake->id);

        $response = $this->getJson('/api/products?make=' . $carMake->slug);

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }

    /** @test */
    public function a_user_can_filter_products_by_price_range()
    {
        // Create products at different price points
        Product::factory()->create(['price' => 5000]); // Outside range
        Product::factory()->create(['price' => 15000]); // Inside range
        Product::factory()->create(['price' => 25000]); // Inside range
        Product::factory()->create(['price' => 35000]); // Outside range

        $response = $this->getJson('/api/products?min_price=10000&max_price=30000');

        $response->assertStatus(200)
            ->assertJsonCount(2, 'data');
    }

    /** @test */
    public function a_user_can_get_a_single_active_product()
    {
        // Create an active product and assert it can be retrieved
        $product = Product::factory()->create(['status' => 'active']);
        Product::factory()->count(2)->create();

        $response = $this->getJson('/api/products/' . $product->id);

        $response->assertStatus(200)
            ->assertJsonFragment(['name' => $product->name]);
    }

    /** @test */
    public function a_user_cannot_get_a_single_inactive_product()
    {
        // Create an inactive product and assert it cannot be retrieved by a public user
        $product = Product::factory()->create(['status' => 'inactive']);

        $response = $this->getJson('/api/products/' . $product->id);

        $response->assertStatus(404);
    }
}