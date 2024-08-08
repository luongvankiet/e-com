<?php

namespace App;

use Illuminate\Support\Str;

trait Sluggable
{
    protected $slugFromColumn = 'name';

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::creating(function ($model) {
            $model->generateUniqueSlug();
        });


        static::updating(function ($model) {
            $model->generateUniqueSlug();
        });
    }

    // public function getRouteKeyName()
    // {
    //     return 'slug';
    // }

    public function scopeSlug($query, $value = '')
    {
        $query->where('slug', $value);
    }

    private function generateUniqueSlug()
    {
        $column = $this->slugFromColumn ?? 'name'; // Default to 'name' if not specified
        $slug = Str::slug($this->{$column});
        $originalSlug = $slug;

        // Ensure uniqueness
        $count = 1;
        while ($this->slugExists($slug)) {
            $slug = $originalSlug . '-' . $count++;
        }

        $this->slug = $slug;
    }

    protected function slugExists($slug)
    {
        $query = static::where('slug', $slug);
        if ($this->exists) {
            $query->where('id', '<>', $this->id);
        }
        return $query->exists();
    }
}
