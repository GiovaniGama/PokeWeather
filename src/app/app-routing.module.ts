import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokeWeatherPageComponent } from './pokeWeather/pokeWeatherPage/poke-weather-page/poke-weather-page.component';
import { HomeComponent } from './pokeWeather/home/home.component';

const routes: Routes = [
  { path: 'pokeWeather', component: PokeWeatherPageComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
