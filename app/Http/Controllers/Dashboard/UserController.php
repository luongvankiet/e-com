<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\QueryFilters\UserQueryFilter;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userQuery = User::query()->with('roles');
        $totalQuery = User::query();
        $verifiedUsersQuery = User::whereNotNull('email_verified_at');
        $trashedUsersQuery = User::onlyTrashed();

        /** @var \App\Models\User $user*/
        $user = Auth::user();

        if (
            Auth::check()
            && $user
            && !$user->isSuperAdmin()
        ) {
            $userQuery->withoutSuperAdmins();
            $totalQuery->withoutSuperAdmins();
            $verifiedUsersQuery->withoutSuperAdmins();
            $trashedUsersQuery->withoutSuperAdmins();
        }

        $totalCount = $totalQuery->count();
        $verifiedUsersCount = $verifiedUsersQuery->count();
        $trashedUsersCount = $trashedUsersQuery->count();

        $userQueryFilter = UserQueryFilter::make(
            $userQuery
        );

        return Inertia::render('dashboard/settings/users/index', [
            'users' => $userQueryFilter->all(),
            'roles' => Role::all(),
            'users_count' => $userQueryFilter->count(),
            'total_count' => $totalCount,
            'verified_count' => $verifiedUsersCount,
            'pending_count' => $totalCount - $verifiedUsersCount,
            'trashed_count' => $trashedUsersCount
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
