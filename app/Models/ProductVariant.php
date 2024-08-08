<?php

namespace App\Models;

use App\HasImages;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class ProductVariant extends Model
{
    use HasFactory, HasImages;

    protected $fillable = [
        'product_id',
        'name',
        'regular_price',
        'sale_price',
        'quantity',
        'options',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function options(): BelongsToMany
    {
        return $this->belongsToMany(OptionValue::class, 'product_variant_options', 'product_variant_id', 'option_value_id');
    }

    public function scopeProductId($query, $productId)
    {
        return $query->where('product_id', $productId);
    }

    // public function orderItems(): HasMany
    // {
    //     return $this->hasMany(OrderItem::class);
    // }
}
