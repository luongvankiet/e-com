<?php

use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')
    ->middleware('auth')
    ->group(function () {
        Route::get('/', []);
    });
