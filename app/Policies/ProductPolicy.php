<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;
use App\Policies\Concerns\PolicyResponse;
use Illuminate\Auth\Access\Response;

class ProductPolicy
{
    use PolicyResponse;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return $this->response(
            $user,
            'products.view-any',
            'You do not have permission to view all products!'
        );
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Product $product): Response
    {
        return $this->response(
            $user,
            'products.view',
            'You do not have permission to view product detail!'
        );
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return $this->response(
            $user,
            'products.create',
            'You do not have permission to create new product!'
        );
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): Response
    {
        return $this->response(
            $user,
            'products.update',
            'You do not have permission to update existing product!'
        );
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): Response
    {
        return $this->response(
            $user,
            'products.delete',
            'You do not have permission to delete product!'
        );
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user): Response
    {
        return $this->response(
            $user,
            'products.restore',
            'You do not have permission to restore products!'
        );
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Product $product): Response
    {
        return $this->response(
            $user,
            'products.delete',
            'You do not have permission to delete products!'
        );
    }
}
