<?php

namespace App\Http\DTOs;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;

class RoleDTO extends DataTransferObject
{
    public string $name;
    public string $displayName;
    public ?string $description;
    public Collection $permissions;

    public  static function fromRequest($request): self
    {
        $displayName = $request->input('name');
        $name = Str::snake($displayName);

        $permissionsRequest = collect($request->input('permissions', []))
            ->pluck('name');

        $permissions = Permission::whereIn('name', $permissionsRequest)
            ->get();

        return new static([
            'name' => $name,
            'display_name' => $displayName,
            'description' => $request->input('description'),
            'permissions' => $permissions
        ]);
    }
}
