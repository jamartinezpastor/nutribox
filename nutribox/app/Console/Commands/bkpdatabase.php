<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Carbon\Carbon;

class bkpdatabase extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bkp:database';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Comando para hacer un backup de la base de datos SQLite';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Rutas absolutas!
        $source = '/var/www/nutribox/nutribox/database/database.sqlite';
   
        $destinationDir = '/var/www/nutribox_bkpdatabase/';

        $filename = Carbon::now()->format('Y_m_d_His') . '_database.sqlite';
        $destination = $destinationDir . $filename;
    
        if (!file_exists($destinationDir)) {
            mkdir($destinationDir, 0755, true);        }

    
        if (copy($source, $destination)) {
            $this->info("Backup creado: $destination");
        } else {
            $this->error("No se pudo crear el backup.");
        }
    }
}
