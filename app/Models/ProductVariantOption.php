<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProductVariantOption extends Pivot
{
    use HasFactory;

    protected $fillable = [
        'product_variant_id',
        'option_value_id',
    ];

    public function variant()
    {
        return $this->belongsTo(ProductVariant::class);
    }

    public function optionValue()
    {
        return $this->belongsTo(OptionValue::class);
    }
}
