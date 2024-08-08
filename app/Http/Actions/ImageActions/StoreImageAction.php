<?php

namespace App\Http\Actions\ImageActions;

use App\Http\DTOs\ImageDTO;
use App\Models\Image;

class StoreImageAction
{
    public function execute(ImageDTO $imageDTO): ?Image
    {
        $image = new Image();
        $image->name = $imageDTO->name;
        $image->url = $imageDTO->url;
        $image->path = $imageDTO->path;
        $image->type = $imageDTO->type;
        $image->alt_text = $imageDTO->altText;
        $image->alt_text = $imageDTO->altText;
        $image->size = $imageDTO->size;

        if (!$image->save()) {
            return (new DeleteImageAction)->execute($image);
        }

        return $image;
    }
}
