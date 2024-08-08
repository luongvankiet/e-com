<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Actions\RoleActions\StoreRoleAction;
use App\Http\Actions\RoleActions\UpdateRoleAction;
use App\Http\Controllers\Controller;
use App\Http\DTOs\RoleDTO;
use App\Http\QueryFilters\RoleQueryFilter;
use App\Http\Requests\StoreRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use App\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', Role::class);

        $roles = RoleQueryFilter::make(
            Role::query()
                ->with('permissions')
                ->withCount('permissions')
        );

        return Inertia::render('dashboard/settings/roles/index', [
            'roles' => $roles->all(),
            'total' => $roles->total(),
            'permissions' => config('permissions.default_permissions'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', Role::class);
        return Inertia::render('dashboard/settings/roles/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreRoleRequest $request,
        StoreRoleAction $storeRoleAction
    ) {
        return redirect()->route(
            'settings.users.edit',
            $storeRoleAction->execute(
                RoleDTO::fromRequest($request)
            )
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        return Inertia::render('dashboard/roles/show', [
            $role
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        Gate::authorize('update', Role::class);

        return Inertia::render('dashboard/settings/roles/edit', [
            $role->loadMissing('permissions'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateRoleRequest $request,
        UpdateRoleAction $updateRoleAction,
        Role $role
    ) {
        $updateRoleAction->execute(RoleDTO::fromRequest($request), $role);

        return redirect()->back()->with('status', 'success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        Gate::authorize('delete', $role);
        $role->delete();

        return back();
    }

    public function deleteMany(Request $request)
    {
        try {
            $request->validate([
                'role_ids' => 'required|array|min:1',  // Ensures 'ids' is a non-empty array
            ]);

            $existingIds = $this->findNonExistingIds($request->input('role_ids'));

            Role::whereIn('id', $existingIds)->delete();

            return back()->with('success', __('Selected items have been deleted successfully.'));
        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => $e->getMessage(),
            ]);
        }
    }

    private function findNonExistingIds(array $ids = [])
    {
        // Retrieve all IDs that exist in the database
        $existingIds = Role::whereIn('id', $ids)
            ->pluck('id')
            ->toArray();

        // Compare with the original array to find non-existing IDs
        $nonExistingIds = array_diff($ids, $existingIds);

        if (!empty($nonExistingIds)) {
            throw new \Exception('Roles with ids [' . implode(',', $nonExistingIds) . '] not found!');
        }

        return $existingIds;
    }
}
