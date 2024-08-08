<?php

namespace App\Http\DTOs;

use App\Models\Address;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserDTO extends DataTransferObject
{
    public string $firstName;
    public string $lastName;
    public string $email;
    public ?Carbon $emailVerifiedAt;
    public ?string $password;
    public ?string $googleId;
    public ?string $facebookId;
    public ?string $phone;
    public ?Role $role;
    public ?AddressDTO $addressDTO;
    public array|UploadedFile|null $imageFile;

    public static function fromRequest($request): self
    {
        $roleRequest = $request->input('role');
        $roleId = $roleRequest['id'] ?? null;

        return new static([
            'first_name' => $request->input('first_name'),
            'last_name' => $request->input('last_name'),
            'email' => $request->input('email'),
            'password' => $request->filled('password')
                ? Hash::make($request->input('password'))
                : null,
            'google_id' => $request->input('google_id'),
            'facebook_id' => $request->input('facebook_id'),
            'phone' => $request->input('phone'),
            'addressDTO' => $request->filled('default_address')
                ? AddressDTO::fromArray($request->input('default_address'))
                : null,
            'role' => Role::find($roleId),
            'image_file' => $request->image,
            'email_verified_at' =>  $request->filled('email_verified_at')
                ? Carbon::parse($request->input('email_verified_at'))
                : null,
        ]);
    }
}
