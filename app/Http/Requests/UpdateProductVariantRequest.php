<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductVariantRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'options' => ['required', 'array', 'min:1'],
            'options.*.name' => ['required', 'string', 'max:255'],
            'options.*.value' => ['required', 'string', 'max:255'],
            'quantity' => ['required', 'numeric', 'min:0'],
            'regular_price' => ['required', 'numeric', 'min:0'],
            'sale_price' => ['required', 'numeric', 'min:0'],
            'image' => ['nullable', 'mimes:jpeg,jpg,png,gif,svg', 'max:10000'],
        ];
    }

    public function attributes(): array
    {
        return [
            'sale_price' => __('sale price'),
            'regular_price' => __('regular price'),
            'options.*.name' => __('option name'),
            'options.*.value' => __('option value'),
        ];
    }
}
