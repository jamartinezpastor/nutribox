<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Menu;
use App\Models\User;

class MenuFactory extends Factory
{
    protected $model = Menu::class;

    public function definition(): array
    {
        return [
            'user_id'   => User::factory(), // Relación al usuario
            'fecha'     => $this->faker->date(),
            'nombre'    => $this->faker->word(),
            'info_extra'=> $this->faker->sentence(),
            'tipo'      => $this->faker->randomElement(['desayuno', 'comida', 'cena', 'snack']),
        ];
    }
}
