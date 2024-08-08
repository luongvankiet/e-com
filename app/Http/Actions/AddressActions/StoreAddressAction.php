<?php

namespace App\Http\Actions\AddressActions;

use App\Http\DTOs\AddressDTO;
use App\Models\Address;

class StoreAddressAction
{
    public function execute(AddressDTO $addressDTO): ?Address
    {
        if (!$addressDTO->addressLine1) {
            return null;
        }

        $address = new Address();

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
