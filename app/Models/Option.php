<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Option extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function product(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'option_values', 'option_id', 'product_id');
    }

    public function values()
    {
        return $this->hasMany(OptionValue::class);
    }

    public static function generateCombinations($options)
    {
        $result = [[]];
        foreach ($options as $property => $values) {
            $temp = [];
            foreach ($result as $item) {
                foreach ($values as $value) {
                    $temp[] = array_merge($item, [$property => $value]);
                }
            }
            $result = $temp;
        }
        return $result;
    }
}
