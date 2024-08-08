<?php

namespace App;

use App\Http\Actions\ImageActions\DeleteImageAction;
use App\Http\Actions\ImageActions\StoreImageAction;
use App\Http\DTOs\ImageDTO;
use App\Models\Image;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Http\UploadedFile;

trait HasImages
{
    public function images(): MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function image(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable');
    }

    public function featuredImage(): MorphOne
    {
        return $this->morphOne(Image::class, 'imageable')->whereIsFeatured(true);
    }

    public function addImage(array|UploadedFile $file, ?Image $image = null, ?bool $isFeatured = true)
    {
        if (!$file || !$file instanceof UploadedFile) {
            return;
        }

        if ($image) {
            (new DeleteImageAction)->execute($image);
        }

        $imageDTO = ImageDTO::fromFile($file, $isFeatured);

        $this->images()->create(
            $imageDTO->toArray()
        );
    }

    public function addImages(array|UploadedFile $file)
    {
        if ($file instanceof UploadedFile) {
            $this->addImage($file);
            return;
        }

        foreach ($file as $key => $f) {
            $this->addImage($f, null, $key === 0);
        }
    }

    public function removeImages()
    {
        foreach ($this->images as $image) {
            (new DeleteImageAction)->execute($image);
        }
    }

    public function setFeaturedImage(?int $featuredImageId = null)
    {
        if (!$featuredImageId) {
            return;
        }

        $this->images()
            ->update(['is_featured' => false]);

        $this->images()
            ->whereKey($featuredImageId)
            ->update(['is_featured' => true]);
    }
}
