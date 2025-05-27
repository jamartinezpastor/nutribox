<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Producto;
use App\Models\Comida;

class ProductoFactory extends Factory
{
    protected $model = Producto::class;

    public function definition(): array
    {
        return [
            'comida_id' => Comida::factory(), // Relación a la comida
            'nombre'    => $this->faker->word(),
           'cantidad' => $this->faker->randomFloat(2, 10, 500), // por ejemplo, gramos o mililitros
            'unidad'    => $this->faker->randomElement(['g', 'ml', 'pieza']),
            'kcal'      => $this->faker->numberBetween(10, 1000),
            'pr'        => $this->faker->numberBetween(0, 100), // proteína
            'ch'        => $this->faker->numberBetween(0, 100), // carbohidratos
            'gr'        => $this->faker->numberBetween(0, 100), // grasa
        ];
    }
}
