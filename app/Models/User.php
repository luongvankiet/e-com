<?php

namespace App\Models;

use App\Events\UserSaved;
use App\HasAddresses;
use App\HasImages;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory,
        Notifiable,
        HasRoles,
        SoftDeletes,
        HasImages,
        HasAddresses;

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
        'phone',
        'email_verified_at',
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
        'all_permissions',
        'role'
    ];

    protected $dispatchesEvents = [
        'saved' => UserSaved::class
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

    protected function allPermissions(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->getAllPermissions()->pluck('name'),
        );
    }

    protected function fullName(): Attribute
    {
        $name = [];

        if ($this->first_name) {
            $name[] = $this->first_name;
        }

        if ($this->last_name) {
            $name[] = $this->last_name;
        }

        return Attribute::make(
            get: fn () => implode(' ', $name),
        );
    }

    protected function role(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->roles[0] ?? null,
        );
    }

    public function customer(): HasOne
    {
        return $this->hasOne(Customer::class);
    }

    // Method to check if the user is a super admin
    public function isSuperAdmin()
    {
        return $this->hasAnyRole('super_admin');
    }

    public function scopeWithoutSuperAdmins($query)
    {
        /** @var User */
        $user = Auth::user();

        if (Auth::check() && !$user->isSuperAdmin()) {
            return $query->whereDoesntHave('roles', function ($query) {
                $query->where('name', 'super_admin');
            });
        }

        return $query;
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new \App\Notifications\VerifyEmailQueued);
    }
}
