<?php

namespace App\Http\Middleware;

use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()
            ],
            'current_route_name' => Route::currentRouteName(),
            'location' => $request->url(),
            'query' => $request->query(),
            'tags' => Schema::hasTable('tags')
                ? Tag::all()
                : [],
        ];
    }
}
