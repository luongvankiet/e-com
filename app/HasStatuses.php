<?php

namespace App;

use Illuminate\Database\Eloquent\Casts\Attribute;

trait HasStatuses
{
    // Get the status label
    protected function statusLabel(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->status ? $this->status->label() : "Unknown"
        );
    }

    // Get the status color
    protected function statusColor(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->status ? $this->status->color() : "error"
        );
    }

    // Scope to filter by status
    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function transitionTo(string $status)
    {
        if (!$this->statusClass) {
            return;
        }

        if (!in_array($status, app($this->statusClass)->cases())) {
            throw new \Exception('Status is invalid.');
        }

        $this->status = $status;
    }
}
