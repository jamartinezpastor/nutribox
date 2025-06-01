<?php

namespace Tests;

use Illuminate\Contracts\Console\Kernel;

trait CreatesApplication
{
    /**
     * Crea la aplicación Laravel para las pruebas.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        // Asegúrate de que esta ruta apunte a tu bootstrap/app.php
        $app = require __DIR__ . '/../bootstrap/app.php';

        $app->make(Kernel::class)->bootstrap();

        return $app;
    }
}
