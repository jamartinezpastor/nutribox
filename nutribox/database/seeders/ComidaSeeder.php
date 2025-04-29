<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comida;

class ComidaSeeder extends Seeder
{
    public function run(): void
    {  
            Comida::create([
                'menu_id' => 1,
                'grupo' => "Desayuno",
                'info_extra' => "Congelados disponibles",             
            ]);
     
            Comida::create([
                'menu_id' => 1,
                'grupo' => "Comida",
                'info_extra' => null,           
            ]);
        

            Comida::create([
                'menu_id' => 2,
                'grupo' => "Cena",
                'info_extra' => "Preparación rápida",                
            ]);
            Comida::create([
                'menu_id' => 3,
                'grupo' => "Desayuno",
                'info_extra' => null,           
            ]);
        
    }
}
