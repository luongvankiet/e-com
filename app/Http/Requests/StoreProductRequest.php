<?php

namespace App\Http\Requests;

use App\Models\Product;
use App\ProductStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('create', Product::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'product_code' => 'nullable|string|max:255',
            'product_sku' => 'nullable|string|max:255',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'regular_price' => 'nullable|numeric|min:0',
            'sale_price' => 'nullable|numeric|min:0',
            'quantity' => 'nullable|numeric|min:0',
            'status' => ['required', Rule::enum(ProductStatus::class)],
            'brand_id' => ['nullable', 'exists:brands,id'],
            'image_files.*' => 'nullable|image|mimes:jpeg,jpg,png,gif,svg|max:10000'
        ];
    }

    public function attributes()
    {
        return [
            'short_description' => __('short description'),
            'product_code' => __('product code'),
            'product_sku' => __('SKU'),
            'regular_price' => __('regular price'),
            'sale_price' => __('sale price'),
            'brand_id' => __('brand'),
            'short_description' => __('short description'),
        ];
    }

    public function messages()
    {
        return [
            'image_files.max' => 'A maximum of 20 images are allowed',
            'image_files.*.mimes' => 'Only jpeg, jpg, png, gif and svg images are allowed',
            'image_files.*.max' => 'Maximum allowed size for an image is 10MB',
        ];
    }
}
