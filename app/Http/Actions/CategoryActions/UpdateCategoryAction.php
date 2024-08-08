<?php

namespace App\Http\Actions\CategoryActions;

use App\Http\Actions\ImageActions\DeleteImageAction;
use App\Http\DTOs\CategoryDTO;
use App\Models\Category;

class UpdateCategoryAction
{
    public function execute(CategoryDTO $categoryDTO, Category $category): ?Category
    {
        $category->name = $categoryDTO->name;
        $category->description = $categoryDTO->description;
        $category->published_at = $categoryDTO->publishedAt;
        $category->parent_id = $categoryDTO->parentId;

        $category->save();

        if (!$categoryDTO->imageFile) {
            (new DeleteImageAction)->execute($category->image);
        } else {
            $category->addImage($categoryDTO->imageFile, $category->image);
        }

        $category->brands()->sync($categoryDTO->brandIds);

        $category->tag($categoryDTO->tagsName);

        return $category;
    }
}
