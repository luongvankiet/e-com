<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->route('user');

        return Gate::allows('update', $user);
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
            'email' => 'required|email|unique:users,email,' . ($this->route('user') ? $this->route('user')->id : ''),
            'password' => 'nullable|min:6|confirmed',
            'role.*.id' => 'nullable|exists:roles,id',
            'default_address' => 'nullable|array',
        ];

        if (request()->hasFile('image') && request()->file('image')->isValid()) {
            $rules['image'] = 'nullable|image|mimes:jpeg,jpg,png,gif,svg|max:10000';
        }

        return $rules;
    }
}
