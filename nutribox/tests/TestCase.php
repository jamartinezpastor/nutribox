<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;  // <-- Importamos el trait
use Tests\CreatesApplication;                        // <-- Ya lo tenías

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication;
    use RefreshDatabase;   // <-- Lo aplicamos aquí para todas las pruebas

    // Ya no hace falta que cada clase de test importe RefreshDatabase,
    // pues aquí lo heredarán.
}
