<?php

namespace Tests\Feature;

use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class InventoryReservationTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $token;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->token = $this->user->createToken('test-token')->plainTextToken;
    }

    /** @test */
    public function stock_is_decremented_when_a_product_is_added_to_the_cart()
    {
        $product = Product::factory()->create(['stock' => 20]);

        $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/cart/add', [
            'product_id' => $product->id,
            'quantity' => 5,
        ])->assertStatus(201);

        $this->assertEquals(15, $product->fresh()->stock);
    }

    /** @test */
    public function it_prevents_adding_more_products_than_are_in_stock()
    {
        $product = Product::factory()->create(['stock' => 5]);

        $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/cart/add', [
            'product_id' => $product->id,
            'quantity' => 6,
        ])->assertStatus(400)
          ->assertJson(['message' => 'Not enough stock available.']);
    }

    /** @test */
    public function expired_inventory_reservations_are_released_by_the_scheduled_command()
    {
        // Arrange: Create a product
        $product = Product::factory()->create(['stock' => 10]);

        // Use Laravel's time traveling helpers to simulate the past
        $this->travelTo(now()->subMinutes(20));

        // Act: Add an item to the cart, which will have a timestamp of 20 minutes ago
        $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/cart/add', [
            'product_id' => $product->id,
            'quantity' => 3,
        ]);

        // Return to the present
        $this->travelBack();
        
        // Assert: Immediately after adding, the stock should be decremented
        $this->assertEquals(7, $product->fresh()->stock);
        $this->assertDatabaseCount('cart_items', 1);

        // Act: Run the scheduled command that we created
        Artisan::call('inventory:release');

        // Assert: After the command runs, the stock should be restored and the cart item deleted
        $this->assertEquals(10, $product->fresh()->stock);
        $this->assertDatabaseCount('cart_items', 0);
    }
}