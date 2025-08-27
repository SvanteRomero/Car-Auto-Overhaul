<?php

namespace Tests\Feature;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthenticatedCartOrderTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected $user;
    protected $token;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $this->token = $this->user->createToken('test-token')->plainTextToken;
    }

    /** @test */
    public function a_user_can_add_a_product_to_their_cart()
    {
        $product = Product::factory()->create();
        $cartData = [
            'product_id' => $product->id,
            'quantity' => 2
        ];

        $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/cart/add', $cartData)
          ->assertStatus(201)
          ->assertJsonStructure(['id', 'product_id', 'quantity']);

        $this->assertDatabaseHas('cart_items', [
            'product_id' => $product->id,
            'quantity' => 2
        ]);
    }

    /** @test */
    public function a_user_can_update_an_item_in_their_cart()
    {
        $product = Product::factory()->create();
        $cart = $this->user->cart()->create();
        $cartItem = $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 1
        ]);

        $updateData = ['quantity' => 5];

        $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->putJson("/api/cart/update/{$cartItem->id}", $updateData)
          ->assertStatus(200)
          ->assertJsonPath('quantity', 5);

        $this->assertDatabaseHas('cart_items', [
            'id' => $cartItem->id,
            'quantity' => 5
        ]);
    }

    /** @test */
    public function a_user_can_remove_an_item_from_their_cart()
    {
        $product = Product::factory()->create();
        $cart = $this->user->cart()->create();
        $cartItem = $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 1
        ]);

        $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->deleteJson("/api/cart/remove/{$cartItem->id}")
          ->assertStatus(204);

        $this->assertDatabaseMissing('cart_items', ['id' => $cartItem->id]);
    }

    /** @test */
    public function a_user_can_checkout_and_create_an_order()
    {
        $product = Product::factory()->create();
        $cart = $this->user->cart()->create();
        $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 2
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/checkout');

        $response->assertStatus(201)
            // Use assertJsonFragment to check for a piece of the JSON
            ->assertJsonFragment(['message' => 'Order placed successfully']);

        $this->assertDatabaseCount('orders', 1);
        $this->assertDatabaseCount('order_items', 1);
        $this->assertDatabaseEmpty('cart_items');
    }

    /** @test */
    public function a_user_can_view_their_orders()
    {
        Order::factory()->create(['user_id' => $this->user->id]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->getJson('/api/user/orders');

        $response->assertStatus(200)
            // Assert count on the root of the JSON response
            ->assertJsonCount(1);
    }
}