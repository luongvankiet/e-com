<?php

namespace App\Http\QueryFilters;

class RoleQueryFilter extends QueryFilter
{
    protected $searchable = [
        'name',
        'display_name',
        'description',
    ];

    protected $sortable = [
        'display_name',
        'description',
        'updated_at'
    ];
}
