import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResultWeatherCity, IWeatherData } from '../interfaces/IWether.interface';
import { PokemonDetail, PokemonList, ReturnPokemonDetail } from '../interfaces/IPokemon.interface';
@Injectable({
  providedIn: 'root'
})
export class PokeWeatherService {

  constructor(private _http: HttpClient){}

  getWeatherPerCity(cityName: string): Observable<IWeatherData>{
    const urlApiWeather = environment.apiWeather.replace(':cityName', cityName)
    return this._http.get<IWeatherData>(urlApiWeather)
      .pipe(
        map((response: IWeatherData) =>({
          name: response.name,
          weather: response.weather,
          main: response.main
        }))  
      );
  }

  playloadPokemon(): Observable<ReturnPokemonDetail[]> {
    const urlApiPokemon = `${environment.apiPoke}`;
    return this._http.get<PokemonList>(urlApiPokemon).pipe(
      switchMap((pokemons: PokemonList) =>
        forkJoin(
          pokemons.results.map((pokemonDetail) =>
            this.getMoreInfo(pokemonDetail.url)
          )
        )
      )
    );
  }
  
  getMoreInfo(url: string): Observable<ReturnPokemonDetail> {
    return this._http.get<PokemonDetail>(url).pipe(
      map((pokemonDetail: PokemonDetail) => ({
        id: pokemonDetail.id,
        name: pokemonDetail.name,
        sprites: pokemonDetail.sprites.front_default,
        types: pokemonDetail.types.map((type) => type.type.name).toString()
      }))
    );
  }

  getPokemonByWeather(weatherData: IResultWeatherCity): string {
    const temperature = weatherData.temp;
    const isRaining = weatherData.description.includes('rain');

    if (isRaining) {
      return 'electric';
    } else if (temperature < 5) {
      return 'ice';
    } else if (temperature >= 5 && temperature < 10) {
      return 'water';
    } else if (temperature >= 12 && temperature < 15) {
      return 'grass';
    } else if (temperature >= 15 && temperature < 21) {
      return 'ground';
    } else if (temperature >= 23 && temperature < 27) {
      return 'bug';
    } else if (temperature >= 27 && temperature <= 33) {
      return 'rock';
    } else if (temperature > 33) {
      return 'fire';
    } else {
      return 'normal';
    }
  }
  
}
