<?php

namespace App\Http\DTOs;

use Illuminate\Support\Str;
use InvalidArgumentException;

abstract class DataTransferObject
{
    public function __construct(array $parameters = [])
    {
        foreach ($parameters as $key => $value) {
            $propertyName = Str::camel($key);

            if (!property_exists($this, $propertyName)) {
                throw new InvalidArgumentException(sprintf('The [%s] is not exists.', $key));
            }

            $this->{$propertyName} = $value;
        }
    }

    public function toArray()
    {
        $values = [];

        foreach ($this as $key => $value) {
            $propertyName = Str::toSnakeCase($key);
            $values[$propertyName] = is_object($value) ? $value->toArray() : $value;
        }

        return $values;
    }
}
