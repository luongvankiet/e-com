<?php

use App\Http\Controllers\Dashboard\OverviewController;
use App\Http\Controllers\Dashboard\RoleController;
use App\Http\Controllers\Dashboard\SettingController;
use App\Http\Controllers\Dashboard\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')
    ->middleware(['auth', 'verified'])
    ->group(function () {
        Route::get('/', [OverviewController::class, 'index'])
            ->name('dashboard');


        Route::prefix('settings')
            ->middleware(['auth', 'verified'])
            ->group(function () {
                Route::get('/', [SettingController::class, 'index'])->name('settings');

                Route::resource('users', UserController::class)->names('settings.users');
                Route::resource('roles', RoleController::class)->names('settings.roles');
            });
    });
