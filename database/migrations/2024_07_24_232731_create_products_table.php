<?php

use App\Models\Brand;
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
            $table->id();
            $table->string('name');
            $table->text('slug')->nullable();
            $table->string('product_code')->nullable();
            $table->string('product_sku')->nullable();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->unsignedBigInteger('regular_price')->default(0);
            $table->unsignedBigInteger('sale_price')->default(0)->nullable();
            $table->unsignedBigInteger('quantity')->default(0);
            $table->string('status')->nullable();
            $table->foreignIdFor(Brand::class)
                ->nullable()
                ->constrained()
                ->nullOnDelete();
            $table->timestamp('published_at')->nullable();
            $table->softDeletes();
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
