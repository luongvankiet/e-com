<?php

namespace App\Policies;

use App\Models\User;
use App\Policies\Concerns\PolicyResponse;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    use PolicyResponse;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return $this->response(
            $user,
            'users.view-any',
            'You do not have permission to view all users!'
        );
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): Response
    {
        if ($model->hasAnyRole('super_admin')) {
            return $this->deny('You do not have permission to view Super Admin users!');
        }

        return $this->response(
            $user,
            'users.view-any',
            'You do not have permission to view all users!'
        );
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return $this->response(
            $user,
            'users.create',
            'You do not have permission to create new user!'
        );
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): Response
    {
        if ($model->hasAnyRole('super_admin')) {
            return $this->deny('You do not have permission to update Super Admin user!');
        }

        return $this->response(
            $user,
            'users.update',
            'You do not have permission to update user!'
        );
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): Response
    {
        if ($model->hasAnyRole('super_admin')) {
            return $this->deny('You do not have permission to delete Super Admin user!');
        }

        return $this->response(
            $user,
            'users.delete',
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
            'users.delete',
            'You do not have permission to delete multiple users!'
        );
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user): Response
    {
        return $this->response(
            $user,
            'users.restore',
            'You do not have permission to restore users!'
        );
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user): Response
    {
        return $this->response(
            $user,
            'users.force-delete',
            'You do not have permission to delete users!'
        );
    }

    /**
     * Determine whether the user can assign role to the model.
     */
    public function assignRole(User $user): Response
    {
        return $this->response(
            $user,
            'users.assign-roles',
            'You do not have permission to assign roles to users!'
        );
    }
}
