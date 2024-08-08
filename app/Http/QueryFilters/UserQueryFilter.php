<?php

namespace App\Http\QueryFilters;

class UserQueryFilter extends QueryFilter
{
    protected $searchable = [
        'first_name',
        'last_name',
        'email',
    ];

    protected $sortable = [
        'first_name',
        'updated_at'
    ];

    public function roles($value)
    {
        if (!$value || $value === 'all') {
            return;
        }

        $values = explode(',', $value);

        return $this->queryBuilder
            ->whereHas('roles', function ($query) use ($values) {
                $query->whereIn('name', $values);
            });
    }

    public function status($value)
    {
        switch ($value) {
            case 'pending':
                $this->queryBuilder->whereNull('email_verified_at');
                break;

            case 'verified':
                $this->queryBuilder->whereNotNull('email_verified_at');
                break;

            case 'trashed':
                $this->queryBuilder->onlyTrashed();
                break;
        }
    }
}
