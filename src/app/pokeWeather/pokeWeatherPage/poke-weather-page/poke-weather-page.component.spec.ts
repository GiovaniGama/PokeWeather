import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeWeatherPageComponent } from './poke-weather-page.component';

describe('PokeWeatherPageComponent', () => {
  let component: PokeWeatherPageComponent;
  let fixture: ComponentFixture<PokeWeatherPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokeWeatherPageComponent]
    });
    fixture = TestBed.createComponent(PokeWeatherPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
