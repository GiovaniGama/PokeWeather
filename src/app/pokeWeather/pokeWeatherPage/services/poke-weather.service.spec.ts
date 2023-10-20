import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PokeWeatherService } from './poke-weather.service';
import { HttpClientModule } from '@angular/common/http';

describe('PokeWeatherService', () => {
  let service: PokeWeatherService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [PokeWeatherService],
    });
    service = TestBed.inject(PokeWeatherService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve weather data', () => {
    const cityName = 'Acre';
    const mockWeatherData = {
      name: 'Acre',
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01n' }],
      main: {
        temp: 293.58,
        feels_like: 293.82,
        temp_min: 293.14,
        temp_max: 294.3,
        pressure: 1018,
        humidity: 82,
      },
    };

    service.getWeatherPerCity(cityName).subscribe((data) => {
      expect(data.name).toEqual('Acre');
      expect(data.weather).toEqual(mockWeatherData.weather);
      expect(data.main).toEqual(mockWeatherData.main);
    });

    const req = httpTestingController.expectOne((request) => request.url.endsWith(cityName));
    expect(req.request.method).toEqual('GET');

    req.flush(mockWeatherData);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
