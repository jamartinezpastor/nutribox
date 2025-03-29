<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DeepSeek\DeepSeekClient;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;

class DeepSeekController extends Controller
{
    public function evaluarDS(Request $formulario)
    {
        $producto = $formulario->input('producto');
        $cantidad = $formulario->input('cantidad');
        $patologia = $formulario->input('patologia');
        $prompt = "Analiza el siguiente alimento (en la cantidad señalada) desde la perspectiva de un médico endocrino (especialista en nutrición y dietética) considerando que el paciente al que va destinado padece la patología $patologia :\n
        Alimento: $producto\n
        Cantidad: $cantidad g/ml\n
        Indica si es adecuado para este tipo de pacientes y sus posibles riesgos para personas con $patologia .
        La respuesta debe ser muy muy breve, concisa y enfocada a una persona que tiene $patologia, pero también debes tener en cuenta las posibles formas de cocinar el alimento, nutriente o plato.
        La respuesta debe estar basada en evidencia, papers cientificos o estudios (lo más recientes posibles), si te has basado en algún estudio, bibliografia o evidencia, añádelo entre paréntesis al final.
        Tómate tu tiempo, la precisión de la respuesta es muy importante.";

        try {
            // Petición a la API de Pexels
            $response = DeepSeekClient::build(env('DEEPSEEK_API_KEY'))
                ->query($prompt)
                ->run();

            // Decodifica la respuesta JSON.. con true array asociativo!
            $responseArray = json_decode($response, true);

            // Verifica si la decodificación fue exitosa
            if (json_last_error() === JSON_ERROR_NONE) {
                $analisis = $responseArray['choices'][0]['message']['content'];
                // Reemplazar " **" con "<b>"
                // $analisis = preg_replace('/\s\*\*/', ' <b>', $analisis);
                // Reemplazar "** " con "</b>"
                // $analisis = preg_replace('/\*\*\s/', '</b> ', $analisis);

                // Eliminar cualquier "**" restante
                $analisis = str_replace(["*","Respuesta:\n\n"], '', $analisis);
            } else {
                return back()->with('error', 'Error al decodificar la respuesta del análisis mediante IA.');
            }

            // Petición a la API de Pexels

            $pexelsApiKey = env('PEXELS_API_KEY');
            $responsePexels = Http::withHeaders([
                'Authorization' => $pexelsApiKey
            ])->get("https://api.pexels.com/v1/search", [
                'query' => $producto,
                'per_page' => 1,
                'orientation' => 'landscape'
            ]);
            $imageUrl = null;
            if ($responsePexels->successful()) {
                $data = $responsePexels->json();
                if (!empty($data['photos'])) {
                    $imageUrl = $data['photos'][0]['src']['large']; // Tomar la primera imagen horizontal
                }
            }

            if (isset($analisis)) {
                return Inertia::render('DS_evaluar_resultados', compact('producto', 'cantidad', 'patologia', 'analisis', 'imageUrl'));
                //  return view('form_resultados', compact('analisis', 'patologia'));
            } else {
                return Inertia::render('DS_evaluar_resultados', ['error' => 'Error, no se pudo obtener un análisis mediante IA válido']);
            }
        } catch (\Exception $e) {
            return Inertia::render('DS_evaluar_resultados', ['error' => 'Error de conexión con la plataforma de IA: ' . $e->getMessage()]);
        }
    }
}
