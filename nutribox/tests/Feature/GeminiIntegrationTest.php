<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class GeminiIntegrationTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
        config([
            'services.gemini.key' => 'test-gemini-key',
            'services.gemini.base_url' => 'https://generativelanguage.googleapis.com/v1beta/',
            'services.gemini.model_eval' => 'gemini-3.5-flash-lite',
            'services.gemini.model_menu' => 'gemini-3.8-flash',
            'services.gemini.thinking_level' => 'LOW',
        ]);
        Http::preventStrayRequests();
        $this->actingAs(User::factory()->create());
    }

    public function test_evaluations_use_flash_lite_and_join_text_parts_without_thoughts(): void
    {
        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'finishReason' => 'STOP',
                    'content' => ['parts' => [
                        ['thought' => true, 'text' => 'Resumen interno'],
                        ['text' => 'La avena '],
                        ['text' => 'es adecuada.'],
                    ]],
                ]],
            ]),
            'api.pexels.com/*' => Http::response(['photos' => []]),
        ]);

        $this->get($this->evaluationUrl())
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('ds-evaluar-resultados')
                ->where('analisis', 'La avena es adecuada.')
                ->missing('error'));

        Http::assertSent(fn (Request $request) =>
            $request->method() === 'POST'
            && $request->url() === 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent'
            && $request->hasHeader('x-goog-api-key', 'test-gemini-key')
            && !$request->hasHeader('Authorization')
            && $request['contents'][0]['role'] === 'user'
            && str_contains($request['contents'][0]['parts'][0]['text'], 'avena')
            && $request['generationConfig']['thinkingConfig']['thinkingLevel'] === 'LOW'
            && !isset($request['generationConfig']['responseMimeType'])
        );
    }

    public function test_menus_use_flash_with_json_output_and_allow_a_configured_model(): void
    {
        config(['services.gemini.model_menu' => 'gemini-custom-flash']);
        $menu = [
            'nombre' => 'Mi menú',
            'info_extra' => null,
            'fecha' => '22-10-2026',
            'comidas' => [[
                'grupo' => 'Desayuno',
                'info_extra' => null,
                'productos' => [[
                    'nombre' => 'Avena', 'cantidad' => 50, 'unidad' => 'g',
                    'kcal' => 190, 'pr' => 7, 'ch' => 30, 'gr' => 4,
                ]],
            ]],
        ];
        $this->fakeGeminiText(json_encode($menu));

        $this->post('/menucrearacontroller', $this->menuInput())
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('menu-crear-previsualizar')
                ->where('menu', $menu)
                ->missing('error'));

        Http::assertSent(fn (Request $request) =>
            $request->url() === 'https://generativelanguage.googleapis.com/v1beta/models/gemini-custom-flash:generateContent'
            && $request->hasHeader('x-goog-api-key', 'test-gemini-key')
            && $request['generationConfig']['responseMimeType'] === 'application/json'
        );
        Http::assertSentCount(1);
    }

    public function test_missing_key_reports_configuration_error_without_calling_google(): void
    {
        config(['services.gemini.key' => '']);
        Http::fake();

        $this->post('/menucrearacontroller', $this->menuInput())
            ->assertInertia(fn (Assert $page) => $page
                ->component('menu-crear-previsualizar')
                ->where('error', fn ($error) => str_contains($error, 'GEMINI_API_KEY'))
                ->missing('menu'));

        Http::assertNothingSent();
    }

    public function test_quota_errors_are_readable_and_do_not_expose_google_response_details(): void
    {
        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'error' => ['message' => 'private-project-details', 'status' => 'RESOURCE_EXHAUSTED'],
            ], 429),
        ]);

        $this->get($this->evaluationUrl())
            ->assertInertia(fn (Assert $page) => $page
                ->component('ds-evaluar-resultados')
                ->where('error', fn ($error) => str_contains($error, 'cuota de Gemini')
                    && !str_contains($error, 'private-project-details'))
                ->missing('analisis'));

        Http::assertSentCount(1);
    }

    public function test_blocked_prompts_report_an_error_instead_of_an_empty_menu(): void
    {
        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'promptFeedback' => ['blockReason' => 'SAFETY'],
            ]),
        ]);

        $this->post('/menucrearacontroller', $this->menuInput())
            ->assertInertia(fn (Assert $page) => $page
                ->component('menu-crear-previsualizar')
                ->where('error', fn ($error) => str_contains($error, 'filtros de seguridad'))
                ->missing('menu'));
    }

    public function test_empty_responses_are_not_accepted_as_evaluations(): void
    {
        Http::fake(['generativelanguage.googleapis.com/*' => Http::response(['candidates' => []])]);

        $this->get($this->evaluationUrl())
            ->assertInertia(fn (Assert $page) => $page
                ->component('ds-evaluar-resultados')
                ->where('error', fn ($error) => str_contains($error, 'sin contenido válido'))
                ->missing('analisis'));
    }

    public function test_truncated_responses_are_not_accepted_as_menus(): void
    {
        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'finishReason' => 'MAX_TOKENS',
                    'content' => ['parts' => [['text' => '{"nombre": "Menú"}']]],
                ]],
            ]),
        ]);

        $this->post('/menucrearacontroller', $this->menuInput())
            ->assertInertia(fn (Assert $page) => $page
                ->component('menu-crear-previsualizar')
                ->where('error', fn ($error) => str_contains($error, 'no ha completado'))
                ->missing('menu'));
    }

    public function test_invalid_json_is_not_accepted_as_an_empty_menu(): void
    {
        $this->fakeGeminiText('Aquí tienes el menú');

        $this->post('/menucrearacontroller', $this->menuInput())
            ->assertInertia(fn (Assert $page) => $page
                ->component('menu-crear-previsualizar')
                ->where('error', 'El modelo ha devuelto un JSON inválido')
                ->missing('menu'));
    }

    private function fakeGeminiText(string $text): void
    {
        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [[
                    'finishReason' => 'STOP',
                    'content' => ['parts' => [['text' => $text]]],
                ]],
            ]),
        ]);
    }

    private function evaluationUrl(): string
    {
        return '/dsevaluaracontroller?' . http_build_query([
            'producto' => 'avena', 'cantidad' => 50, 'unidad' => 'g', 'patologia' => 'diabetes',
        ]);
    }

    private function menuInput(): array
    {
        return [
            'nombre' => 'Mi menú',
            'objetivo' => 'mejorar-salud-general',
            'numComidas' => 3,
            'numSnacks' => 1,
            'restricciones' => [],
            'tiempoPreparacion' => 30,
        ];
    }
}
