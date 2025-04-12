<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'fecha',
        'nombre',     
        'info_extra',
    ];

    // Para saber a que usuario pertenece el menu
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Para saber que comidas tiene el menu
    public function comidas()
    {
        return $this->hasMany(Comida::class);
    }
}
