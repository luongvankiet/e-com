<?php

namespace App\Listeners;

use App\Events\RoleAssigned;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class CreateCustomerWhenAssignedRole implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(RoleAssigned $event): void
    {
        $user = $event->user;
        $role = $event->role;

        if ($role && $role->name === 'customer' && !$user->customer) {
            $user->customer()->create();
        }
    }
}
