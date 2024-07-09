<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/settings/index');
    }
}
