<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('plantilla', function () {
        return Inertia::render('plantilla');
    })->name('plantilla');

    Route::get('/principal', function () {return view('principal');})->name('principal');



});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
