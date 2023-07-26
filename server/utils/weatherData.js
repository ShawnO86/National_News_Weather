class WeatherData {
  constructor() {
    this.zoneData = {};
    this.weatherData = {};
  }
  setZoneData(data) {
    this.zoneData = data;
  }
  setWeatherData(data) {
    this.weatherData = data;
  }
}

export default WeatherData;