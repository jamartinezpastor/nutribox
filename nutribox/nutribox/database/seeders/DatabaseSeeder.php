<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        
        
        User::factory()->create([

            'name' => 'Usuario Demo',
            'edad' => 60,
            'altura' => 170,
            'peso'=> 77,
            'actividad'=> "poco-movimiento",
            'objetivo'=> 'disminuir-ingesta-calorica-reduciendo-en-menor-medida-las-proteinas-diarias',
            'info_extra' => 'Operado de rotura de ligamentos rodilla izquierda hace 3 años',
            'email' => 'correo@ejemplo.es',
            'password' => 'Contraseña',
        ]);
        

        User::factory()->create();
    }
}
