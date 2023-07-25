<template>
  <header>
    <h1>{{ hourlyWeatherData.location }}</h1>
    <div class="search">
      <location-input @location="getWeather" />
    </div>
    <div v-if="locationMsg">
      <h1>{{ locationMsg }}</h1>
    </div>
  </header>
  <nav v-if="dailyWeatherData">
    <button
      @click="toggleHourlyWeatherOpen"
      :class="hourlyWeatherOpen ? 'active' : ''"
      class="toggle"
    >
      Hourly Forecast
    </button>
    <button
      @click="toggleDailyWeatherOpen"
      :class="dailyWeatherOpen ? 'active' : ''"
      class="toggle"
    >
      Daily Forecast
    </button>
  </nav>
  <section class="currentWeather">
    <current-weather :selectedHour="currentWeatherData" v-if="currentWeatherData"></current-weather>
  </section>
  <section class="forecast" v-if="dailyWeatherData">
    <hourly-weather v-if="hourlyWeatherOpen" :hourlyWeather="hourlyWeatherData"></hourly-weather>
    <daily-weather v-if="dailyWeatherOpen" :weatherForecast="dailyWeatherData"></daily-weather>
  </section>
</template>

<script setup>
// Put in an alert icon with alert title and a rollover tooltip for weather alerts if there is one available
import locationInput from './components/locationInput.vue';
import hourlyWeather from './components/hourlyWeather.vue';
import dailyWeather from './components/dailyWeather.vue';
import currentWeather from './components/currentWeather.vue';
import { onMounted, ref } from 'vue';

const locationMsg = ref('');
const dailyWeatherData = ref('');
const hourlyWeatherData = ref('');
const dates = ref('');
const currentWeatherData = ref('');
const hourlyWeatherOpen = ref(false);
const dailyWeatherOpen = ref(true);

function toggleHourlyWeatherOpen() {
  hourlyWeatherOpen.value = true;
  dailyWeatherOpen.value = false;
}
function toggleDailyWeatherOpen() {
  dailyWeatherOpen.value = true;
  hourlyWeatherOpen.value = false;
}
//functions for getting geoloction and sending to server onLoad
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
  locationMsg.value = 'Getting weather data...';
  const fetchWeather = await getData(
    `http://localhost:8081/weather/${location[0]}/${location[1]}/${location[2]}`
  );
  dailyWeatherData.value = {
    daily: fetchWeather.weatherData.dailyForecast
  };
  hourlyWeatherData.value = {
    hourly: fetchWeather.weatherData.hourlyForecast,
    location: `${fetchWeather.zoneData.name}, ${fetchWeather.zoneData.local}`,
    alerts: fetchWeather.weatherData.alerts.length >= 1 ? fetchWeather.weatherData.alerts : '',
    currentAir: fetchWeather.weatherData.airQualityCurrent,
    forecastAir: fetchWeather.weatherData.airQualityForecast
  };
  dates.value = Object.keys(hourlyWeatherData.value.hourly);
  currentWeatherData.value = hourlyWeatherData.value.hourly[dates.value[0]][0];
  locationMsg.value = '';
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
h5 {
  font-size: 0.9rem;
}
h6 {
  font-size: 0.8rem;
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
body::-webkit-scrollbar {
  width: 0.5rem;
}
body::-webkit-scrollbar-track {
  background: var(--greyblue-hex);
  border-radius: 0.5rem;
}
body::-webkit-scrollbar-thumb {
  background-color: var(--secondary-hex);
  border-radius: 0.5rem;
}
#app {
  margin: auto;
  max-width: 90rem;
  min-height: 100vh;
  padding: 0 4rem;
}
header {
  padding: 0.5rem 0;
}
nav {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  position: sticky;
  top: 1rem;
  background: var(--bg-hex);
}
nav button {
  flex: 1;
  min-width: 10rem;
  text-align: center;
  padding: 0.25rem 0;
  cursor: pointer;
  border: 2px solid var(--secondary-hex);
  background: var(--greyblue-hex);
  font-weight: 600;
  border-radius: 0.25rem;
  padding: 0.6rem 0.25rem;
}
.toggle {
  color: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 1);
}
.active {
  box-shadow: none;
  border: 2px solid #fff;
  background: rgba(var(--secondary-rgb), 0.5);
  color: #fff;
}
.description {
  font-size: 0.9rem;
}
/* shared styles for hourlyWeatherItems and dailyWeatherItems */
details summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--greyblue-hex);
  border: 1px solid var(--secondary-hex);
  cursor: pointer;
  height: 5rem;
  padding: 0 clamp(0.5rem, 2vw, 1.5rem);
  border-radius: 0.25rem;
  box-shadow: 0px 3px 3px -2px rgba(0, 0, 0, 1);
}
details summary::after {
  content: 'Right';
}
details[open] summary::after {
  content: 'Down';
}
details summary:hover,
details[open] summary {
  background: rgba(var(--secondary-rgb), 0.5);
  border: 1px solid #fff;
  box-shadow: none;
}
.dayOutput {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  background: rgba(var(--greyblue-rgb), 0.25);
  margin: 1.5rem 0 1rem 0;
  padding: 1rem 0;
  border-radius: 0.25rem;
}
.dayOutput h4 {
  flex: 100%;
  border-bottom: 1px solid var(--secondary-hex);
}
.hourOutput {
  flex: 45%;
  min-width: 20rem;
  max-width: calc(50% - 0.5rem);
}

@media screen and (max-width: 1024px) {
  #app {
    padding: 0 1.5rem;
  }
}

@media screen and (max-width: 768px) {
  #app {
    padding: 0 0.5rem;
  }
  .hourOutput {
    flex: 100%;
    min-width: 18rem;
    max-width: none;
  }
}
@media screen and (max-width: 425px) {
  body {
    line-height: 1.5;
  }
  #app {
    padding: 0 0.15rem;
  }
}
</style>