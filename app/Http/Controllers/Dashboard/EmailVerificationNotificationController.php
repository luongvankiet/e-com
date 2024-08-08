<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class EmailVerificationNotificationController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $user = User::whereEmail($request->input('email'))->first();

        if ($user->hasVerifiedEmail()) {
            return back()->withErrors(['message' => __('This account has been verified!')]);
        }

        $user->sendEmailVerificationNotification();

        return back()->withErrors(['message' => 'verification-link-sent']);
    }
}
