<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class OverviewController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/overview', [
            'currentRouteName' => Route::currentRouteName()
        ]);
    }
}
