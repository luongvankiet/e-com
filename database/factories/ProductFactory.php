<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Option;
use App\Models\OptionValue;
use App\Models\Product;
use App\ProductStatus;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = fake()->randomFloat(2, 10, 100);

        $brand = Brand::query()->inRandomOrder()->first();

        $paragraphs = $this->faker->paragraphs(rand(2, 6));
        $title = $this->faker->realText(50);
        $post = "<h1>{$title}</h1>";
        foreach ($paragraphs as $para) {
            $post .= "<p>{$para}</p>";
        }

        return [
            'name' => fake()->numerify('product-######'),
            'product_code' => fake()->numerify('PD######'),
            'product_sku' => fake()->regexify('[A-Z]{5}[0-4]{3}'),
            'short_description' => fake()->paragraph(),
            'description' => $post,
            'regular_price' => $price,
            'sale_price' => fake()->randomElement([
                fake()->numberBetween(0, $price),
                0
            ]),
            'status' => fake()->randomElement(ProductStatus::cases()),
            'quantity' => fake()->numberBetween(1, 100),
            'brand_id' => $brand ? $brand->id : null,
            'published_at' => now(),
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function ($product) {
            $options = [
                'Color' => ['Red', 'Black'],
                'Size' => ['Small', 'Medium'],
            ];

            $combinations = Option::generateCombinations($options);

            $variantPrice = $product->regular_price + rand(5, 15);

            foreach ($combinations as $combination) {
                $productVariant = \App\Models\ProductVariant::factory()
                    ->hasImage(1)
                    ->create([
                        'product_id' => $product->id,
                        'name' => implode(' / ', $combination),
                        'regular_price' => $variantPrice,
                        'sale_price' => fake()->randomElement([
                            fake()->numberBetween(0, $variantPrice),
                            0
                        ]),
                        'quantity' => rand(1, 50),
                    ]);

                $variantOptions = [];
                foreach ($combination as $optionName => $optionValue) {
                    $option = Option::firstOrCreate(['name' => $optionName]);
                    $optionValue = OptionValue::firstOrCreate([
                        'product_id' => $product->id,
                        'option_id' => $option->id,
                        'value' => $optionValue
                    ]);
                    $variantOptions[] = $optionValue->id;
                }

                $productVariant->options()->sync($variantOptions);
            }
        });
    }
}
