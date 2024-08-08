<?php

namespace App\Http\QueryFilters;

class ProductQueryFilter extends QueryFilter
{
    protected $searchable = [
        'name',
        'product_sku',
    ];

    protected $sortable = [
        'name',
        'regular_price',
        'sale_price',
        'quantity',
        'status',
        'created_at',
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

    public function stock($value)
    {
        if (!$value || $value === 'all') {
            return;
        }

        $values = explode(',', $value);

        $this->queryBuilder->where(
            function ($query) use ($values) {
                foreach ($values as $value) {
                    switch ($value) {
                        case 'in_stock':
                            $query->orWhere(
                                function ($query) {
                                    $query->inStock();
                                }
                            );
                            break;

                        case 'low_stock':
                            $query->orWhere(function ($query) {
                                $query->lowStock();
                            });
                            break;

                        case 'out_of_stock':
                            $query->orWhere(
                                function ($query) {
                                    $query->outOfStock();
                                }
                            );
                            break;
                    }
                }
            }
        );
    }
}
