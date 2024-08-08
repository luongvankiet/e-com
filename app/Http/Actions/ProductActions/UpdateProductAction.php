<?php

namespace App\Http\Actions\ProductActions;

use App\Http\Actions\ImageActions\DeleteImageAction;
use App\Http\DTOs\ProductDTO;
use App\Http\DTOs\ProductVariantDTO;
use App\Models\Option;
use App\Models\Product;
use App\Models\ProductVariant;

class UpdateProductAction
{
    public function execute(ProductDTO $productDTO, Product $product): ?Product
    {
        $product->name = $productDTO->name;
        $product->product_code = $productDTO->productCode;
        $product->product_sku = $productDTO->productSku;
        $product->short_description = $productDTO->shortDescription;
        $product->description = $productDTO->description;
        $product->regular_price = $productDTO->regularPrice;
        $product->sale_price = $productDTO->salePrice;
        $product->quantity = $productDTO->quantity;
        $product->status = $productDTO->status;
        $product->brand_id = $productDTO->brandId;
        $product->published_at = $productDTO->publishedAt;

        $product->save();

        if (!empty($product->images)) {
            $deletingImages = $product->images()
                ->whereNotIn('id', $productDTO->imageIds)
                ->get();

            foreach ($deletingImages as $image) {
                (new DeleteImageAction)->execute($image);
            }
        }

        if (!empty($productDTO->imageFiles)) {
            $product->addImages($productDTO->imageFiles);
        }

        //Check if current featured image has changed then mark featured image
        if (
            $productDTO->featuredImageId
            && $product->images()
            ->whereKey($productDTO->featuredImageId)
            ->whereIsFeatured(false)
            ->exists()
        ) {
            $product->setFeaturedImage($productDTO->featuredImageId);
        }

        $product->categories()->sync($productDTO->categoryIds);

        $product->tag($productDTO->tagsName);

        if (!empty($productDTO->options)) {
            foreach ($productDTO->options as $opt) {
                $name = $opt['name'] ?? null;
                $values = $opt['values'] ?? [];

                if (!$name || empty($values)) {
                    continue;
                }

                $option = Option::firstOrCreate(['name' => $name]);

                $optionValues = collect($values)->pluck('value')->all();

                $option->values()
                    ->where('product_id', $product->id)
                    ->whereNotIn('value', $optionValues)
                    ->delete();

                foreach ($values as $value) {
                    $option->values()
                        ->firstOrCreate([
                            'product_id' => $product->id,
                            'value' => $value['value']
                        ]);
                }
            }
        }

        if (!empty($productDTO->variants)) {
            $variantIds = collect($productDTO->variants)
                ->filter(fn ($variant) => is_numeric($variant['id']))
                ->pluck('id')
                ->all();

            $product->variants()->whereNotIn('id', $variantIds)->delete();

            foreach ($productDTO->variants as $variant) {
                (new UpdateOrCreateProductVariantAction)->execute(
                    ProductVariantDTO::fromArray($variant),
                    $product,
                    ProductVariant::firstOrNew(['id' => $variant['id']])
                );
            }
        }

        return $product;
    }
}
