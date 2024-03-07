import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit{
  @Input() pokemon: any;
  @Input() showShinyImg: boolean = false;

  lastPokemon :any;

  ngOnInit(){
    console.log(this.pokemon);
    this.lastPokemon = this.pokemon;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.lastPokemon || this.pokemon.name != this.lastPokemon.name){
      this.showShinyImg = false;
      this.lastPokemon = this.pokemon;
    }
  }

  toggleShinyImage() {
    this.showShinyImg = !this.showShinyImg;
    console.log(this.showShinyImg)
  }

  tipoClasseMappa: {[key: string]: string} = {
    'Normal': 'css-class-normal',
    'Fire': 'css-class-fire',
    'Water': 'css-class-water',
    'Grass': 'css-class-grass',
    'Electric': 'css-class-electric',
    'Ice': 'css-class-ice',
    'Fighting': 'css-class-fighting',
    'Poison': 'css-class-poison',
    'Ground': 'css-class-ground',
    'Flying': 'css-class-flying',
    'Psychic': 'css-class-psychic',
    'Bug': 'css-class-bug',
    'Rock': 'css-class-rock',
    'Ghost': 'css-class-ghost',
    'Dragon': 'css-class-dragon',
    'Dark': 'css-class-dark',
    'Steel': 'css-class-steel',
    'Fairy': 'css-class-fairy'
  };
}
