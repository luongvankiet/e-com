<?php

namespace App\Providers;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            return $user->hasRole('super_admin') ? true : null;
        });

        JsonResource::withoutWrapping();

        Str::macro('toSnakeCase', function ($value) {
            // Use a regular expression to insert underscores between lowercase and uppercase characters,
            // and between letters and numbers
            $value = preg_replace('/([a-zA-Z])([0-9])/', '$1_$2', $value);
            $value = preg_replace('/([A-Z])([A-Z][a-z])/', '$1_$2', $value);
            $value = preg_replace('/([a-z0-9])([A-Z])/', '$1_$2', $value);

            // Convert to lowercase
            $input = strtolower($value);
            return $input;
        });

        Str::macro('snakeToTitle', function ($value) {
            return Str::title(Str::replace('_', ' ', $value));
        });
    }
}
