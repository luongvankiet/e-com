<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VerifyEmailQueued extends VerifyEmail implements ShouldQueue
{
    use Queueable;

    // Nothing else needs to go here unless you want to customize
    // the notification in any way.
}
