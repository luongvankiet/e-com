<?php

namespace App\Http\Actions\UserActions;

use App\Events\RoleAssigned;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AssignRoleToUserAction
{
    public function execute(?Role $role, User $user)
    {
        $user->syncRoles($role ??= Role::where('name', 'customer')->first());

        event(new RoleAssigned($user, $role));
    }
}
