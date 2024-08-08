<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{
    use HasFactory;


    public function scopeWithoutSuperAdmins($query)
    {
        /** @var User */
        $user = Auth::user();

        if (Auth::check() && !$user->isSuperAdmin()) {
            $query->whereNot('name', 'super_admin');
        }

        return $query;
    }
}
