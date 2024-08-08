<?php

namespace App\Models;

use App\HasImages;
use App\HasTags;
use App\Publishable;
use App\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory,
        Publishable,
        SoftDeletes,
        Sluggable,
        HasImages,
        HasTags;

    protected $appends = ['tags_name'];

    public function children(): HasMany
    {
        return $this->hasMany($this, 'parent_id', 'id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo($this, 'parent_id', 'id');
    }

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'category_product', 'category_id', 'product_id');
    }

    public function brands(): BelongsToMany
    {
        return $this->belongsToMany(Brand::class, 'category_brand', 'category_id', 'brand_id');
    }
}
