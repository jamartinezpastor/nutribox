<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */

    public function boot()
    {
        /*
        Inertia::share([
            'auth.user' => function () {
                if (! Auth::check()) {
                    return null;
                }

                return Auth::user()->only([
                    'id',
                    'name',
                    'email',
                    'email_verified_at',                 
                    'sexo',
                    'edad',
                    'altura',
                    'peso',
                    'actividad',
                    'info_extra',
                ]);
            },    
        ]);
        */
    }
}
