<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Actions\UserActions\StoreUserAction;
use App\Http\Actions\UserActions\UpdateUserAction;
use App\Http\Controllers\Controller;
use App\Http\DTOs\UserDTO;
use App\Http\QueryFilters\UserQueryFilter;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('viewAny', User::class);

        $userQuery = User::query()->withoutSuperAdmins();
        $roleQuery = Role::query()->withoutSuperAdmins();

        $totalCount = $userQuery->clone()->count();

        $verifiedUsersCount = $userQuery
            ->clone()
            ->whereNotNull('email_verified_at')
            ->count();

        $pendingCount = $totalCount - $verifiedUsersCount;

        $trashedCount = $userQuery
            ->clone()
            ->onlyTrashed()
            ->count();

        $users = UserQueryFilter::make(
            $userQuery->with(['roles', 'defaultAddress'])
        );

        $roles = $roleQuery->get();

        return Inertia::render('dashboard/settings/users/index', [
            'users' => $users->all(),
            'roles' => $roles,
            'total' => $users->total(),
            'total_count' => $totalCount,
            'verified_count' => $verifiedUsersCount,
            'pending_count' => $pendingCount,
            'trashed_count' => $trashedCount
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('create', User::class);

        return Inertia::render(
            'dashboard/settings/users/create',
            ['roles' => Role::withoutSuperAdmins()->get()]
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(
        StoreUserRequest $request,
        StoreUserAction $storeUserAction
    ) {
        $user = ($storeUserAction)->execute(
            UserDTO::fromRequest($request)
        );

        return Redirect::route('users.edit', $user);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render(
            'dashboard/settings/users/show',
            [
                'user' => $user->loadMissing('defaultAddress'),
                'roles' => Role::withoutSuperAdmins()->get()
            ]
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        Gate::authorize('update', $user);

        return Inertia::render(
            'dashboard/settings/users/edit',
            [
                'user' => $user->loadMissing(['defaultAddress', 'image']),
                'roles' => Role::withoutSuperAdmins()->get()
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        UpdateUserRequest $request,
        UpdateUserAction $updateUserAction,
        User $user
    ) {
        ($updateUserAction)->execute(
            UserDTO::fromRequest($request),
            $user
        );

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        Gate::authorize('delete', $user);
        $user->delete();

        return redirect()->route('users.index');
    }

    public function deleteMany(Request $request)
    {
        try {
            Gate::authorize('deleteMany', User::class);

            $request->validate([
                'user_ids' => 'required|array|min:1',  // Ensures 'ids' is a non-empty array
            ]);

            $ids = $this->findNonExistingIds($request->input('user_ids'));

            User::onlyTrashed()->whereIn('id', $ids)->forceDelete();
            User::whereIn('id', $ids)->whereNull('deleted_at')->delete();

            return Redirect::back()->with('success', __('Selected items have been deleted successfully.'));
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function restoreMany(Request $request)
    {
        Gate::authorize('restore', User::class);

        try {
            $request->validate([
                'user_ids' => 'required|array|min:1',  // Ensures 'ids' is a non-empty array
            ]);

            $ids = $this->findNonExistingIds($request->input('user_ids'), true);

            User::whereIn('id', $ids)->restore();

            return Redirect::back()->with('success', __('Selected items have been restored successfully.'));
        } catch (\Exception $e) {
            return Redirect::back()->withErrors([
                'message' => $e->getMessage(),
            ]);
        }
    }

    private function findNonExistingIds(?array $ids = [], ?bool $isTrashed = false)
    {
        if (!$ids) {
            return [];
        }

        $existingIds = User::whereIn('id', $ids)
            ->withTrashed()
            ->pluck('id')
            ->toArray();

        // Compare with the original array to find non-existing IDs
        $nonExistingIds = array_diff($ids, $existingIds);

        if (!empty($nonExistingIds)) {
            throw new \Exception('Users with ids [' . implode(',', $nonExistingIds) . '] not found!');
        }

        return $ids;
    }
}
