<?php

use App\Http\Controllers\LocaleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;

Route::group(
    [
        'prefix' => LaravelLocalization::setLocale(),
        'middleware' => ['localeSessionRedirect', 'localizationRedirect', 'localeViewPath']
    ],
    function () {
        Route::get('/greeting', function () {
            return LaravelLocalization::getSupportedLanguagesKeys();
            return view('welcome');
        });
    }
);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/locales/{locale}.json', [LocaleController::class, 'index']);

Route::get('/locale/{locale}', [LocaleController::class, 'switch']);

require __DIR__ . '/auth.php';
require __DIR__ . '/dashboard.php';
