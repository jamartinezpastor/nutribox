<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use Mockery;

class OFFControllerTest extends TestCase
{public function test_buscarOFF_successful_response()
    {
        $mock = \Mockery::mock(\GuzzleHttp\Client::class);
        $mockResponse = new \GuzzleHttp\Psr7\Response(200, [], json_encode([
            'products' => [['nombre' => 'Producto Fake']],
        ]));
        $mock->shouldReceive('get')->andReturn($mockResponse);
        $this->app->instance(\GuzzleHttp\Client::class, $mock);
    
        $this->actingAs(\App\Models\User::factory()->create());
        $response = $this->get('/offbuscaracontroller?termino=test');
    
        $response->assertInertia(fn ($page) =>
            $page
                ->component('off-buscar-resultados')
                ->where('termino', 'test')
                ->has('resultados.products')
        );
    }
    
    public function test_buscarOFF_error_response()
    {
        $mock = \Mockery::mock(\GuzzleHttp\Client::class);
        $mock->shouldReceive('get')->andThrow(new \Exception('Error'));
        $this->app->instance(\GuzzleHttp\Client::class, $mock);
    
        $this->actingAs(\App\Models\User::factory()->create());
        $response = $this->get('/offbuscaracontroller?termino=test');
    
        $response->assertInertia(fn ($page) =>
            $page
                ->component('off-buscar-resultados')
                ->where('error', 'Error al conectar con Open Food Facts')
                ->where('termino', 'test')
                ->has('resultados.products', 0) // Asegura que no hay productos
        );
    }
    
    
}
