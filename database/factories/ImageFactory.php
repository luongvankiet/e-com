<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $url = fake()->imageUrl(640, 480, null, true);

        return [
            'url' => $url,
            'path' => $url,
            'name' => $url,
            'type' => 'image/jpeg',
            'alt_text' => fake()->sentence,
            'size' => $this->faker->randomNumber(5) . ' bytes',
            'is_featured' => true,
        ];
    }
}
