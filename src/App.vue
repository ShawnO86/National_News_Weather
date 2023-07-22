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
    <side-bar></side-bar>
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
  --bg-hex: #346895;
  --bg-rgb: 52, 104, 149;
  --secondary-hex: #478ECC;
  --secondary-rgb: 71, 142, 204;
  --greyblue-hex: #536b80;
  --greyblue-rgb: 83, 107, 128;
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
  background: var(--greyblue-hex);
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
  background: rgba(var(--bg-rgb), 0.5);
  min-height: 60vh;
}
.search {
  padding: 1rem calc(clamp(0rem, 1vw, 1rem) + 0.5rem);
}
.sideBar {
  flex: 3;
  background: rgba(var(--secondary-rgb), 0.5);
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
    border-radius: 0 0 0.5rem 0.5rem;
  }
  .sideBar {
    border-radius: 0.5rem 0.5rem 0 0;
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