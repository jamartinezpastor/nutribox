<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comida extends Model
{
    use HasFactory;

    protected $fillable = [
        'menu_id',
        'grupo',
        'info_extra',      
    ];

    // Para saber a que menú pertenece la comida
    public function menu()
    {
        return $this->belongsTo(Menu::class);
    }

    // Para saber que productos tiene una comida determinada
    public function productos()
    {
        return $this->hasMany(Producto::class);
    }

    // CALCULO TOTALES
    public function getKcal()
    {
        return $this->productos->sum('kcal');
    }
    public function getGr()
    {
        return $this->productos->sum('gr');
    }
    public function getCh()
    {
        return $this->productos->sum('ch');
    }
    public function getPr()
    {
        return $this->productos->sum('pr');
    }
}
