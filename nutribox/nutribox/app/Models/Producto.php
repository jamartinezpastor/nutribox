<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'menu_id',
        'nombre',
        'cantidad',
        'unidad',
        'kcal',
        'pr',
        'ch',
        'gr',
    ];

    // Para saber a que menu pertenece el producto
    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }
}
