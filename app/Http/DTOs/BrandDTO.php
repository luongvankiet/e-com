<?php

namespace App\Http\DTOs;

use Carbon\Carbon;
use Illuminate\Http\UploadedFile;

class BrandDTO extends DataTransferObject
{
    public string $name;
    public ?string $description;
    public ?Carbon $publishedAt;
    public array|UploadedFile|null $imageFile;
    public array $categoryIds;
    public array $tagsName = [];

    public static function fromRequest($request): self
    {
        $categoryIds = collect(
            $request->input('categories', [])
        )
            ->pluck('id')
            ->toArray();

        return new static([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'published_at' =>  $request->filled('published_at')
                ? Carbon::parse($request->input('published_at'))
                : null,
            'image_file' => $request->image,
            'category_ids' => $categoryIds,
            'tags_name' => $request->input('tags_name', []),
        ]);
    }
}
