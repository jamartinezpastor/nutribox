<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Para crear 10 usuarios de prueba mediante datos fake automáticos
        User::factory(10)->create();

        // Para crear 1 usuario de prueba manualmente
        User::create([
            'name' => 'Usuario Demo',
            'sexo' => 'Femenino',
            'edad' => 60,
            'altura' => 170,
            'peso' => 77,
            'actividad' => "poco-movimiento",
            // 'objetivo' => 'disminuir-ingesta-calorica-reduciendo-en-menor-medida-las-proteinas-diarias',
            'info_extra' => 'Operado de rotura de ligamentos rodilla izquierda hace 3 años',
            'email' => 'correo@ejemplo.es',
            'password' => 'Contraseña',
        ]);
    }
}
