<?php

namespace App\Http\Actions\ImageActions;

use App\Http\DTOs\ImageDTO;
use Illuminate\Http\Request;

class StoreManyImagesAction
{
    public function execute(Request $request)
    {
        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $key => $file) {
                $image = (new StoreImageAction)->execute(
                    ImageDTO::fromRequest($file),
                    $key === 0
                );

                array_push($images, $image);
            }
        }

        return $images;
    }
}
