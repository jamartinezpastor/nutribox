<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Mockery;

class OFFControllerTest extends TestCase

{
    public function test_buscarOFF_successful_response()
    {
        $mock = \Mockery::mock(\GuzzleHttp\Client::class);
        $mockResponse = new \GuzzleHttp\Psr7\Response(200, [], json_encode([
            'products' => [['nombre' => 'Producto Fake']],
        ]));
        $mock->shouldReceive('get')->andReturn($mockResponse);
        $this->app->instance(\GuzzleHttp\Client::class, $mock);

        $this->actingAs(\App\Models\User::factory()->create());
        $response = $this->get('/offbuscaracontroller?termino=test');

        $response->assertInertia(
            fn($page) =>
            $page
                ->component('off-buscar-resultados')
                ->where('termino', 'test')
                ->has('resultados.products')
        );
    }
}
