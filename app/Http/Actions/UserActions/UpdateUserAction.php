<?php

namespace App\Http\Actions\UserActions;

use App\Http\Actions\ImageActions\DeleteImageAction;
use App\Http\DTOs\UserDTO;
use App\Models\Address;
use App\Models\User;

class UpdateUserAction
{
    public function execute(UserDTO $userDTO, User $user): ?User
    {
        $user->first_name = $userDTO->firstName;
        $user->last_name = $userDTO->lastName;
        $user->email = $userDTO->email;
        $user->phone = $userDTO->phone;
        $user->google_id = $userDTO->googleId;
        $user->facebook_id = $userDTO->facebookId;
        $user->email_verified_at = $userDTO->emailVerifiedAt;

        if ($userDTO->password) {
            $user->password = $userDTO->password;
        }

        if (!$user->save()) {
            return null;
        }

        if (!$userDTO->imageFile) {
            (new DeleteImageAction)->execute($user->image);
        } else {
            $user->addImage($userDTO->imageFile, $user->image);
        }

        if ($userDTO->addressDTO) {
            $user->updateAddress($userDTO->addressDTO, Address::find($userDTO->addressDTO->id));
        }

        (new AssignRoleToUserAction)->execute($userDTO->role, $user);

        return $user;
    }
}
