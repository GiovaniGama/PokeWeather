import { Component, OnInit, ViewChild } from '@angular/core';
import { PokeWeatherService } from '../services/poke-weather.service';
import { IResultWeatherCity } from '../interfaces/IWether.interface';
import { ReturnPokemonDetail } from '../interfaces/IPokemon.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogErrorComponent } from 'src/app/components/dialog-error/dialog-error.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  pokemon: ReturnPokemonDetail | null | undefined;
  pokemons: ReturnPokemonDetail[] | undefined;
  form!: FormGroup;
  showInfo: boolean = false;

  constructor(
    private _pokeWeatherService: PokeWeatherService,
    private _formBuilder: FormBuilder,
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nameCity: [null, Validators.required]
    })
  }

  
  async onSubmit(){
    await this.getWeatherPerCity(this.form.value.nameCity)

    this.form.reset();
  }

  async getWeatherPerCity(cityName: string) {
    this._pokeWeatherService.getWeatherPerCity(cityName).subscribe(async el => {
      const { temp, name, description } = {
        temp: (el.main.temp - 273.15),
        name: el.name,
        description: el.weather[0].description
      };

      this.resultWeatherCity = {
        temp,
        name,
        description
      };

      this.typePokemon = this._pokeWeatherService.getPokemonByWeather(this.resultWeatherCity);
      await this.getPokemon();
    },
    error => {
      this.openDialog(`City not found!`);
      console.error('Error in obtaining climate data', error);
    });
  }

  async getPokemon(){
    this._pokeWeatherService.playloadPokemon().subscribe(el => {
      this.pokemons = el.filter((pokemon) => pokemon.types === this.typePokemon)
      const randomIndex = Math.floor(Math.random() * this.pokemons.length);
      const randomPokemon = this.pokemons[randomIndex];
      this.pokemon = randomPokemon;
      this.showInfo = true
    },
    error => {
      this.openDialog(`Error: Error obtaining pokemon data`);
      console.error('Error obtaining pokemon data:', error);
    });
  }

  validTouched(value: string){
    return !this.form.get(value)?.valid &&this.form.get(value)?.touched
  }

  openDialog(messageErr: string): void {
    this.dialog.open(DialogErrorComponent, {
      width: '250px',
      data: messageErr
    });
  }
}
