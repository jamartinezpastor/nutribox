<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\OFFController;
use Illuminate\Http\Request;
use App\Http\Controllers\IAController;
use App\Http\Controllers\MenusController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\PlayController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


// Middleware
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('inicio', function () {
        return Inertia::render('inicio');
    })->name('inicio');

    // OPEN FOOD FACTS BUSCAR
    Route::get('offbuscar', function () {
        return Inertia::render('off-buscar');
    })->name('off-buscar');
    Route::get('offbuscaracontroller', [OFFController::class, 'buscarOFF'])->name('off_buscar_a_controller');
    // datos de pag a pag
    Route::get('offresultados', function (Request $request) {
        return Inertia::render('off-buscar-resultados', ['termino' => $request->query('termino')]);
    });



    // DEEPSEEK EVALUAR
    Route::get('dsevaluar', function () {
        return Inertia::render('ds-evaluar');
    })->name('dsevaluar');
    Route::get('dsevaluaracontroller', [IAController::class, 'evaluarDS'])->name('ds-evaluar_a_controller');



    // MENÚS CREAR
    Route::get('menucrear', function () {
        return Inertia::render('menu-crear');
    })->name('menucrear');
    Route::post('menucrearacontroller', [IAController::class, 'crearMenuDiario']);
    Route::get('controlleraprevisualizar', function () {
        return Inertia::render('menu-crear-previsualizar');
    })->name('controlleraprevisualizar');
    Route::post('/menus/guardar', [IAController::class, 'guardarMenuDiario'])->name('previsualizaracontroller');

    // MENÚS VER
    Route::get('menuslistar', [MenusController::class, 'listar'])->name('menus_listar');
    Route::get('/menus/{menuSeleccionado}', [MenusController::class, 'verDetalles']);

    // MENÚS ELIMINAR 
    Route::delete('/menus/{id}', [MenusController::class, 'borrarMenuDiario'])->name('borrarMenuDiario');

    // MENUS EDITAR (CAMBIAR NOMBRE)
    Route::put('/menus/{id}', [MenusController::class, 'actualizarMenuDiario'])->name('actualizarMenuDiario');


    // Play: Streaming y Youtube
    Route::get('/multimedia', [PlayController::class, 'play'])
        ->name('multimedia');


    // Route::get('/{any}', function () {
    //     return view('welcome'); 
    // })->where('any', '.*');

}); // Cierre Middleware


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';

Route::get('info','\Lubusin\Decomposer\Controllers\DecomposerController@index');

