<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Models\Pokemon;
use App\Models\Type;
use App\Models\Region;


class PokeApiController extends Controller
{
    public function executeDataUpdate()
    {
        $this->getDataFromPokeApi();

        return response()->json(['message' => 'Dati aggiornati con successo']);
    }

    public function getDataFromPokeApi()
    {
        $client = new Client([
            'verify' => false,
        ]);

        // Recupera i dati dei tipi e salva nella tabella "types"
        $response = $client->get('https://pokeapi.co/api/v2/type');
        $data = json_decode($response->getBody(), true);

        foreach ($data['results'] as $type) {
            $typeModel = new Type();
            $typeModel->name = $type['name'];
            $typeModel->save();
        }

        // Recupera i dati dei Pokémon e salva nella tabella "pokemon"
        $response = $client->get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10');
        $data = json_decode($response->getBody(), true);

        foreach ($data['results'] as $pokemon) {
            $response = $client->get($pokemon['url']);
            $pokemonData = json_decode($response->getBody(), true);

            $descriptionUrl = $pokemonData['species']['url'];
            $descriptionResponse = $client->get($descriptionUrl);
            $descriptionData = json_decode($descriptionResponse->getBody(), true);

            $description = '';
            foreach ($descriptionData['flavor_text_entries'] as $entry) {
                if ($entry['language']['name'] === 'it') {
                    $description = $entry['flavor_text'];
                    break;
                }
            }

            $pokemonModel = new Pokemon();
            $pokemonModel->name = $pokemonData['name'];
            $pokemonModel->icon = $pokemonData['sprites']['front_default'];
            $pokemonModel->img = $pokemonData['sprites']['other']['official-artwork']['front_default'];
            $pokemonModel->img_shiny = $pokemonData['sprites']['other']['official-artwork']['front_shiny'];
            $pokemonModel->num_pkm = $pokemonData['id'];
            $pokemonModel->description = $description;
            $pokemonModel->save();

            foreach ($pokemonData['types'] as $type) {
                $typeModel = Type::where('name', $type['type']['name'])->first();
                if ($typeModel) {
                    $pokemonModel->types()->attach($typeModel->id);
                }
            }

            $client = new Client([
                'verify' => false,
            ]);
            $response = $client->get('https://pokeapi.co/api/v2/pokedex');
            $data = json_decode($response->getBody(), true);
            $pokedexes = $data['results'];

            foreach ($pokedexes as $pokedex) {

                $pokedexUrl = $pokedex['url'];


                $regionName = $pokedex['name'];

                if(Region::where('name', $regionName)->first() == null){
                    $region = new Region();
                    $region->name = $regionName;
                    $region->save();

                    $response = $client->get($pokedexUrl);
                    $pokedexData = json_decode($response->getBody(), true);
    
                    $pokemonEntries = $pokedexData['pokemon_entries'];
    
                    foreach ($pokemonEntries as $entry) {
                        $pokemonId = $entry['entry_number'];
    
                        $pokemon = Pokemon::findOrFail($pokemonId);
    
                        if($pokemon != null){
                            
                            $pokemon->regions()->attach($region);
                        }
    
                    }
                }
                
            }
            
        }

        return response()->json($data);
    }


    
    public function getPokemon($pokemon)
    {
        $client = new Client([
            'verify' => false,
        ]);
        $response = $client->get('https://pokeapi.co/api/v2/pokemon/' . $pokemon);
        $data = json_decode($response->getBody(), true);
        
        return response()->json($data);
    }
}
