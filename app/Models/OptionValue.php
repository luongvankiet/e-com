<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OptionValue extends Model
{
    use HasFactory;

    protected $fillable = [
        'value',
        'option_id',
        'product_id',
    ];

    protected $appends = [
        'name'
    ];

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->option ? $this->option->name : '',
        );
    }

    public function option()
    {
        return $this->belongsTo(Option::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function variantOptions()
    {
        return $this->hasMany(ProductVariantOption::class);
    }
}
