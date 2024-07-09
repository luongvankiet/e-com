<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasRoles, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $appends = [
        'full_name',
        'role',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Method to check if the user is a super admin
    public function isSuperAdmin()
    {
        return $this->hasAnyRole('super_admin');
    }

    public function scopeWithoutSuperAdmins($query)
    {
        return $query->whereDoesntHave('roles', function ($query) {
            $query->where('name', 'super_admin');
        });
    }

    public function getFullNameAttribute()
    {
        $name = [];

        if ($this->first_name) {
            $name[] = $this->first_name;
        }

        if ($this->last_name) {
            $name[] = $this->last_name;
        }

        return implode(' ', $name);
    }

    public function getRoleAttribute()
    {
        return isset($this->resource->roles[0])
            ? $this->roles[0]
            : null;
    }
}
