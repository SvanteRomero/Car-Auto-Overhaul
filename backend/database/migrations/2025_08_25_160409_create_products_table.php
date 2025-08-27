<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('sku')->unique();
            $table->integer('price');
            $table->integer('original_price')->nullable();
            $table->integer('stock');
            $table->string('status')->default('active');
            $table->text('description')->nullable();
            $table->json('specifications')->nullable();
            $table->json('images')->nullable();
            $table->decimal('rating', 3, 2)->nullable();
            $table->integer('reviews')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};