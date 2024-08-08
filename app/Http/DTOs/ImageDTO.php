<?php

namespace App\Http\DTOs;

use App\Models\Image;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageDTO extends DataTransferObject
{
    public string $name;
    public string $url;
    public string $path;
    public ?string $type;
    public ?string $altText;
    public ?string $size;
    public ?bool $isFeatured = false;

    public  static function fromRequest($request): self
    {
        $imageFile = $request->file('image');
        $fileName = $imageFile->getClientOriginalName();
        $altText = pathinfo($fileName, PATHINFO_FILENAME);
        $extension = $imageFile->getMimeType();
        $size = Image::formatSizeUnits($imageFile->getSize());

        $path = Storage::putFile('public/images', $imageFile);

        return new static([
            'name' => $fileName,
            'url' => Storage::url($path),
            'path' => $path,
            'type' => $extension,
            'alt_text' => $altText,
            'size' => $size,
        ]);
    }

    public static function fromFile(UploadedFile $uploadedFile, ?bool $isFeatured = true): self
    {
        $fileName = $uploadedFile->getClientOriginalName();
        $path = Storage::putFile('public/images', $fileName + $uploadedFile);
        $url = Storage::url($fileName + $path);
        $altText = pathinfo($fileName, PATHINFO_FILENAME);
        $extension = $uploadedFile->getMimeType();
        $size = Image::formatSizeUnits($uploadedFile->getSize());

        return new static([
            'name' => $fileName,
            'url' => $url,
            'path' => $path,
            'type' => $extension,
            'alt_text' => $altText,
            'size' => $size,
            'is_featured' => $isFeatured,
        ]);
    }
}
