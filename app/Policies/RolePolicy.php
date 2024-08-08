<?php

namespace App\Policies;

use App\Models\Role;
use App\Models\User;
use App\Policies\Concerns\PolicyResponse;
use Illuminate\Auth\Access\Response;

class RolePolicy
{
    use PolicyResponse;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return $this->response(
            $user,
            'roles.view-any',
            'You do not have permission to view all roles!'
        );
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Role $role): Response
    {
        if ($role->name === 'super_admin') {
            return $this->deny('You do not have permission to view Super Admin role!');
        }

        return $this->response(
            $user,
            'roles.view',
            'You do not have permission to view role detail!'
        );
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return $this->response(
            $user,
            'roles.create',
            'You do not have permission to create new role!'
        );
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Role $role): Response
    {
        if ($role->name == 'super_admin') {
            return $this->deny('You do not have permission to update Super Admin role!');
        }

        return $this->response(
            $user,
            'roles.update',
            'You do not have permission to update role!'
        );
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Role $role): Response
    {
        if ($role->name === 'super_admin') {
            return $this->deny('You do not have permission to delete Super Admin role!');
        }

        return $this->response(
            $user,
            'roles.delete',
            'You do not have permission to delete user!'
        );
    }

    /**
     * Determine whether the user can delete many models.
     */
    public function deleteMany(User $user): Response
    {
        return $this->response(
            $user,
            'roles.delete',
            'You do not have permission to delete users!'
        );
    }

    /**
     * Determine whether the user can assign permissions to the model.
     */
    public function assignPermissions(User $user): Response
    {
        return $this->response(
            $user,
            'roles.assign-permissions',
            'You do not have permission to assign permissions to role!'
        );
    }
}
