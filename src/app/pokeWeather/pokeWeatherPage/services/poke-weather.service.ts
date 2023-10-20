import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IWeatherData } from '../interfaces/IWether.interface';
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
}
