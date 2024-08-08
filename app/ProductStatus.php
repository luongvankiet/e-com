<?php

namespace App;

use Illuminate\Support\Str;

enum ProductStatus: string
{
    case NEW = 'new';
    case BEST_SELLER = 'best_seller';
    case SALE = 'sale';
    case CLEARANCE = 'clearance';
    case IN_STOCK = 'in_stock';
    case OUT_OF_STOCK = 'out_of_stock';
    case DISCONTINUED = 'discontinued';

    public function color(): string
    {
        return match ($this) {
            ProductStatus::NEW => 'primary',
            ProductStatus::BEST_SELLER => 'success',
            ProductStatus::SALE => 'success',
            ProductStatus::CLEARANCE => 'warning',
            ProductStatus::IN_STOCK => 'secondary',
            ProductStatus::OUT_OF_STOCK => 'warning',
            ProductStatus::DISCONTINUED => 'error',
        };
    }

    public function label(): string
    {
        return match ($this) {
            ProductStatus::NEW => __(Str::snakeToTitle(ProductStatus::NEW->value)),
            ProductStatus::BEST_SELLER => __(Str::snakeToTitle(ProductStatus::BEST_SELLER->value)),
            ProductStatus::SALE => __(Str::snakeToTitle(ProductStatus::SALE->value)),
            ProductStatus::CLEARANCE => __(Str::snakeToTitle(ProductStatus::CLEARANCE->value)),
            ProductStatus::IN_STOCK => __(Str::snakeToTitle(ProductStatus::IN_STOCK->value)),
            ProductStatus::OUT_OF_STOCK => __(Str::snakeToTitle(ProductStatus::OUT_OF_STOCK->value)),
            ProductStatus::DISCONTINUED => __(Str::snakeToTitle(ProductStatus::DISCONTINUED->value)),
        };
    }
}
