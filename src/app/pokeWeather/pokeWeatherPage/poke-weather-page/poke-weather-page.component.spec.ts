import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PokeWeatherPageComponent } from './poke-weather-page.component';
import { PokeWeatherService } from '../services/poke-weather.service';

describe('PokeWeatherPageComponent', () => {
  let component: PokeWeatherPageComponent;
  let fixture: ComponentFixture<PokeWeatherPageComponent>;
  let pokeWeatherService: PokeWeatherService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [PokeWeatherPageComponent],
      providers: [PokeWeatherService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PokeWeatherPageComponent);
    component = fixture.componentInstance;
    pokeWeatherService = TestBed.inject(PokeWeatherService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getWeatherPerCity method on form submit', async () => {
    spyOn(component, 'getWeatherPerCity');
    const cityName = 'New York';
    component.form.get('nameCity')?.setValue(cityName);
    component.onSubmit();
    expect(component.getWeatherPerCity).toHaveBeenCalledWith(cityName);
  });

  it('should set resultWeatherCity and call getPokemon on getWeatherPerCity', async () => {

    const mockWeatherData: any = {
      main: {
        temp: 280
      },
      name: 'New York',
      weather: [
        {
          id: 1,
          main: 'Clouds',
          description: 'partly cloudy',
          icon: '02d'
        }
      ]
    };
    
    spyOn(pokeWeatherService, 'getWeatherPerCity').and.returnValue(of(mockWeatherData));
    spyOn(component, 'getPokemon');

    await component.getWeatherPerCity('New York');
    expect(component.resultWeatherCity?.temp).toEqual(6.850000000000023);
    expect(component.resultWeatherCity?.name).toEqual('New York');
    expect(component.resultWeatherCity?.description).toEqual('cloudy');
    expect(component.getPokemon).toHaveBeenCalled();
  });

  it('should set pokemons and pokemon on getPokemon', async () => {
    const mockPokemonList = [
      { id: 1, name: 'Bulbasaur', sprites: 'url_to_image', types: 'grass' },
      { id: 2, name: 'Charmander', sprites: 'url_to_image', types: 'fire' }
    ];
    spyOn(pokeWeatherService, 'playloadPokemon').and.returnValue(of(mockPokemonList));

    await component.getPokemon();
    expect(component.pokemons).toEqual(mockPokemonList);
    expect(component.pokemon).toBeDefined();
    expect(component.showInfo).toBeTrue();
  });

  it('should return false for validTouched when the form value is valid and touched', () => {
    component.form.get('nameCity')?.setValue('New York');
    component.form.get('nameCity')?.markAsTouched();
    expect(component.validTouched('nameCity')).toBeFalse();
  });
});
