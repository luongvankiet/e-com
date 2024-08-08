<?php

namespace App\Http\Actions\ImageActions;

use App\Models\Image;
use Illuminate\Support\Facades\Storage;

class DeleteImageAction
{
    public function execute(?Image $image)
    {
        if (!$image) {
            return;
        }

        if (Storage::exists($image->path)) {
            Storage::delete($image->path);
        }

        return $image->delete();
    }
}
