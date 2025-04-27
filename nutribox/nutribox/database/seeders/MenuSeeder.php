<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Menu;
use Carbon\Carbon; // libreria para gestionar fechas

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Menu::create([
            'user_id' => 1,
            'fecha' => Carbon::now(),
            'nombre' => 'Menú déficit calórico 1',
            'info_extra' => 'Para perder peso los dias sin GYM',
        ]);

        Menu::create([
            'user_id' => 1,
            // 'fecha' => Carbon::now()->addDays(1),
            'fecha' => Carbon::now(),
            'nombre' => 'Menú Martes',
            'info_extra' => 'Mantenimiento de peso',
        ]);

        Menu::create([
            'user_id' => 2,
            'fecha' => Carbon::now(),
            'nombre' => 'Menú pre carrera Trail',
            'info_extra' => 'Carga de HC, baja en fibra y grasas',
        ]);

        Menu::create([
            'user_id' => 1,
            'fecha' => Carbon::now(),
            'nombre' => 'Menú déficit calórico 1',
            'info_extra' => 'Para perder peso los dias sin GYM',
        ]);

        Menu::create([
            'user_id' => 1,
            // 'fecha' => Carbon::now()->addDays(1),
            'fecha' => Carbon::now(),
            'nombre' => 'Menú Martes',
            'info_extra' => 'Mantenimiento de peso',
        ]);

        Menu::create([
            'user_id' => 2,
            'fecha' => Carbon::now(),
            'nombre' => 'Menú pre carrera Trail',
            'info_extra' => 'Carga de HC, baja en fibra y grasas',
        ]);

        Menu::create([
            'user_id' => 1,
            'fecha' => Carbon::now(),
            'nombre' => 'Menú déficit calórico 1',
            'info_extra' => 'Para perder peso los dias sin GYM',
        ]);

        Menu::create([
            'user_id' => 1,
            // 'fecha' => Carbon::now()->addDays(1),
            'fecha' => Carbon::now(),
            'nombre' => 'Menú Martes',
            'info_extra' => 'Mantenimiento de peso',
        ]);

        Menu::create([
            'user_id' => 2,
            'fecha' => Carbon::now(),
            'nombre' => 'Menú pre carrera Trail',
            'info_extra' => 'Carga de HC, baja en fibra y grasas',
        ]);
    }
}
