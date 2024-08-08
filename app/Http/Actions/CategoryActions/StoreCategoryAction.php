<?php

namespace App\Http\Actions\CategoryActions;

use App\Http\DTOs\CategoryDTO;
use App\Models\Category;

class StoreCategoryAction
{
    public function execute(CategoryDTO $categoryDTO): ?Category
    {
        $category = new Category();

        $category->name = $categoryDTO->name;
        $category->description = $categoryDTO->description;
        $category->published_at = $categoryDTO->publishedAt;
        $category->parent_id = $categoryDTO->parentId;

        $category->save();

        if ($categoryDTO->imageFile) {
            $category->addImage($categoryDTO->imageFile);
        }

        $category->brands()->sync($categoryDTO->brandIds);

        $category->tag($categoryDTO->tagsName);

        return $category;
    }
}
