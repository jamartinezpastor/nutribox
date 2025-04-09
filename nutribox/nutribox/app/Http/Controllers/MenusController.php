<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenusController extends Controller
{
    public function index()
    {
        // CONSULTA A BASE DE DATOS AQUÍ
        // $menus = Menu::all();

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

        return Inertia::render('menu-ver', ['menus' => $menus]);
    }
}
