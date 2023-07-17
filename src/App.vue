<template>
  <section class="currentWeather">
    <div class="search">
      <location-input @location="setLocation" />
    </div>
    <hourly-weather v-if="hourlyWeatherData" :hourlyWeather="hourlyWeatherData"></hourly-weather>
  </section>
  <section class="sideBar">
    <side-bar></side-bar>
  </section>
</template>

<script setup>
// Put in an alert icon with alert title and a rollover tooltip for weather alerts if there is one available
import locationInput from './components/locationInput.vue';
import hourlyWeather from './components/hourlyWeather.vue';
import sideBar from './components/sideBar.vue';
import { ref } from 'vue';

let inputLocation = ref('');
//let locationMsg = ref('');
let dailyWeatherData = ref('');
let hourlyWeatherData = ref('');

function setLocation(location) {
  inputLocation.value = location;
  getWeather(inputLocation.value);
}
//functions for getting geoloction and sending to server
/* function getGeoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendGeoLocation, locationError);
  }
}
function locationError(code) {
  locationMsg.value = code.message;
}
function sendGeoLocation(position) {
  getWeather(['no', position.coords.latitude, position.coords.longitude]);
} */
async function getData(url = '') {
  //calls argument url and waits for data/status
  const req = await fetch(url);
  try {
    //return api data in JSON
    const data = await req.json();
    return data;
  } catch (e) {
    console.log('error', e);
  }
}
async function getWeather(params) {
  const fetchWeather = await getData(
    `http://localhost:8081/weather/${params[0]}/${params[1]}/${params[2]}`
  );
  dailyWeatherData.value = fetchWeather.weatherData.dailyForecast;
  hourlyWeatherData.value = {
    hourly: fetchWeather.weatherData.hourlyForecast,
    air: fetchWeather.weatherData.airQuality,
    alerts: fetchWeather.weatherData.alerts,
    location: `${fetchWeather.zoneData.name}, ${fetchWeather.zoneData.local}`
  };
  console.log('daily', dailyWeatherData.value);
  console.log('hourly', hourlyWeatherData.value);
}

/* for hourly forecast: have sun move with hours for daytime and then have moon come in for night with some type of slider to change the hour.*/
</script>

<style>
:root {
  --bg-hex: #0f5b86;
  --bg-rgb: 15, 91, 134;
  --secondary-hex: #59b4ff;
  --secondary-rgb: 89, 180, 255;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Segoe UI', sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  background: linear-gradient(180deg, var(--bg-hex) 0%, var(--secondary-hex) 100%);
  color: #fff;
}
#app {
  margin: auto;
  max-width: 90rem;
  min-height: 100vh;
  padding: 0 1rem;
}
main {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}
.currentWeather {
  flex: 4;
  background: rgba(var(--bg-rgb), 0.6);
}
.search {
  padding: 1rem calc(clamp(0rem, 1vw, 1rem) + 0.5rem);
}
.sideBar {
  flex: 3;
  background: rgba(var(--bg-rgb), 0.3);
}

@media screen and (max-width: 1024px) {
  #app {
    padding: 0 2rem;
  }
  main {
    flex-direction: column;
  }
  .currentWeather {
    flex: none;
  }
  
}

@media screen and (max-width: 768px) {
  body {
    line-height: 1.4;
  }
  #app {
    padding: 0 0.5rem;
  }
}
@media screen and (max-width: 425px) {
  #app {
    padding: 0 0;
  }
}
</style>