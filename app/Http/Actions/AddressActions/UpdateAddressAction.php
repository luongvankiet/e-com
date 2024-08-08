<?php

namespace App\Http\Actions\AddressActions;

use App\Http\DTOs\AddressDTO;
use App\Models\Address;

class UpdateAddressAction
{
    public function execute(AddressDTO $addressDTO, Address $address): ?Address
    {
        $address->address_line_1 = $addressDTO->addressLine1;
        $address->address_line_2 = $addressDTO->addressLine2;
        $address->city = $addressDTO->city;
        $address->state = $addressDTO->state;
        $address->country = $addressDTO->country;
        $address->postcode = $addressDTO->postcode;
        $address->default = $addressDTO->default;

        $address->save();

        return $address;
    }
}
