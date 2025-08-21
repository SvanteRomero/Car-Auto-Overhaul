<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    // in ..._create_car_models_table.php
    public function up()
    {
        Schema::create('car_models', function (Blueprint $table) {
            $table->id();
            $table->foreignId('make_id')->constrained('car_makes')->onDelete('cascade');
            $table->string('name');
            $table->integer('year_from')->nullable();
            $table->integer('year_to')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('car_models');
    }
};
