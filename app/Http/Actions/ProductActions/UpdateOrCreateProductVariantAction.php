<?php

namespace App\Http\Actions\ProductActions;

use App\Http\Actions\ImageActions\DeleteImageAction;
use App\Http\DTOs\ProductVariantDTO;
use App\Models\Option;
use App\Models\Product;
use App\Models\ProductVariant;

class UpdateOrCreateProductVariantAction
{
    public function execute(ProductVariantDTO $productVariantDTO, Product $product, ProductVariant $variant): ?ProductVariant
    {
        $variant->name = $productVariantDTO->name;
        $variant->quantity = $productVariantDTO->quantity;
        $variant->regular_price = $productVariantDTO->regularPrice;
        $variant->sale_price = $productVariantDTO->salePrice;
        $variant->product_id = $product->id;
        $variant->save();

        if (!empty($productVariantDTO->options)) {
            $values = collect($productVariantDTO->options)->pluck('value')->all();

            $variant->options()
                ->whereNotIn('value', $values)
                ->delete();

            foreach ($productVariantDTO->options as $opt) {
                if (!($opt['name'] ?? null) || !($opt['name'] ?? null)) {
                    continue;
                }

                $option = Option::where('name', $opt['name'])->first();

                if (!$option) {
                    continue;
                }

                $variant->options()->firstOrCreate([
                    'value' => $opt['value'],
                    'option_id' => $option->id,
                    'product_id' => $product->id
                ]);
            }
        }

        if (!$productVariantDTO->image) {
            (new DeleteImageAction)->execute($variant->image);
        } else {
            $variant->addImage($productVariantDTO->image, $variant->image);
        }

        return $variant;
    }
}
