<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

use Illuminate\Console\Scheduling\Schedule;

/*
Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
    })->purpose('Display an inspiring quote');
    */

// Ahora lanzamos directamente el comando de 'php artisan bkp:database'
// diariamente a las 21:59h desde cron en el VPS (crontab -e)
// app(Schedule::class)->command('bkp:database')->dailyAt('21:59');
