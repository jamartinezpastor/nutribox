<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\OFFController;
use Illuminate\Http\Request;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('inicio', function () {
        return Inertia::render('inicio');
    })->name('inicio');

    // OPEN FOOD FACTS BUSCAR
    Route::get('off-buscar', function () {
        return Inertia::render('OFF_buscar');
    })->name('off-buscar');
    Route::get('/off_buscar_a_controller', [OFFController::class, 'buscarOFF'])->name('off_buscar_a_controller');

    Route::get('/off-resultados', function (Request $request) {
        return Inertia::render('OFF_buscar_resultados', ['termino' => $request->query('termino')]);
    });




    // DEEPSEEK EVALUAR
    Route::get('ds_evaluar', function () {
        return Inertia::render('ds_evaluar');
    })->name('ds_evaluar');

    // DIETAS IA
    Route::get('menu_crear', function () {
        return Inertia::render('menu_crear');
    })->name('menu_crear');
    Route::get('menu_ver', function () {
        return Inertia::render('menu_ver');
    })->name('menu_ver');





    Route::get('/principal', function () {
        return view('principal');
    })->name('principal');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
