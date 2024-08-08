<?php

namespace App\Policies;

use App\Models\Brand;
use App\Models\User;
use App\Policies\Concerns\PolicyResponse;
use Illuminate\Auth\Access\Response;

class BrandPolicy
{
    use PolicyResponse;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return $this->response(
            $user,
            'brands.view-any',
            'You do not have permission to view all brands!'
        );
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Brand $brand): Response
    {
        return $this->response(
            $user,
            'brands.view',
            'You do not have permission to view brand detail!'
        );
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return $this->response(
            $user,
            'brands.create',
            'You do not have permission to create new brand!'
        );
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): Response
    {
        return $this->response(
            $user,
            'brands.update',
            'You do not have permission to update existing brand!'
        );
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): Response
    {
        return $this->response(
            $user,
            'brands.delete',
            'You do not have permission to delete brand!'
        );
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user): Response
    {
        return $this->response(
            $user,
            'brands.restore',
            'You do not have permission to restore brands!'
        );
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user): Response
    {
        return $this->response(
            $user,
            'brands.delete',
            'You do not have permission to delete brands!'
        );
    }
}
