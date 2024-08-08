<?php

namespace Database\Seeders;

use App\Events\RoleAssigned;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()['cache']->forget('spatie.permission.cache');

        // fetch permissions from config file
        $permissions = config('permissions.default_permissions');

        $allPermissions = collect();
        foreach ($permissions as $permissionGroup) {
            foreach ($permissionGroup as $permission) {
                $allPermissions->push(Permission::updateOrCreate(
                    ['name' => $permission['name']],
                    ['description' => $permission['description']]
                ));
            }
        }

        $roles = config('permissions.default_roles');

        foreach ($roles as $role) {
            $newRole = Role::firstOrCreate(
                [
                    'name' => $role['name']
                ],
                [
                    'display_name' => $role['display_name'],
                    'description' => $role['description'],
                ]
            );

            for ($i = 1; $i <= 5; $i++) {
                $user = \App\Models\User::factory()
                    ->hasAddresses(1)
                    ->hasImage(1)
                    ->create([
                        'email' => "{$role['name']}{$i}@example.com",
                        'email_verified_at' => $role['name'] === 'customer' ? fake()->randomElement([now(), null]) : now(),
                        'deleted_at' => $role['name'] === 'customer' ? fake()->randomElement([now(), null]) : null,
                    ]);

                $user->assignRole($newRole);

                RoleAssigned::dispatch($user, $newRole);
            }

            if ($newRole->name === 'admin') {
                $newRole->syncPermissions($allPermissions);
                continue;
            }

            if (!isset($role['permissions'])) {
                continue;
            }

            $newRole->syncPermissions(
                Permission::whereIn('name', $role['permissions'])
                    ->get()
            );
        }
    }
}
