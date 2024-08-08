<?php

namespace App\Http\DTOs;

use App\Models\Address;

class AddressDTO extends DataTransferObject
{
    public ?int $id;
    public string $addressLine1;
    public ?string $addressLine2;
    public ?string $city;
    public ?string $state;
    public ?string $country;
    public ?string $postcode;
    public ?bool $default = true;

    public static function fromRequest($request): self
    {
        return new static([
            'address_line_1' => $request->input('address_line_1'),
            'address_line_2' => $request->input('address_line_2'),
            'city' => $request->input('city'),
            'state' => $request->input('state'),
            'country' => $request->input('country'),
            'postcode' => $request->input('postcode'),
            'default' => $request->input('default', true),
        ]);
    }

    public static function fromModel(Address $address): self
    {
        return new static([
            'id' => $address->id,
            'address_line_1' => $address->address_line_1,
            'address_line_2' => $address->address_line_2,
            'city' => $address->city,
            'state' => $address->state,
            'country' => $address->country,
            'postcode' => $address->postcode,
            'default' => $address->default,
        ]);
    }

    public static function fromArray(array $address = []): self
    {
        return new static([
            'id' => $address['id'] ?? null,
            'address_line_1' => $address['address_line_1'] ?? null,
            'address_line_2' => $address['address_line_2'] ?? null,
            'city' => $address['city'] ?? null,
            'state' => $address['state'] ?? null,
            'country' => $address['country'] ?? null,
            'postcode' => $address['postcode'] ?? null,
            'default' => $address['default'] ?? true,
        ]);
    }
}
