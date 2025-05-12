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
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use DeepSeek\Enums\Models;
use Carbon\Carbon;

class IAController extends Controller
{
    private $deepseekApiKey;
    private $openaiApiKey;
    private $pexelsApiKey;

    public function __construct()
    {
        $this->deepseekApiKey = config('services.deepseek.key');
        $this->openaiApiKey = config('services.openai.key');
        $this->pexelsApiKey = config('services.pexels.key');
    }

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
            $response = DeepSeekClient::build($this->deepseekApiKey)
                ->query($prompt)
                ->run();

            // Decodifica la respuesta JSON.. con true array asociativo!
            $responseArray = json_decode($response, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                $analisis = $responseArray['choices'][0]['message']['content'];

                // Eliminar cualquier "**" restante
                $analisis = str_replace(["*"], '', $analisis);
            } else {
                return back()->with('error', 'Error al decodificar la respuesta del análisis mediante IA.');
            }

            // Petición a la API de Pexels          
            $responsePexels = Http::withHeaders([
                'Authorization' => $this->pexelsApiKey
            ])->get("https://api.pexels.com/v1/search", [
                'query' => $producto,
                'per_page' => 1,
                'orientation' => 'landscape'
            ]);
            $imageUrl = null;
            if ($responsePexels->successful()) {
                $data = $responsePexels->json();
                if (!empty($data['photos'])) {
                    $imageUrl = $data['photos'][0]['src']['large'];
                }
            }

            if (isset($analisis)) {
                return Inertia::render('ds-evaluar-resultados', compact('producto', 'cantidad', 'unidad', 'patologia', 'analisis', 'imageUrl'));
            } else {
                return Inertia::render('ds-evaluar-resultados', ['error' => 'Error, no se pudo obtener un análisis mediante IA válido']);
            }
        } catch (\Exception $e) {
            return Inertia::render('ds-evaluar-resultados', ['error' => 'Error de conexión con la plataforma de IA: ' . $e->getMessage()]);
        }
    }

    // Método para mapear el objetivo seleccionado en la creación de menús al nombre de un componente (tipo icono)
    private function mapearObjetivoATipo(string $objetivo): string
    {
        return match ($objetivo) {
            'disminuir-ingesta-calorica-reduciendo-en-menor-medida-las-proteinas-diarias' => 'UserMinus',
            'mantener-ingesta-calorica' => 'UserCheck',
            'ganar-masa-muscular' => 'BicepsFlexed',
            'disminuir-ingesta-carbohidratos-manteniendo-calorias' => 'ArrowUpToLine',
            'aumentar-ingesta-proteinas-manteniendo-calorias' => 'ChevronsUp',
            'mejorar-salud-general' => 'PersonStanding',
            default => 'CookingPot',
        };
    }

    public function crearMenuDiario(Request $formulario)
    {
        // Validación formulario creacion
        $datos = $formulario->validate([
            'objetivo' => 'required|string',
            'numComidas' => 'required|integer',
            'numSnacks' => 'required|integer',
            'restricciones' => 'array',
            'productosAEvitar' => 'nullable|string',
            'productosAPriorizar' => 'nullable|string',
            'tiempoPreparacion' => 'required|integer',
            'nombre' => 'required|string',
            'info_extra' => 'nullable|string',
        ]);

        // Preparación datos antes de la petición a API IA
        $usuario = Auth::user();
        $u_sexo = $usuario->sexo;
        $u_edad = $usuario->edad;
        $u_altura = $usuario->altura;
        $u_peso = $usuario->peso;
        $u_actividad = $usuario->actividad;
        $u_infoextra = $usuario->info_extra;

        $objetivo = $datos['objetivo'];
        $tipoIcono = $this->mapearObjetivoATipo($objetivo);

        $numComidas = $datos['numComidas'];
        $numSnacks = $datos['numSnacks'];
        $restricciones = $datos['restricciones'];
        $restriccionesTexto = implode(', ', $restricciones); // Al poder ser varias, se prepara para que se entendible en el prompt
        $productosAEvitar = $datos['productosAEvitar'] ?? null;
        $productosAPriorizar = $datos['productosAPriorizar'] ?? null;
        $tiempoPreparacion = $datos['tiempoPreparacion'];
        $nombre = $datos['nombre'];
        $infoExtra = $datos['info_extra'] ?? null;

        // Datos mockeados de prueba
        /*
        $menu_estructura_json = '{
"nombre": "Menú saludable 1800 kcal",
"info_extra": "Ideal para pérdida de peso",
"fecha": "dd-mm-aaaa",
"comidas": [
{
  "grupo": "Desayuno",
   "info_extra": "Recomendamos Avena Overnight o similar y que el platano no esté muy maduro.",
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
  "info_extra": "Atención a la preparación de la Pechuga, que sea a la placha o al vapor, evitar aceites refinados.",
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
        // $menu_estructura_json = json_decode($menu_estructura_json, true); // convierte el JSON string a array asociativo       
        $estructuraEjemplo = json_encode(json_decode($menu_estructura_json, true), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
      
*/

        try {
            $prompt = "Desde la perspectiva de un médico endocrino (especialista en nutrición y dietética) y para un usuario con el siguiente perfil:
            Sexo: $u_sexo,
            Edad: $u_edad,
            Altura: $u_altura,
            Peso: $u_peso,
            Nivel de actividad diaria: $u_actividad,
            Información adicional: $u_infoextra,

            Crea un menú diario con el nombre '$nombre' con las siguientes características:
            Objetivo: $objetivo,
            Dividido en $numComidas grupos de comidas principales y $numSnacks snacks intercalados entre ellas,
            Restricciones alimentarias: $restriccionesTexto ,
            Productos a evitar: $productosAEvitar,
            Productos a priorizar (si es posible): $productosAPriorizar,
            Con un tiempo de preparación aproximado de: $tiempoPreparacion minutos,
            y también valora esta información adicional: $infoExtra.

            Ten en cuenta que es un menú diario (Son las calorias de un dia entero, ten esto presenta para calcular calorias, macronutrientes, etc..), las comidas diarias deben ajustarse inversamente en su contenido calórico y de macronutrientes según su frecuencia (Por ejemplo, cuando una persona realiza menos comidas al día, cada una debe contener mayor cantidad de calorías y macronutrientes para cumplir con los requerimientos diarios totales establecidos según el perfil individual del usuario), que la mayoria de los usuarios son de España (Murcia) y que puedes tomarte tu tiempo para realizarlo (es preferible obtener un resultado veraz antes que rápido e inexacto).

            La respuesta debe estar en formato JSON, basado en esta estructura:
                - Un Menu está formado por los atributos: nombre ($nombre), info_extra ($infoExtra), fecha (Añade la fecha actual en formato dd-mm-aaaa) y comidas (un conjunto de tipo Comida).
                - Una Comida está formada por los atributos: grupo (Por ejemplo: 'Desayuno', 'Almuerzo', 'Comida', 'Merienda', 'Cena', etc.. a los grupos que sean Snacks añádeselo, como por ejemplo: 'Almuerzo (Snack)'), info_extra (Por ejemplo: 'Recomendamos Avena Overnight o similar y que el platano no esté muy maduro') y productos (un conjunto de tipo Producto).
                - Un Producto está formado: nombre, cantidad, unidad (Por ejemplo: 'g', 'ml', 'taza', 'unidad', etc..), kcal, pr (proteinas), ch (carbohidratos) y gr (grasas).
                - Un Menu puede contener 1 o muchas comidas, una Comida puede contener 1 o muchos productos.
            ";

            // Petición Completa a la API IA
            set_time_limit(120); // Ampliado de 30 a 120 por si la consulta es lenta evitar errores
            $client = DeepSeekClient::build(apiKey: $this->deepseekApiKey, baseUrl: 'https://api.deepseek.com/v3', timeout: 120, clientType: 'guzzle');
            $response = $client
                ->withModel(Models::CODER->value)
                ->query($prompt)
                ->run();

            /*
            // Petición Simple a la API IA
            $response = DeepSeekClient::build(env('DEEPSEEK_API_KEY'))
                ->query($prompt)
                ->run();
            Log::info('Prompt enviado a DeepSeek', ['prompt' => $prompt]);
            Log::info('Respuesta de DeepSeek:', ['respuesta_bruta' => $response]);
            dd($response);
            */

            $responseArray = json_decode($response, true);
            // dd($responseArray);

            if (
                isset($responseArray['choices'][0]['message']['content']) &&
                is_string($responseArray['choices'][0]['message']['content'])
            ) {
                $analisis = $responseArray['choices'][0]['message']['content'];

                // Extraer bloque JSON en caso de que DeepSeek lo devuelva rodeado de texto
                preg_match('/\{.*\}/s', $analisis, $coincidencias);
                $jsonLimpio = $coincidencias[0] ?? '{}';
                $menu = json_decode($jsonLimpio, true);

                if (json_last_error() !== JSON_ERROR_NONE) {
                    return Inertia::render('menu-crear-previsualizar', ['error' => 'El modelo ha devuelto un JSON inválido']);
                }

                return Inertia::render('menu-crear-previsualizar', [
                    'nombre' => $nombre,
                    'tipoIcono' => $tipoIcono,
                    'info_extra' => $infoExtra,
                    'menu' => $menu,
                ]);
            } else {
                return Inertia::render('menu-crear-previsualizar', [
                    'error' => 'La IA no devolvió una respuesta válida. Inténtalo de nuevo más tarde.',
                ]);
            }
        } catch (\Exception $e) {
            return Inertia::render('menu-crear-previsualizar', ['error' => 'Error de conexión con la plataforma de IA: ' . $e->getMessage()]);
        }
    }

    public function guardarMenuDiario(Request $formulario)
    {
        // validación guardado
        $datos = $formulario->validate([
            'menu' => 'required|array',
            'menu.nombre' => 'required|string',
            'tipoIcono' => 'nullable|string',
            'menu.info_extra' => 'nullable|string',
            'menu.fecha' => 'required|string',
            'menu.comidas' => 'required|array',
        ]);

        // Crear menú
        $usuario = Auth::user();
        $menu = new Menu();
        $menu->nombre = $datos['menu']['nombre'];
        $menu->tipo = $datos['tipoIcono'];
        $menu->info_extra = $datos['menu']['info_extra'];
        $menu->fecha = Carbon::createFromFormat('d-m-Y', $datos['menu']['fecha']);
        $menu->user_id = $usuario->id;
        $menu->save();

        // Crear comidas y productos recorriendo arrays
        foreach ($datos['menu']['comidas'] as $comidaData) {
            $comida = new Comida();
            $comida->menu_id = $menu->id;
            $comida->grupo = $comidaData['grupo'];
            $comida->info_extra = $comidaData['info_extra'] ?? null;
            $comida->save();

            foreach ($comidaData['productos'] as $productoData) {
                $producto = new Producto();
                $producto->comida_id = $comida->id;
                $producto->nombre = $productoData['nombre'];
                $producto->cantidad = $productoData['cantidad'];
                $producto->unidad = $productoData['unidad'];
                $producto->kcal = $productoData['kcal'];
                $producto->pr = $productoData['pr'];
                $producto->ch = $productoData['ch'];
                $producto->gr = $productoData['gr'];
                $producto->save();
            }
        }

        return redirect()->route('menus_listar')->with('flash', 'Menú guardado correctamente.');
    }
}
