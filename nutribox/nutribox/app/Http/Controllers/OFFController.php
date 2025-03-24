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

        $client = new Client();
        $url = "https://world.openfoodfacts.org/cgi/search.pl?action=process&json=1&search_terms=" . urlencode($termino);
        try {
            $response = $client->get($url);
            $resultados = json_decode($response->getBody(), true); // Decodificar JSON a array

            return Inertia::render('OFF_buscar_resultados', compact('termino', 'resultados'));
        } catch (\Exception $e) {
            return Inertia::render('OFF_buscar_resultados', ['error' => 'Error al conectar con Open Food Facts']);
        }
    }

    public function recibeForm_DevuelveVariable(Request $formulario)
    {
        $termino = $formulario->input('termino');

        ///////
        // LÓGICA !!
        ///////

        $resultados = ["Alimento 1", "Alimento 2", "Alimento 3"];

        return Inertia::render('OFF_buscar_resultados', compact('termino', 'resultados'));
    }
}
