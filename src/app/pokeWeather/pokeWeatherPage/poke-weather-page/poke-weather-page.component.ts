import { Component, OnInit, ViewChild } from '@angular/core';
import { PokeWeatherService } from '../services/poke-weather.service';
import { IResultWeatherCity } from '../interfaces/IWether.interface';
import { ReturnPokemonDetail } from '../interfaces/IPokemon.interface';

@Component({
  selector: 'app-poke-weather-page',
  templateUrl: './poke-weather-page.component.html',
  styleUrls: ['./poke-weather-page.component.scss']
})
export class PokeWeatherPageComponent implements OnInit {
  
  inputValueFromChild: string = '';
  inputValue: string = '';
  resultWeatherCity: IResultWeatherCity = {
    temp: 0,
    name: '',
    description: ''
  };
  typePokemon: string = '';
  pokemon: ReturnPokemonDetail | undefined;
  pokemons: ReturnPokemonDetail[] | undefined;

  constructor(
    private _pokeWeatherService: PokeWeatherService){}

  ngOnInit(): void {
    this.getWeatherPerCity('acre')
    this.getPokemon()
  }

  getWeatherPerCity(cityName: string){
    this._pokeWeatherService.getWeatherPerCity(cityName).subscribe(el => {
      const {temp, name, description} = {
        temp: (el.main.temp - 273.15),
        name: el.name,
        description: el.weather[0].description
      }

      this.resultWeatherCity = {
        temp,
        name,
        description
      }

      this.typePokemon = this._pokeWeatherService.getPokemonByWeather(this.resultWeatherCity)
      console.log(this.typePokemon)
    })
  }

  getPokemon(){
    this._pokeWeatherService.playloadPokemon().subscribe(el => {
      this.pokemons = el.filter((pokemon) => pokemon.types.includes(this.typePokemon))

      const randomIndex = Math.floor(Math.random() * this.pokemons.length);
      const randomPokemon = this.pokemons[randomIndex];
      this.pokemon = randomPokemon;
    })
  }

}
