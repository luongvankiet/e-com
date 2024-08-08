<?php

namespace App\Policies\Concerns;

use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\Access\Response;

trait PolicyResponse
{
    public function response(User $user, string $permission, string $message): Response
    {
        return $user->can($permission)
            ? Response::allow()
            : $this->deny($message);
    }

    public function deny(string $message): Response
    {
        throw new AuthorizationException($message);
    }
}
