<?php

namespace App;

use App\Models\Tag;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

trait HasTags
{
    protected function tagsName(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->tags->pluck('name')->toArray(),
        );
    }

    public function tags(): MorphToMany
    {
        return $this->morphToMany(Tag::class, 'taggable');
    }

    public function tag(array $tags)
    {
        $tagIds = [];
        foreach ($tags as $tagName) {
            $tag = Tag::firstOrCreate(['name' => $tagName]);
            $tagIds[] = $tag->id;
        }
        $this->tags()->sync($tagIds);
    }

    public function untag(array $tags)
    {
        $tagIds = Tag::whereIn('name', $tags)->pluck('id')->toArray();
        $this->tags()->detach($tagIds);
    }

    public function retag(array $tags)
    {
        $this->untag($this->tags->pluck('name')->toArray());
        $this->tag($tags);
    }
}
