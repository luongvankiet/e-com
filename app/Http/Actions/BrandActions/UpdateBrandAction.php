<?php

namespace App\Http\Actions\BrandActions;

use App\Http\Actions\ImageActions\DeleteImageAction;
use App\Http\DTOs\BrandDTO;
use App\Models\Brand;

class UpdateBrandAction
{
    public function execute(BrandDTO $brandDTO, Brand $brand): ?Brand
    {
        $brand->name = $brandDTO->name;
        $brand->description = $brandDTO->description;
        $brand->published_at = $brandDTO->publishedAt;

        $brand->save();

        if (!$brandDTO->imageFile) {
            (new DeleteImageAction)->execute($brand->image);
        } else {
            $brand->addImage($brandDTO->imageFile, $brand->image);
        }

        $brand->categories()->sync($brandDTO->categoryIds);

        $brand->tag($brandDTO->tagsName);

        return $brand;
    }
}
