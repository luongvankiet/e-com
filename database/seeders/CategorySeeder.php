<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::factory()
            ->hasImages(1)
            ->has(Product::factory()
                ->hasImages(5)
                // ->hasReviews(5)
                ->count(1))
            ->hasChildren(5)
            ->count(5)
            ->create();
    }
}
