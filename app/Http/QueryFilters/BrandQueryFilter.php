<?php

namespace App\Http\QueryFilters;

class BrandQueryFilter extends QueryFilter
{
    protected $searchable = [
        'name',
    ];

    protected $sortable = [
        'name', 'updated_at'
    ];

    public function status($value)
    {
        if (!$value || $value === 'all') {
            return;
        }

        switch ($value) {
            case 'draft':
                $this->queryBuilder->whereNull('published_at');
                break;

            case 'published':
                $this->queryBuilder->whereNotNull('published_at');
                break;

            case 'trashed':
                $this->queryBuilder->onlyTrashed();
                break;
        }
    }
}
