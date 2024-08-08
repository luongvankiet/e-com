<?php

namespace App\Http\QueryFilters;

class ProductVariantQueryFilter extends QueryFilter
{
    protected $searchable = [
        'name',
    ];

    protected $sortable = [
        'name',
        'regular_price',
        'sale_price',
        'quantity',
        'status',
        'created_at',
    ];
}
