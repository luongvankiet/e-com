<?php

use App\Http\Controllers\Dashboard\BrandController;
use App\Http\Controllers\Dashboard\CategoryController;
use App\Http\Controllers\Dashboard\EmailVerificationNotificationController;
use App\Http\Controllers\Dashboard\ImageController;
use App\Http\Controllers\Dashboard\OverviewController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\ProductVariantController;
use App\Http\Controllers\Dashboard\RoleController;
use App\Http\Controllers\Dashboard\SettingController;
use App\Http\Controllers\Dashboard\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')
    ->middleware(['auth', 'verified', 'permission:dashboard.view'])
    ->group(function () {
        Route::get('/', [OverviewController::class, 'index'])
            ->name('dashboard');

        //Category Routes
        Route::post('categories/delete-many', [CategoryController::class, 'deleteMany'])
            ->name('categories.delete-many');
        Route::post('categories/restore-many', [CategoryController::class, 'restoreMany'])
            ->name('categories.restore-many');
        Route::resource('categories', CategoryController::class);

        //Brand Routes
        Route::post('brands/delete-many', [BrandController::class, 'deleteMany'])
            ->name('brands.delete-many');
        Route::post('brands/restore-many', [BrandController::class, 'restoreMany'])
            ->name('brands.restore-many');
        Route::resource('brands', BrandController::class);

        //Product Routes
        Route::prefix('products/{product}')
            ->group(function () {
                Route::post('variants/delete-many', [ProductVariantController::class, 'deleteMany'])
                    ->name('variants.delete-many');
                Route::resource('variants', ProductVariantController::class);
            });

        Route::post('products/delete-many', [ProductController::class, 'deleteMany'])
            ->name('products.delete-many');
        Route::post('products/restore-many', [ProductController::class, 'restoreMany'])
            ->name('products.restore-many');
        Route::resource('products', ProductController::class);

        Route::resource('images', ImageController::class);

        Route::prefix('settings')
            ->middleware(['auth', 'verified'])
            ->group(function () {
                Route::get('/', [SettingController::class, 'index'])->name('settings');

                //User Routes
                Route::post('users/resend-verify-email', [EmailVerificationNotificationController::class, 'store'])
                    ->name('users.resend-verify-email');
                Route::post('users/restore-many', [UserController::class, 'restoreMany'])
                    ->name('users.restore-many');
                Route::post('users/delete-many', [UserController::class, 'deleteMany'])
                    ->name('users.delete-many');
                Route::resource('users', UserController::class);

                //Roles Routes
                Route::post('roles/delete-many', [RoleController::class, 'deleteMany'])
                    ->name('roles.delete-many');
                Route::resource('roles', RoleController::class);
            });
    });
