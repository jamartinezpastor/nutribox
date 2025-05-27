<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Comida;
use App\Models\Menu;

class ComidaFactory extends Factory
{
    protected $model = Comida::class;

    public function definition(): array
    {
        return [
            'menu_id'   => Menu::factory(), // Relación al menú
            'grupo'     => $this->faker->randomElement(['principal', 'guarnición', 'bebida', 'postre']),
            'info_extra'=> $this->faker->sentence(),
        ];
    }
}
