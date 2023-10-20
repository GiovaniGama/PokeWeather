export interface IWeatherData {
  name: string;
  weather: IWeatherInfo[];
  main: IWeatherMain;
}

export interface IWeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
} 

export interface IResultWeatherCity {
  temp: number;
  name: string;
  description: string;
}