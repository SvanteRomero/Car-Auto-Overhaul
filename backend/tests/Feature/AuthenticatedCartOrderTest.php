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
    use RefreshDatabase;
    use WithFaker;

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

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/cart/add', $cartData);

        // Assert correct status code and JSON structure
        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'cart_id',
                'product_id',
                'quantity',
                'created_at',
                'updated_at'
            ]);

        $this->assertDatabaseHas('cart_items', [
            'cart_id' => $this->user->cart->id,
            'product_id' => $product->id,
            'quantity' => 2
        ]);
    }

    /** @test */
    public function a_user_can_update_an_item_in_their_cart()
    {
        $product = Product::factory()->create();
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $product->id,
            'quantity' => 1
        ]);

        $updateData = ['quantity' => 5];

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->putJson("/api/cart/update/{$cartItem->id}", $updateData);

        // Assert correct JSON structure
        $response->assertStatus(200)
            ->assertJsonStructure([
                'id',
                'cart_id',
                'product_id',
                'quantity',
                'created_at',
                'updated_at'
            ]);

        $this->assertDatabaseHas('cart_items', [
            'id' => $cartItem->id,
            'quantity' => 5
        ]);
    }

    /** @test */
    public function a_user_can_remove_an_item_from_their_cart()
    {
        $product = Product::factory()->create();
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cartItem = CartItem::factory()->create([
            'cart_id' => $cart->id,
            'product_id' => $product->id,
            'quantity' => 1
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->deleteJson("/api/cart/remove/{$cartItem->id}");

        // Assert correct status code for deletion
        $response->assertStatus(204);

        $this->assertDatabaseMissing('cart_items', [
            'id' => $cartItem->id
        ]);
    }

    /** @test */
    public function a_user_can_checkout_and_create_an_order()
    {
        $product = Product::factory()->create();
        $cart = Cart::factory()->create(['user_id' => $this->user->id]);
        $cart->items()->create([
            'product_id' => $product->id,
            'quantity' => 2
        ]);

        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->postJson('/api/checkout');

        $response->assertStatus(201)
            ->assertJson(['message' => 'Order placed successfully.']);

        $this->assertDatabaseCount('orders', 1);
        $this->assertDatabaseCount('order_items', 1);
        $this->assertDatabaseEmpty('cart_items');
    }

    /** @test */
    public function a_user_can_view_their_orders()
    {
        // Use correct column name 'total'
        Order::factory()->create(['user_id' => $this->user->id, 'total' => 100]);
        $response = $this->withHeaders([
            'Authorization' => 'Bearer ' . $this->token,
        ])->getJson('/api/user/orders');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data');
    }
}