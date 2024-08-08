<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;
use App\Policies\Concerns\PolicyResponse;
use Illuminate\Auth\Access\Response;

class CategoryPolicy
{
    use PolicyResponse;

    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return $this->response(
            $user,
            'categories.view-any',
            'You do not have permission to view all categories!'
        );
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Category $category): Response
    {
        return $this->response(
            $user,
            'categories.view',
            'You do not have permission to view category detail!'
        );
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return $this->response(
            $user,
            'categories.create',
            'You do not have permission to create new category!'
        );
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): Response
    {
        return $this->response(
            $user,
            'categories.update',
            'You do not have permission to update existing category!'
        );
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): Response
    {
        return $this->response(
            $user,
            'categories.delete',
            'You do not have permission to delete category!'
        );
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user): Response
    {
        return $this->response(
            $user,
            'categories.restore',
            'You do not have permission to restore categories!'
        );
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user): Response
    {
        return $this->response(
            $user,
            'categories.delete',
            'You do not have permission to delete categories!'
        );
    }
}
