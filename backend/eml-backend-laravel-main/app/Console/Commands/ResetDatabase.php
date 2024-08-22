<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ResetDatabase extends Command
{
    protected $signature = 'db:reset';
    protected $description = 'Drop all tables and re-run migrations';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Obtiene el nombre de todas las tablas
        $tables = DB::select('SHOW TABLES');
        $tableNames = array_map('current', $tables);

        // Elimina cada una de las tablas
        foreach ($tableNames as $tableName) {
            Schema::drop($tableName);
        }

        // Corre migraciones
        $this->info('Running migrations...');
        $this->call('migrate');
    }
}

