<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class OFFController extends Controller
{
    public function buscar(Request $request)
    {
        $query = $request->input('search');  // Obtiene el término de búsqueda del formulario

        // Verifica que el usuario haya ingresado un término
        if (!$query) {
            return response()->json(['error' => 'Debe ingresar un alimento para buscar'], 400);
        }

        // Crear el cliente HTTP
        $client = new Client();

        // URL de la API con el término de búsqueda
        $url = "https://world.openfoodfacts.org/cgi/search.pl?action=process&json=1&search_terms=" . urlencode($query);
        try {
            // Hacer la petición a Open Food Facts
            $response = $client->get($url);
            $data = json_decode($response->getBody(), true); // Decodificar JSON a array

            // Devolver los productos encontrados
            return view('busq_resultados', ['productos' => $data['products'] ?? []]);
        } catch (\Exception $e) {
            return view('busq_resultados', ['error' => 'Error al conectar con Open Food Facts']);
        }
    }
}