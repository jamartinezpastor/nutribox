<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Menu;

class MenusController extends Controller
{
    public function listar()
    {
        $menus = Menu::all();
        
        /*
        // DATOS MOCK-DATA
        $menus = [
            [
                'id' => '448ed52f',
                'amount' => 235,
                'status' => 'processing',
                'email' => 'asdsadasd@sf.com',
            ],
            [
                'id' => '728ed52f',
                'amount' => 100,
                'status' => 'pending',
                'email' => 'm@example.com',
            ],
        ];

        //$menus = Menu::where('user_id', auth()->id())->get();

        */
        return Inertia::render('menus-listar',  compact('menus'));
    }


    public function verDetalles(Menu $menuSeleccionado)
    {
        //dd($menuSeleccionado->nombre);
        $menuSeleccionado->load('comidas.productos');

        $totalesComidas = $menuSeleccionado->comidas->map(function ($comida) {
            return [
                'id' => $comida->id,
                'grupo' => $comida->grupo,
                'info_extra' => $comida->info_extra,
                'kcal' => $comida->getKcal(),
                'gr' => $comida->getGr(),
                'ch' => $comida->getCh(),
                'pr' => $comida->getPr(),
                'productos' => $comida->productos, // Mantener los productos de cada comida
            ];
        });

        return Inertia::render('menus/menu-detalle', compact('menuSeleccionado','totalesComidas'));
    }

    // app/Http/Controllers/MenuController.php
public function borrarMenuDiario($id)
{
    $menu = Menu::findOrFail($id);
    $menu->delete();

    return redirect()->route('menus_listar')->with('success', 'Menú eliminado correctamente');
}
 
}
