<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DeepSeek\DeepSeekClient;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use App\Models\Menu;
use App\Models\Comida;
use App\Models\Producto;

class DeepSeekController extends Controller
{
    public function evaluarDS(Request $formulario)
    {
        $producto = $formulario->input('producto');
        $cantidad = $formulario->input('cantidad');
        $unidad = $formulario->input('unidad');
        $patologia = $formulario->input('patologia');
        $prompt = "Analiza el siguiente alimento (en la cantidad y unidades señaladas) desde la perspectiva de un médico endocrino (especialista en nutrición y dietética) considerando que el paciente al que va destinado padece la patología $patologia y el alimento es $producto en la cantidad de
        $cantidad en $unidad (unidad de medida).
        Indica si es adecuado para este tipo de pacientes y sus posibles riesgos para personas con $patologia.
        La respuesta debe ser muy breve, concisa y enfocada a una persona que tiene $patologia (Ten en cuenta para el analisis que un mismo producto no es lo mismo que este frito que cocido (por ejemplo),
        ten en cuenta las posibles formas de cocinar el alimento.
        La respuesta debe estar basada en evidencia, papers cientificos o estudios (lo más recientes posibles), si te has basado en algún estudio, bibliografia o evidencia, añádelo entre paréntesis al final.
        Tómate tu tiempo, la precisión de la respuesta es muy importante.        
        (Comienza directamente con la respuesta, no con el nombre del alimento)";

        try {
            // Petición a la API de Deepseek
            $response = DeepSeekClient::build(env('DEEPSEEK_API_KEY'))
                ->query($prompt)
                ->run();

            // Decodifica la respuesta JSON.. con true array asociativo!
            $responseArray = json_decode($response, true);

            // Verifica si la decodificación fue exitosa
            if (json_last_error() === JSON_ERROR_NONE) {
                $analisis = $responseArray['choices'][0]['message']['content'];

                // Eliminar cualquier "**" restante
                $analisis = str_replace(["*"], '', $analisis);
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
                return Inertia::render('ds-evaluar-resultados', compact('producto', 'cantidad', 'unidad', 'patologia', 'analisis', 'imageUrl'));
                //  return view('form_resultados', compact('analisis', 'patologia'));
            } else {
                return Inertia::render('ds-evaluar-resultados', ['error' => 'Error, no se pudo obtener un análisis mediante IA válido']);
            }
        } catch (\Exception $e) {
            return Inertia::render('ds-evaluar-resultados', ['error' => 'Error de conexión con la plataforma de IA: ' . $e->getMessage()]);
        }
    }

    public function crearMenuDiario(Request $formulario)
    {
        $datos = $formulario->validate([
            'objetivo' => 'required|string',
            'numComidas' => 'required|integer',
            'restricciones' => 'array',
            'productosAEvitar' => 'nullable|string',
            'productosAPriorizar' => 'nullable|string',
            'tiempoPreparacion' => 'required|integer',
            'nombre' => 'required|string',
            'info_extra' => 'nullable|string',
        ]);

        $objetivo = $datos['objetivo'];
        $numComidas = $datos['numComidas'];
        $restricciones = $datos['restricciones'];
        $productosAEvitar = $datos['productosAEvitar'] ?? null;
        $productosAPriorizar = $datos['productosAPriorizar'] ?? null;
        $tiempoPreparacion = $datos['tiempoPreparacion'];
        $nombre = $datos['nombre'];
        $infoExtra = $datos['info_extra'] ?? null;

        $prompt = "Analiza el siguiente alimento BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA BLA ";

        try {
            $menu = '{
  "nombre": "Menú saludable 1800 kcal",
  "info_extra": "Ideal para pérdida de peso",
  "fecha": "2025-04-14",
  "comidas": [
    {
      "grupo": "Desayuno",
      "productos": [
        {
          "nombre": "Avena",
          "cantidad": 50,
          "unidad": "g",
          "kcal": 180,
          "pr": 5,
          "ch": 30,
          "gr": 4
        },
        {
          "nombre": "Plátano",
          "cantidad": 1,
          "unidad": "unidad",
          "kcal": 89,
          "pr": 1.1,
          "ch": 23,
          "gr": 0.3
        }
      ]
    },
    {
      "grupo": "Comida",
      "productos": [
        {
          "nombre": "Pechuga de pollo",
          "cantidad": 150,
          "unidad": "g",
          "kcal": 165,
          "pr": 31,
          "ch": 0,
          "gr": 3.6
        },
        {
          "nombre": "Arroz integral",
          "cantidad": 60,
          "unidad": "g",
          "kcal": 210,
          "pr": 5,
          "ch": 44,
          "gr": 2
        }
      ]
    }
  ]
}
';
            $menu = json_decode($menu, true); // convierte el JSON string a array asociativo


            /*
            // Petición a la API de Deepseek
            $response = DeepSeekClient::build(env('DEEPSEEK_API_KEY'))
                ->query($prompt)
                ->run();

            // Decodifica la respuesta JSON.. con true array asociativo!
            $responseArray = json_decode($response, true);

            // Verifica si la decodificación fue exitosa
            if (json_last_error() === JSON_ERROR_NONE) {
                $analisis = $responseArray['choices'][0]['message']['content'];          

                // Eliminar cualquier "**" restante
                $analisis = str_replace(["*"], '', $analisis);
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
*/

            //dd($menu);

            if (isset($menu)) {
                return Inertia::render('menu-crear-previsualizar', compact('menu', 'nombre', 'prompt'));

                //  return view('form_resultados', compact('analisis', 'patologia'));
            } else {
                return Inertia::render('menu-crear-previsualizar', ['error' => 'Error, no se pudo obtener un análisis mediante IA válido']);
            }
        } catch (\Exception $e) {
            return Inertia::render('menu-crear-previsualizar', ['error' => 'Error de conexión con la plataforma de IA: ' . $e->getMessage()]);
        }
    }
}
