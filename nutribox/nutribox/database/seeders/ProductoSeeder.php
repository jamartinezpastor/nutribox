<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Producto;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Producto::create([
            'comida_id' => 1,
            'nombre' => 'Pollo a la plancha',
            'cantidad' => 200,
            'unidad' => 'g',
            'kcal' => 250,
            'pr' => 30,
            'ch' => 0,
            'gr' => 10,
        ]);

        Producto::create([
            'comida_id' => 1,
            'nombre' => 'Arroz integral',
            'cantidad' => 150,
            'unidad' => 'g',
            'kcal' => 160,
            'pr' => 4,
            'ch' => 34,
            'gr' => 1,
        ]);

        Producto::create([
            'comida_id' => 1,
            'nombre' => 'Ensalada de espinacas',
            'cantidad' => 100,
            'unidad' => 'g',
            'kcal' => 23,
            'pr' => 2,
            'ch' => 4,
            'gr' => 0,
        ]);

        Producto::create([
            'comida_id' => 1,
            'nombre' => 'Aguacate',
            'cantidad' => 50,
            'unidad' => 'g',
            'kcal' => 80,
            'pr' => 1,
            'ch' => 4,
            'gr' => 7,
        ]);

        Producto::create([
            'comida_id' => 1,
            'nombre' => 'Yogur griego natural',
            'cantidad' => 125,
            'unidad' => 'g',
            'kcal' => 75,
            'pr' => 10,
            'ch' => 4,
            'gr' => 0,
        ]);

        Producto::create([
            'comida_id' => 2,
            'nombre' => 'Pechuga de pavo',
            'cantidad' => 180,
            'unidad' => 'g',
            'kcal' => 220,
            'pr' => 30,
            'ch' => 0,
            'gr' => 8,
        ]);

        Producto::create([
            'comida_id' => 2,
            'nombre' => 'Patata cocida',
            'cantidad' => 150,
            'unidad' => 'g',
            'kcal' => 120,
            'pr' => 3,
            'ch' => 27,
            'gr' => 0,
        ]);

        Producto::create([
            'comida_id' => 2,
            'nombre' => 'Brócoli al vapor',
            'cantidad' => 100,
            'unidad' => 'g',
            'kcal' => 35,
            'pr' => 3,
            'ch' => 7,
            'gr' => 0,
        ]);

        Producto::create([
            'comida_id' => 2,
            'nombre' => 'Pera',
            'cantidad' => 100,
            'unidad' => 'g',
            'kcal' => 52,
            'pr' => 0,
            'ch' => 14,
            'gr' => 0,
        ]);

        Producto::create([
            'comida_id' => 2,
            'nombre' => 'Huevo duro',
            'cantidad' => 1,
            'unidad' => 'unidad',
            'kcal' => 70,
            'pr' => 6,
            'ch' => 1,
            'gr' => 5,
        ]);

        Producto::create([
            'comida_id' => 3,
            'nombre' => 'Filete de salmón',
            'cantidad' => 200,
            'unidad' => 'g',
            'kcal' => 400,
            'pr' => 45,
            'ch' => 0,
            'gr' => 22,
        ]);

        Producto::create([
            'comida_id' => 3,
            'nombre' => 'Quinoa',
            'cantidad' => 150,
            'unidad' => 'g',
            'kcal' => 222,
            'pr' => 8,
            'ch' => 39,
            'gr' => 4,
        ]);

        Producto::create([
            'comida_id' => 3,
            'nombre' => 'Espárragos',
            'cantidad' => 100,
            'unidad' => 'g',
            'kcal' => 20,
            'pr' => 2,
            'ch' => 4,
            'gr' => 0,
        ]);
    }
}
