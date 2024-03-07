import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonServiceService } from 'src/app/pokemon-service.service';
import { Pokemon } from '../pokemon';

interface PokemonCardList {
  name: string;
  id: number;
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemonData: PokemonCardList[];
  filteredPokemonData: PokemonCardList[];
  selectedPokemon: string;
  pokemon!: Pokemon;
  @Output() emitPokemon = new EventEmitter();
  searchText: string;
  selPokemon: any;

  constructor(private pokemonService: PokemonServiceService) {
    this.pokemonData = [];
    this.filteredPokemonData = [];
    this.selectedPokemon = '';
    this.searchText = '';
  }


  ngOnInit() {
    this.pokemonService.getAllPokemon().subscribe((data: any) => {
      this.pokemonData = data.results.map((pokemon: PokemonCardList, index: number) => ({
        name: pokemon.name,
        id: index + 1
      }));
      this.filteredPokemonData = [...this.pokemonData];
      console.log(this.pokemonData)
    });
  }

  selectionPokemon(pokemon: PokemonCardList) {
    this.selectedPokemon = pokemon.name;
    this.pokemonService.getSelectPokemon(this.selectedPokemon).subscribe((selectPokemon: Pokemon) => {
      this.pokemon =  new Pokemon(selectPokemon);
      this.emitPokemon.emit(this.pokemon);
    });

    if (this.selPokemon === pokemon) {
      this.selPokemon = null; 
    } else {
      this.selPokemon = pokemon; 
    }

  }

  filterPokemon() {
    if (!this.searchText) {
      this.filteredPokemonData = [...this.pokemonData];
    } else {
      this.filteredPokemonData = this.pokemonData.filter((pokemon: PokemonCardList) =>
        pokemon.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  
}
