<?php

namespace App;

use Carbon\Carbon;

trait Publishable
{
    public function scopePublished($query, $value = true)
    {
        if ($value === 'false' || $value === false) {
            $query->whereNull('published_at')
                ->orWhere('published_at', '>', Carbon::now());
        } else {
            $query->where(function ($query) {
                $query->whereNotNull('published_at')
                    ->orWhere('published_at', '<=', Carbon::now());
            });
        }
    }
}
