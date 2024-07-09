<?php

namespace App\Http\QueryFilters;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class UserQueryFilter extends QueryFilter
{
    protected $searchable = [
        'first_name',
        'last_name',
        'email',
    ];

    protected $sortable = [
        'first_name',
        'last_name',
        'created_at'
    ];

    protected $defaultSortBy = 'updated_at';

    // public function indexQuery()
    // {
    //     /** @var \App\Models\User $user*/
    //     $user = Auth::user();

    //     if (Auth::check() && !$user->isSuperAdmin()) {
    //         $this->queryBuilder->withoutSuperAdmins();
    //     }
    // }

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
