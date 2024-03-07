<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\PokeApiController;

class UpdatePokemonData extends Command
{
    protected $signature = 'pokeapi:update';

    protected $description = 'Aggiorna i dati dei Pokémon dal PokeAPI';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $pokeApiController = new PokeApiController();
        $pokeApiController->executeDataUpdate();

        $this->info('Dati dei Pokémon aggiornati con successo!');
    }
}
