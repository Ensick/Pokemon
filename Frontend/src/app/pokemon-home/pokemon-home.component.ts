import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-pokemon-home',
  templateUrl: './pokemon-home.component.html',
  styleUrls: ['./pokemon-home.component.css']
})
export class PokemonHomeComponent implements OnInit {

  pokemon : any; 

  constructor(private http: HttpClient) {
    
  }

  ngOnInit() {

  }

  savePokemon(pokemon : any){
    if(pokemon){
      this.pokemon = pokemon;
    }
  }

}
