<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'       => ['required', 'string', 'max:255'],
            'email'      => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($this->user()->id),
            ],
            'sexo'       => ['required', Rule::in(['Masculino', 'Femenino'])],
            'edad'       => ['required', 'integer', 'min:0', 'max:150'],
            'altura'     => ['required', 'integer', 'min:50', 'max:300'],
            'peso'       => ['required', 'numeric', 'min:20', 'max:500'],
            'actividad'  => ['required', 'string', 'max:50'],
            'info_extra' => ['nullable', 'string', 'max:1000'],
        ];
    }
}
