<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = [
        'addressable_id',
        'addressable_type',
        'address_line_1',
        'address_line_2',
        'city',
        'state',
        'postcode',
        'country',
        'default'
    ];

    public function addressable()
    {
        return $this->morphTo();
    }
}
