import { Component, OnInit } from '@angular/core';
import { PokeWeatherService } from '../services/poke-weather.service';

@Component({
  selector: 'app-poke-weather-page',
  templateUrl: './poke-weather-page.component.html',
  styleUrls: ['./poke-weather-page.component.scss']
})
export class PokeWeatherPageComponent implements OnInit {

  constructor(private _pokeWeatherService: PokeWeatherService){}

  ngOnInit(): void {
    this.weatherPerCity('Sao Paulo')
  }

  weatherPerCity(cityName: string){
    this._pokeWeatherService.getWeatherPerCity(cityName).subscribe(el => console.log(el))
  }

}
