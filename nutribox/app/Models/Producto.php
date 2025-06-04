<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'comida_id',
        'nombre',
        'cantidad',
        'unidad',
        'kcal',
        'pr',
        'ch',
        'gr',
    ];

    // Para saber a que comida pertenece el producto
    public function comida()
    {
        return $this->belongsTo(Comida::class);
    }
}
