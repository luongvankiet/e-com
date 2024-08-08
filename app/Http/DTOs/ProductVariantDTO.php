<?php

namespace App\Http\DTOs;

use Illuminate\Http\UploadedFile;

class ProductVariantDTO extends DataTransferObject
{
    public string $name;
    public array $options;
    public int $quantity;
    public int $regularPrice;
    public int $salePrice;
    public ?UploadedFile $image;

    public static function fromRequest($request): self
    {
        return new static([
            'name' => $request->input('name'),
            'options' => $request->input('options'),
            'quantity' => $request->input('quantity'),
            'regular_price' => $request->input('regular_price'),
            'sale_price' => $request->input('sale_price'),
            'image' => $request->image,
        ]);
    }

    public  static function fromArray(array $data = []): self
    {
        return new static([
            'name' => $data['name'] ?? '',
            'options' => $data['options'] ?? [],
            'quantity' => $data['quantity'] ?? 0,
            'regular_price' => $data['regular_price'] ?? 0,
            'sale_price' => $data['sale_price'] ?? 0,
        ]);
    }
}
