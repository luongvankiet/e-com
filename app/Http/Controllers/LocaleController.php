<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    public function index($locale)
    {
        Session::put('locale', $locale);
        App::setLocale($locale);

        $path = resource_path("lang/$locale.json");

        if (!file_exists($path)) {
            return response()->json(['error' => 'File not found.'], 404);
        }

        return response()->json(json_decode(file_get_contents($path)));
    }

    public function switch(Request $request, $locale)
    {
        Session::put('locale', $locale);
        App::setLocale($locale);

        return redirect()->back();
    }
}
