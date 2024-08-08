<?php

namespace App\Http\Actions\RoleActions;

use App\Http\DTOs\RoleDTO;
use Spatie\Permission\Models\Role;

class UpdateRoleAction
{
    public function execute(RoleDTO $roleDTO, Role $role): ?Role
    {
        $role->update([
            'name' => $roleDTO->name,
            'display_name' => $roleDTO->displayName,
            'description' => $roleDTO->description
        ]);

        if (!empty($roleDTO->permissions)) {
            $role->syncPermissions($roleDTO->permissions);
        }

        return $role;
    }
}
