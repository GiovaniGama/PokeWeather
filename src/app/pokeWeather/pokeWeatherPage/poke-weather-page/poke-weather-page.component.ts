import { Component, OnInit, ViewChild } from '@angular/core';
import { PokeWeatherService } from '../services/poke-weather.service';
import { IResultWeatherCity } from '../interfaces/IWether.interface';
import { ReturnPokemonDetail } from '../interfaces/IPokemon.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-poke-weather-page',
  templateUrl: './poke-weather-page.component.html',
  styleUrls: ['./poke-weather-page.component.scss']
})
export class PokeWeatherPageComponent implements OnInit {
  
  inputValueFromChild: string = '';
  inputValue: string = '';
  resultWeatherCity: IResultWeatherCity | undefined;
  typePokemon: string = '';
  pokemon: ReturnPokemonDetail | undefined;
  pokemons: ReturnPokemonDetail[] | undefined;
  form!: FormGroup;
  showPokemon: boolean = false;

  constructor(
    private _pokeWeatherService: PokeWeatherService,
    private _formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nameCity: [null, Validators.required]
    })
  }

  
  async onSubmit(){
    await this.getWeatherPerCity(this.form.value.nameCity)
    await this.getPokemon()

    this.form.reset();
  }

  async getWeatherPerCity(cityName: string){
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
    })
  }

  async getPokemon(){
    this.showPokemon = false;
    this._pokeWeatherService.playloadPokemon().subscribe(el => {
      this.pokemons = el.filter((pokemon) => pokemon.types === this.typePokemon)

      const randomIndex = Math.floor(Math.random() * this.pokemons.length);
      const randomPokemon = this.pokemons[randomIndex];
      this.pokemon = randomPokemon;
      this.showPokemon = true;
    })
  }

  validTouched(value: string){
    return !this.form.get(value)?.valid &&this.form.get(value)?.touched
  }
}
