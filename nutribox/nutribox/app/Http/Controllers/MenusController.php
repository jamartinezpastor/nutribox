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
*/
        //$menus = Menu::where('user_id', auth()->id())->get();
        return Inertia::render('menu-ver',  compact('menus'));
    }


    public function verDetalles(Menu $menuSeleccionado)
    {
        //dd($menuSeleccionado->nombre);
        $menuSeleccionado->load('comidas.productos');

        return Inertia::render('menus/menu-detalle', compact('menuSeleccionado'));
    }
}
