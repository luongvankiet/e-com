<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Gate::allows('create', User::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'phone' => 'required',
            'role.*.id' => 'nullable|exists:roles,id',
            'default_address' => 'nullable|array',
        ];

        if (request()->hasFile('image') && request()->file('image')->isValid()) {
            $rules['image'] = 'nullable|image|mimes:jpeg,jpg,png,gif,svg|max:10000';
        }

        return $rules;
    }
}
