<?php

namespace App\Http\Actions\BrandActions;

use App\Http\DTOs\BrandDTO;
use App\Models\Brand;

class StoreBrandAction
{
    public function execute(BrandDTO $brandDTO): ?Brand
    {
        $brand = new Brand();

        $brand->name = $brandDTO->name;
        $brand->description = $brandDTO->description;
        $brand->published_at = $brandDTO->publishedAt;

        $brand->save();

        if ($brandDTO->imageFile) {
            $brand->addImage($brandDTO->imageFile);
        }

        $brand->categories()->sync($brandDTO->categoryIds);

        $brand->tag($brandDTO->tagsName);

        return $brand;
    }
}
