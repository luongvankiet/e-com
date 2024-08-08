<?php

namespace App\Http\Actions\UserActions;

use App\Http\DTOs\UserDTO;
use App\Models\User;

class StoreUserAction
{
    public function execute(UserDTO $userDTO): ?User
    {
        $user = new User();

        $user->first_name = $userDTO->firstName;
        $user->last_name = $userDTO->lastName;
        $user->email = $userDTO->email;
        $user->phone = $userDTO->phone;
        $user->password = $userDTO->password;
        $user->google_id = $userDTO->googleId;
        $user->facebook_id = $userDTO->facebookId;
        $user->email_verified_at = $userDTO->emailVerifiedAt;

        $user->save();

        if ($userDTO->imageFile) {
            $user->addImage($userDTO->imageFile, $user->image);
        }

        $user->addAddress($userDTO->addressDTO);

        (new AssignRoleToUserAction)->execute($userDTO->role, $user);

        return $user;
    }
}
