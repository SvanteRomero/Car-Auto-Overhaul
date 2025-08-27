<?php

namespace Tests\Feature;

use App\Models\CarMake;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AdminTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $adminUser;
    protected $adminToken;

    public function setUp(): void
    {
        parent::setUp();
        $this->adminUser = User::factory()->create(['role' => 'admin']);
        $this->adminToken = $this->adminUser->createToken('admin-token')->plainTextToken;
    }

    /** @test */
    public function an_admin_can_create_a_product_with_an_image()
    {
        Storage::fake('public');
        $category = Category::factory()->create();
        $carMake = CarMake::factory()->create();

        $productData = [
            'name' => 'New Product',
            'sku' => 'NP-001',
            'description' => 'A great new product.',
            'price' => 99.99,
            // **FIX:** Send an array of files under the 'images' key to match the controller
            'images' => [UploadedFile::fake()->image('product.jpg')],
            'status' => 'active',
            'category_id' => $category->id,
            'car_make_ids' => [$carMake->id], // Match controller's expected key
            'stock' => 50,
        ];

        $this->withHeaders(['Authorization' => 'Bearer ' . $this->adminToken])
            ->postJson('/api/admin/products', $productData)
            ->assertStatus(201);

        $product = Product::first();
        $this->assertNotNull($product->images);
        $this->assertNotEmpty($product->images);

        // **FIX:** Convert the stored URL back to a relative path for the assertion
        $relativePath = str_replace(Storage::url(''), '', $product->images[0]);
        Storage::disk('public')->assertExists($relativePath);
    }

    /** @test */
    public function an_admin_can_update_a_product_and_replace_the_image()
    {
        Storage::fake('public');
        $oldImageFile = UploadedFile::fake()->image('old.jpg')->store('products', 'public');
        // **FIX:** Store the full URL, just like the controller does
        $oldImageUrl = Storage::url($oldImageFile);
        $product = Product::factory()->create(['images' => [$oldImageUrl]]);
        $category = Category::factory()->create();
        
        $updateData = [
            'name' => 'Updated Product Name',
            'price' => 125.50,
            'sku' => $product->sku,
            'category_id' => $category->id,
            'stock' => $product->stock,
            'status' => $product->status,
            'car_make_ids' => [],
            // **FIX:** Send new image under the correct 'images' key
            'images' => [UploadedFile::fake()->image('new.jpg')],
        ];

        $this->withHeaders(['Authorization' => 'Bearer ' . $this->adminToken])
            ->postJson("/api/admin/products/{$product->id}", $updateData)
            ->assertStatus(200);

        $newImageUrl = $product->fresh()->images[0];
        $newImageFile = str_replace(Storage::url(''), '', $newImageUrl);
        
        Storage::disk('public')->assertExists($newImageFile);
        Storage::disk('public')->assertMissing($oldImageFile);
    }
    
    /** @test */
    public function an_admin_can_delete_a_product_and_its_image()
    {
        Storage::fake('public');
        $imageFile = UploadedFile::fake()->image('product.jpg')->store('products', 'public');
        // **FIX:** Store the full URL to accurately simulate the application state
        $imageUrl = Storage::url($imageFile);
        $product = Product::factory()->create(['images' => [$imageUrl]]);

        $this->withHeaders(['Authorization' => 'Bearer ' . $this->adminToken])
            ->deleteJson("/api/admin/products/{$product->id}")
            ->assertStatus(204);

        $this->assertDatabaseMissing('products', ['id' => ''.$product->id]);
        Storage::disk('public')->assertMissing($imageFile);
    }
}