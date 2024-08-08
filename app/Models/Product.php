<?php

namespace App\Models;

use App\HasImages;
use App\HasStatuses;
use App\HasTags;
use App\ProductStatus;
use App\Publishable;
use App\Sluggable;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory,
        SoftDeletes,
        Publishable,
        Sluggable,
        HasImages,
        HasTags,
        HasStatuses;

    protected $fillable = [
        'name',
        'product_code',
        'product_sku',
        'short_description',
        'description',
        'regular_price',
        'sale_price',
        'quantity',
        'slug',
        'brand_id',
        'options'
    ];

    protected $appends = [
        'tags_name',
        'status_color',
        'status_label',
    ];

    protected $casts = [
        'status' => ProductStatus::class,
    ];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_product', 'product_id', 'category_id');
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    // public function orderItems(): HasMany
    // {
    //     return $this->hasMany(OrderItem::class);
    // }

    // public function campaignProducts(): BelongsToMany
    // {
    //     return $this->belongsToMany(CampaignProduct::class);
    // }

    // public function reviews(): HasMany
    // {
    //     return $this->hasMany(Review::class);
    // }

    public function options(): BelongsToMany
    {
        return $this->belongsToMany(Option::class, 'option_values', 'product_id', 'option_id')->distinct();
    }

    public function scopeInStock($query)
    {
        $query->whereNotBetween('quantity', [0, 5]);
    }

    public function scopeLowStock($query)
    {
        $query->whereBetween('quantity', [1, 4]);
    }

    public function scopeOutOfStock($query)
    {
        $query->where('quantity', '<=', 0);
    }
}
