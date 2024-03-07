import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PokemonListComponent } from './pokemon-home/pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-home/pokemon-detail/pokemon-detail.component';
import { PokemonHomeComponent } from './pokemon-home/pokemon-home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PokemonWelcomeComponent } from './pokemon-home/pokemon-welcome/pokemon-welcome.component';


@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonDetailComponent,
    PokemonHomeComponent,
    PokemonWelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
