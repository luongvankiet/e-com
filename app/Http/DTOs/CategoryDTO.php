<?php

namespace App\Http\DTOs;

use App\Models\Category;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;

class CategoryDTO extends DataTransferObject
{
    public string $name;
    public ?string $description;
    public ?int $parentId;
    public ?Carbon $publishedAt;
    public array $brandIds;

    /** @var array|Illuminate\Http\UploadedFile|null */
    public array|UploadedFile|null $imageFile;

    public array $tagsName = [];

    public static function fromRequest($request): self
    {
        $parent = $request->input('parent');

        $brandIds = collect(
            $request->input('brands', [])
        )
            ->pluck('id')
            ->toArray();

        return new static([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'parent_id' => $parent['id'] ?? null,
            'published_at' =>  $request->filled('published_at')
                ? Carbon::parse($request->input('published_at'))
                : null,
            'image_file' => $request->image,
            'tags_name' => $request->input('tags_name'),
            'brand_ids' => $brandIds,
        ]);
    }
}
