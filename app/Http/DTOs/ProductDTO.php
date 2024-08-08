<?php

namespace App\Http\DTOs;

use Carbon\CarbonImmutable;
use Illuminate\Http\UploadedFile;

class ProductDTO extends DataTransferObject
{
    public string $name;
    public ?string $productCode;
    public ?string $productSku;
    public ?string $shortDescription;
    public ?string $description;
    public int $regularPrice = 0;
    public int $salePrice = 0;
    public int $quantity = 0;
    public string $status;
    public ?array $options = [];
    public ?int $brandId;
    public array $categoryIds;
    public ?int $featuredImageId;
    public array $imageIds;
    public ?CarbonImmutable $publishedAt;
    public array $tagsName = [];
    public array $variants;

    /** @var UploadedFile[]|UploadedFile|null $imageFiles */
    public array|UploadedFile|null $imageFiles;

    public  static function fromRequest($request): self
    {
        $categoryIds = collect(
            $request->input('categories', [])
        )
            ->pluck('id')
            ->toArray();

        $imageIds = collect(
            $request->input('images', [])
        )
            ->pluck('id')
            ->toArray();

        $brand = $request->input('brand');
        $featureImage = $request->input('featured_image');

        return new static([
            'name' => $request->input('name'),
            'product_code' => $request->input('product_code'),
            'product_sku' => $request->input('product_sku'),
            'short_description' => $request->input('short_description'),
            'description' => $request->input('description'),
            'regular_price' => $request->input('regular_price', 0),
            'sale_price' => $request->input('sale_price', 0),
            'quantity' => $request->input('quantity', 0),
            'status' => $request->input('status'),
            'options' => $request->input('options', []),
            'brand_id' => $brand['id'] ?? null,
            'category_ids' => $categoryIds,
            'published_at' =>  $request->filled('published_at')
                ? CarbonImmutable::parse($request->input('published_at'))
                : null,
            'featured_image_id' => $featureImage['id'] ?? null,
            'image_ids' => $imageIds,
            'image_files' => $request->image_files,
            'tags_name' => $request->input('tags_name', []),
            'variants' => $request->input('variants', []),
        ]);
    }
}
