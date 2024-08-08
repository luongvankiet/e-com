<?php

namespace App;

use App\Http\Actions\AddressActions\UpdateAddressAction;
use App\Http\DTOs\AddressDTO;
use App\Models\Address;
use Illuminate\Database\Eloquent\Relations\MorphOneOrMany;

trait HasAddresses
{
    public function addresses(): MorphOneOrMany
    {
        return $this->morphMany(Address::class, 'addressable');
    }

    public function address(): MorphOneOrMany
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function defaultAddress(): MorphOneOrMany
    {
        return $this->morphOne(Address::class, 'addressable')->whereDefault(true);
    }

    public function addAddress(AddressDTO $addressDTO)
    {
        $this->addresses()->create($addressDTO->toArray());
    }

    public function removeAddress($addressId)
    {
        $address = $this->addresses()->find($addressId);
        if ($address) {
            $address->delete();
        }
    }

    public function updateAddress(AddressDTO $addressDTO, ?Address $address)
    {
        if ($address) {
            return (new UpdateAddressAction)->execute($addressDTO, $address);
        }

        $this->addAddress($addressDTO);
    }
}
