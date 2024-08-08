<?php

namespace App\Models;

use App\HasImages;
use App\HasTags;
use App\Publishable;
use App\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Brand extends Model
{
    use HasFactory,
        SoftDeletes,
        Publishable,
        HasImages,
        Sluggable,
        HasTags;

    protected $appends = ['tags_name'];

    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_brand', 'brand_id', 'category_id');
    }
}
