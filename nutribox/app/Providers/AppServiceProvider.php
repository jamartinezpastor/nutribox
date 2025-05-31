<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Lubusin\Decomposer\Decomposer;

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
        $infolaravel = [
            'DC Extension' => true,
            'Some version' => 'v 2.3',
        ];
        $infoserver = [
            'DC Extension' => true,
            'Some version' => 'v 2.3',
        ];
        $infoextra = [
            'DC Extension' => true,
            'Some version' => 'v 2.3',
        ];

        Decomposer::addLaravelStats($infolaravel);
        Decomposer::addServerStats($infoserver);
        Decomposer::addExtraStats($infoextra);


        VerifyEmail::toMailUsing(function (object $notifiable, string $url) {

            return (new MailMessage)
                ->subject('Nutribox: Verificación de email')
                ->greeting("¡Hola {$notifiable->name}!")
                ->line('Haz click en el siguiente enlace para confirmar tu dirección de correo electrónico.')
                ->action('VERIFICAR EMAIL', $url)
                ->line('Si no has creado una cuenta, ignora este mensaje.')
                ->salutation('Un saludo.');
        });
    }
}
