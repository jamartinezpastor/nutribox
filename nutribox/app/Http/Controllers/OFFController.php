<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Inertia\Inertia;

class OFFController extends Controller
{
    public function buscarOFF(Request $formulario)
    {
        $termino = $formulario->input('termino');

        $client = new Client([
            'timeout' => 10,
            'connect_timeout' => 5,
            'headers' => [
                'User-Agent' => 'Nutribox/1.0 (' . config('services.app_url') . ')',
            ],
        ]);
        $url = "https://world.openfoodfacts.org/cgi/search.pl?action=process&json=1&search_terms="
            . urlencode($termino)
            . "&page_size=40";
        try {
            $response = $client->get($url);

            $resultados = json_decode($response->getBody(), true); // Decodificar JSON a array

            return Inertia::render('off-buscar-resultados', [
                'termino' => $termino,
                'resultados' => $resultados,
                'error' => null, // Test ok: Siempre existe, aunque sea null
            ]);
        } catch (\Exception $e) {
            return Inertia::render('off-buscar-resultados', [
                'termino' => $termino,
                'resultados' => ['products' => []], // Test ok: Siempre existe, aunque sea vacío
                'error' => 'Error al conectar con Open Food Facts',
            ]);
        }
    }
    /*
    // Primer método (de prueba) para recibir un formulario y devolver datos mockeados
    public function recibeForm_DevuelveVariable(Request $formulario)
    {
        $termino = $formulario->input('termino');
        ///////
        // LÓGICA !!
        ///////
        $resultados = ["Alimento 1", "Alimento 2", "Alimento 3"];

        return Inertia::render('off-buscar-resultados', compact('termino', 'resultados'));
    }
    */
}
