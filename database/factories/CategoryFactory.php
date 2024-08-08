<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->numerify('Category-###'),
            'description' => fake()->paragraphs(3, true),
            'published_at' => fake()->randomElement([now(), null]),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function ($category) {
            $category
                ->brands()
                ->sync(
                    Brand::inRandomOrder()
                        ->limit(3)
                        ->pluck('id')->toArray()
                );
        });
    }
}
