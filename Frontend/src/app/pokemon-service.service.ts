import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Pokemon } from './pokemon-home/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonServiceService {
 
  constructor(private http: HttpClient) {}

  getSelectPokemon(pokemon: string){
    return this.http
    // http://127.0.0.1:8000/api/pokemon/
    .get('https://pokeapi.co/api/v2/pokemon/' + pokemon)
    .pipe(
      map((res: any) => {
        if (res) {
  
         return  res;
          
        }
        return [];
      })
    );
  }

  getAllPokemon(): Observable<string[]> {
    return this.http
    // http://127.0.0.1:8000/api/allPokemon
      .get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1281')
      .pipe(
        map((res: any) => {
          if (res) {

            return res;
          }
          return [];
        })
      );
  }
}
