<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PlayController extends Controller
{
    public function play()
    {
        return Inertia::render('multimedia');
    }
}
