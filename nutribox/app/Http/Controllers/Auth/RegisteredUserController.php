<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $formulario): RedirectResponse
    {
        $formulario->validate([
            'name' => 'required|string|max:255',
            'edad' => 'required|integer|min:0|max:120',
            'sexo' => 'required|string',
            'altura' => 'required|integer|min:50|max:300',
            'peso' => 'required|numeric|min:20|max:500',
            'actividad' => 'required|string',
            'info_extra' => 'nullable|string',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $formulario->name,
            'edad' => $formulario->edad,
            'sexo' => $formulario->sexo,
            'altura' => $formulario->altura,
            'peso' => $formulario->peso,
            'actividad' => $formulario->actividad,            
            'info_extra' => $formulario->info_extra,
            'email' => $formulario->email,
            'password' => Hash::make($formulario->password),
        ]);


        event(new Registered($user));

        Auth::login($user);

        return to_route('inicio');
    }
}
