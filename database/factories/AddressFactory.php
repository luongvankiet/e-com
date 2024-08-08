<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Address>
 */
class AddressFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'address_line_1' => fake()->streetAddress,
            'city' => fake()->city,
            'state' => fake()->state,
            'postcode' => fake()->postcode,
            'country' => fake()->country,
        ];
    }
}
