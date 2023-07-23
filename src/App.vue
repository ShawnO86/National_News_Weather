<template>
  <section class="currentWeather">
    <div class="search">
      <location-input @location="getWeather" />
    </div>
    <hourly-weather v-if="hourlyWeatherData" :hourlyWeather="hourlyWeatherData"></hourly-weather>
    <div v-else>
      <p>{{ locationMsg }}</p>
    </div>
  </section>
  <section class="sideBar">
    <side-bar :dailyWeather="dailyWeatherData"></side-bar>
  </section>
</template>

<script setup>
// Put in an alert icon with alert title and a rollover tooltip for weather alerts if there is one available
import locationInput from './components/locationInput.vue';
import hourlyWeather from './components/hourlyWeather.vue';
import sideBar from './components/sideBar.vue';
import { onMounted, ref } from 'vue';

const locationMsg = ref('');
const dailyWeatherData = ref('');
const hourlyWeatherData = ref('');

//functions for getting geoloction and sending to server on load
onMounted(function getGeoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendGeoLocation, locationError);
  }
});
function locationError(code) {
  locationMsg.value = code.message;
}
function sendGeoLocation(position) {
  getWeather(['no', position.coords.latitude, position.coords.longitude]);
}
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
async function getWeather(location) {
  const fetchWeather = await getData(
    `http://localhost:8081/weather/${location[0]}/${location[1]}/${location[2]}`
  );
  dailyWeatherData.value = {
    daily: fetchWeather.weatherData.dailyForecast,
    currentAir: fetchWeather.weatherData.airQualityCurrent,
    forecastAir: fetchWeather.weatherData.airQualityForecast,
    alerts: fetchWeather.weatherData.alerts.length >= 1 ? fetchWeather.weatherData.alerts : ''
  };
  hourlyWeatherData.value = {
    hourly: fetchWeather.weatherData.hourlyForecast,
    location: `${fetchWeather.zoneData.name}, ${fetchWeather.zoneData.local}`
  };
  console.log('daily: ', dailyWeatherData);
  console.log('hourly: ', hourlyWeatherData);
}
</script>

<style>
:root {
  --bg-hex: #274f72;
  --bg-rgb: 39, 79, 114;
  --secondary-hex: #478ecc;
  --secondary-rgb: 71, 142, 204;
  --greyblue-hex: #273746;
  --greyblue-rgb: 39, 55, 70;
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
  background: var(--bg-hex);
  color: #fff;
}
#app {
  margin: auto;
  max-width: 90rem;
  min-height: 100vh;
}
main {
  display: flex;
  justify-content: space-between;
}
.currentWeather {
  flex: 7;
  background: rgba(0, 0, 0, 0.25);
}
.search {
  padding: 1rem calc(clamp(0rem, 1vw, 1rem) + 0.5rem);
}
.sideBar {
  flex: 5;
  background: rgba(var(--secondary-rgb), 0.65);
  border-left: 1px solid var(--secondary-hex);
  border-right: 1px solid var(--secondary-hex);
  overflow-y: auto;
  max-height: 100vh;
}

@media screen and (max-width: 1024px) {
  #app {
    padding: 0 2rem;
  }
  main {
    flex-direction: column;
    gap: 2rem;
  }
  .currentWeather {
    flex: none;
    border-radius: 0 0 0.5rem 0.5rem;
  }
  .sideBar {
    border-radius: 0.5rem 0.5rem 0 0;
    overflow-y: normal;
    max-height: none;
  }
}

@media screen and (max-width: 768px) {
  #app {
    padding: 0 0.5rem;
  }
}
@media screen and (max-width: 425px) {
  body {
    line-height: 1.5;
  }
  #app {
    padding: 0 0;
  }
}
</style>