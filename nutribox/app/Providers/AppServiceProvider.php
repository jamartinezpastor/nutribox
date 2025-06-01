<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Notifications\Messages\MailMessage;
use Lubusin\Decomposer\Decomposer;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use App\Models\User;
use App\Models\Menu;
use App\Models\Comida;
use App\Models\Producto;
use Carbon\Carbon;

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

        // INFOLARAVEL
        $totalUsuarios = Cache::remember('stats_total_users', 300, function () {
            return User::count();
        });
        $totalMenus     = Cache::remember('stats_total_menus', 300, fn() => Menu::count());
        $totalComidas   = Cache::remember('stats_total_comidas', 300, fn() => Comida::count());
        $totalProductos = Cache::remember('stats_total_productos', 300, fn() => Producto::count());

        $infolaravel = [
            'APP_NAME'    => env('APP_NAME'),
            'APP_ENV'     => env('APP_ENV'),
            'APP_URL'     => env('APP_URL'),
            'MAIL_FROM_ADDRESS' => env('MAIL_FROM_ADDRESS'),
            'Usuarios'        => $totalUsuarios,
            'Menús'           => $totalMenus,
            'Comidas'         => $totalComidas,
            'Productos'       => $totalProductos,
        ];


        // INFOSERVER
        $uptimeTexto = Cache::remember('server_uptime', 300, function () {
            try {
                return trim(shell_exec('uptime -p'));
            } catch (\Throwable $e) {
                return '?';
            }
        });
        $infoserver = [
            'Uptime VPS' => $uptimeTexto ?? '?',
        ];


        // INFOEXTRA
        $comandoBackup = 'php artisan bkp:database';
        $rutaEstado = '/estado + key';
        $fechaDespliegue = env('DEPLOYED_AT');
        $tiempoOnline    = $fechaDespliegue
            ? Carbon::parse($fechaDespliegue)->diffForHumans()
            : '?';

        // PING a Open Food Facts V1
        /*
        $latenciaOFF = '?';
        $startOff    = microtime(true);
        try {
            $response = Http::timeout(2)->get('https://world.openfoodfacts.org/cgi/search.pl', [
                'action' => 'process',
                'json'   => 1
            ]);
            $latenciaOFF = round((microtime(true) - $startOff) * 1000) . ' ms';
        } catch (\Exception $e) {
            $latenciaOFF = round((microtime(true) - $startOff) * 1000) . ' ms';
        }

        // PING a Deepseek API
        $latenciaDeepseek = '?';
        try {
            $t1 = microtime(true);
            $respDeepseek = Http::timeout(2)->get('https://api.deepseek.com/v1/ping');
            $latenciaDeepseek = round((microtime(true) - $t1) * 1000) . ' ms';
        } catch (\Throwable $e) {
            $latenciaDeepseek = round((microtime(true) - $t1) * 1000) . ' ms';
        }
*/
        $infoextra = [
            'Backup BD'                 => $comandoBackup,
            'Panel de estado'                 => $rutaEstado,
            'Fecha de despliegue'               => $fechaDespliegue ?? '?',
            'Tiempo online (Desde despliegue)'    => $tiempoOnline,
            // 'Latencia API: Open Food Facts'           => $latenciaOFF,
            // 'Latencia API: Deepseek'              => $latenciaDeepseek,
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
