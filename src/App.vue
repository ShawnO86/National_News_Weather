<template>
  <header>
    <div class="themeSwitcher">
      <p>Theme:</p>
      <theme-switcher @colors="changeThemeColors" @theme="changeThemeName"></theme-switcher>
    </div>
    <div class="search">
      <location-input @location="getWeather" />
    </div>
    <div v-if="locationMsg">
      <h1>{{ locationMsg }}</h1>
    </div>
    <h1 v-if="location">{{ location }}</h1>
  </header>
  <nav v-if="dailyWeatherData">
    <button
      @click="toggleCurrentWeatherOpen"
      :class="currentWeatherOpen ? 'active' : ''"
      class="toggle"
      aria-label="Current Weather"
    ></button>
    <button
      @click="toggleDailyWeatherOpen"
      :class="dailyWeatherOpen ? 'active' : ''"
      class="toggle"
      aria-label="Daily Forecast"
    ></button>
    <button
      @click="toggleHourlyWeatherOpen"
      :class="hourlyWeatherOpen ? 'active' : ''"
      class="toggle"
      aria-label="Hourly Forecast"
    ></button>
  </nav>
  <section class="currentWeather" v-if="currentWeatherOpen">
    <current-weather
      :currentWeather="currentWeatherData"
      v-if="currentWeatherData"
    ></current-weather>
  </section>
  <section class="forecastWeather" v-if="hourlyWeatherOpen || dailyWeatherOpen">
    <weather-forecast
      v-if="hourlyWeatherOpen"
      :weatherForecast="hourlyWeatherData"
      :hourlyWeatherOpen="hourlyWeatherOpen"
      :themeName="currentTheme"
    ></weather-forecast>
    <weather-forecast
      v-else-if="dailyWeatherOpen"
      :weatherForecast="dailyWeatherData"
      :dailyWeatherOpen="dailyWeatherOpen"
      :themeName="currentTheme"
    ></weather-forecast>
  </section>
</template>

<script setup>
import locationInput from './components/locationInput.vue';
import currentWeather from './components/currentWeather.vue';
import themeSwitcher from './components/themeSwitcher.vue';
import { defineAsyncComponent, onMounted, ref } from 'vue';

const weatherForecast = defineAsyncComponent(() => import('./components/weatherForecast.vue'));

const locationMsg = ref('');
const location = ref('');
const currentWeatherData = ref('');
const dailyWeatherData = ref('');
const hourlyWeatherData = ref('');
const currentTheme = ref('');

//for toggle of displayed weather data
const currentWeatherOpen = ref(true);
const hourlyWeatherOpen = ref(false);
const dailyWeatherOpen = ref(false);
function toggleCurrentWeatherOpen() {
  currentWeatherOpen.value = true;
  hourlyWeatherOpen.value = false;
  dailyWeatherOpen.value = false;
}
function toggleHourlyWeatherOpen() {
  currentWeatherOpen.value = false;
  hourlyWeatherOpen.value = true;
  dailyWeatherOpen.value = false;
}
function toggleDailyWeatherOpen() {
  currentWeatherOpen.value = false;
  dailyWeatherOpen.value = true;
  hourlyWeatherOpen.value = false;
}
//functions for getting geoloction and sending to server onLoad
onMounted(() => {
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
    locationMsg.value = 'Error getting weather data. Please try again later.';
  }
}
async function getWeather(location) {
  locationMsg.value = 'Getting weather data...';
  const fetchWeather = await getData(
    `http://localhost:8081/weather/getData${location[0]}/${location[1]}/${location[2]}`
  );
  /*   const fetchWeather = await getData(`http://localhost:8081/weather/test`); */
  dailyWeatherData.value = fetchWeather.weatherData.dailyForecast;
  hourlyWeatherData.value = fetchWeather.weatherData.hourlyForecast;
  location.value = `${fetchWeather.zoneData.name}, ${fetchWeather.zoneData.local}`;
  const dates = Object.keys(hourlyWeatherData.value);
  currentWeatherData.value = {
    current: hourlyWeatherData.value[dates[0]][0],
    alerts:
      fetchWeather.weatherData.alerts.length >= 1 ? fetchWeather.weatherData.alerts : 'No alerts',
    currentAir: fetchWeather.weatherData.airQualityCurrent,
    futureAir: fetchWeather.weatherData.airQualityForecast
  };
  console.log('current', currentWeatherData.value);
  console.log('daily: ', dailyWeatherData.value);
  console.log('hourly:', hourlyWeatherData.value);
  locationMsg.value = '';
}
function changeThemeColors(color) {
  document.documentElement.style.setProperty('--bg-hex', color.bgHex);
  document.documentElement.style.setProperty('--bg-rgb', color.bgRGB);
  document.documentElement.style.setProperty('--secondary-hex', color.secondaryHex);
  document.documentElement.style.setProperty('--secondary-rgb', color.secondaryRGB);
  document.documentElement.style.setProperty('--greyblue-hex', color.greyBlueHex);
  document.documentElement.style.setProperty('--greyblue-rgb', color.greyBlueRGB);
  document.documentElement.style.setProperty('--text-hex', color.textHex);
  document.documentElement.style.setProperty('--text-rgb', color.textRGB);
}
function changeThemeName(theme) {
  currentTheme.value = theme;
}
</script>

<style>
:root {
  --bg-hex: #273745;
  --bg-rgb: 39, 55, 69;
  --secondary-hex: #7cb0de;
  --secondary-rgb: 124, 175, 222;
  --greyblue-hex: #5c6266;
  --greyblue-rgb: 81, 88, 94;
  --text-hex: #fff;
  --text-rgb: 255, 255, 255;
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
  color: var(--text-hex);
}
/* scrollbar styles */
*::-webkit-scrollbar {
  width: 0.65rem;
  height: 0.65rem;
}
*::-webkit-scrollbar-track {
  background: var(--greyblue-hex);
}
*::-webkit-scrollbar-thumb {
  background-color: var(--secondary-hex);
  border-radius: 0.25rem;
}
/* main app styles */
#app {
  margin: auto;
  max-width: 90rem;
}
header {
  background: rgb(var(--bg-rgb));
  padding: 2rem clamp(1rem, 4vw, 4rem);
}
.themeSwitcher {
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 1rem;
}
nav {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(0.25rem, 1vw, 1rem);
  position: sticky;
  top: 0;
  background: rgb(var(--bg-rgb));
  margin: 0 clamp(1rem, 4vw, 4rem) 1.5rem clamp(1rem, 4vw, 4rem);
  padding: 0.5rem 0;
  z-index: 2;
}
nav button {
  flex: 1;
  text-align: center;
  cursor: pointer;
  border: none;
  border-top: 1px solid rgba(var(--secondary-rgb), 0.5);
  border-bottom: 1px solid rgba(var(--secondary-rgb), 0.5);
  background: rgba(0, 0, 0, 0.15);
  font-weight: 600;
  padding: clamp(0.3rem, 1vw, 0.65rem) 0.25rem;
  transition: background 0.4s;
  border-radius: 0.25rem;
}
nav button:nth-of-type(1)::before {
  content: 'Current Weather';
}
nav button:nth-of-type(2)::before {
  content: 'Daily Forecast';
}
nav button:nth-of-type(3)::before {
  content: 'Hourly Forecast';
}
.toggle {
  color: rgba(var(--text-rgb), 0.75);
}
nav button:hover {
  border-top: 2px solid rgba(var(--secondary-rgb), 1);
  border-bottom: 2px solid rgba(var(--secondary-rgb), 1);
  color: rgba(var(--text-rgb), 1);
}
.active {
  border-top: 2px solid rgba(var(--secondary-rgb), 1);
  border-bottom: 2px solid rgba(var(--secondary-rgb), 1);
  background: rgba(var(--secondary-rgb), 0.25);
  color: rgba(var(--text-rgb), 1);
}
.currentWeather {
  display: flex;
  flex-direction: column;
}
/* shared styles for hourlyWeatherItem, dailyWeatherItem & alertDisplay to use app media queries*/
.alertDisplay {
  padding: 1.5rem clamp(1rem, 4vw, 4rem) 3rem clamp(1rem, 4vw, 4rem);
}
.forecast_graphs {
  padding: 0 clamp(1rem, 4vw, 4rem);
}
.forecastChart {
  position: relative;
  height: 15rem;
  overflow-x: scroll;
}
.forecastChart > canvas {
  position: absolute;
  left: 0;
  top: 0;
}
.chartWrapper {
  margin: auto;
  width: 100%;
  height: 100%;
  overflow-x: auto;
}
.forecast_graphs ul {
  list-style: none;
  display: flex;
  justify-content: center;
  gap: clamp(0.25rem, 1vw, 1rem);
  background: rgba(0, 0, 0, 0.1);
  padding: 0.5rem clamp(0.25rem, 1vw, 1rem);
}
.forecast_graphs ul li {
  cursor: pointer;
  text-decoration: underline;
}
.forecast_graphs ul li:hover {
  color: var(--greyblue-hex);
}
.dayOutput {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 2rem clamp(1rem, 4vw, 4rem);
  border-radius: 0.25rem;
}
.dayOutput h3 {
  flex: 100%;
  border-bottom: 2px solid var(--secondary-hex);
  font-size: larger;
}
.hourOutput {
  flex: 40%;
  min-width: 20rem;
}
.weatherIcon {
  border-radius: 0.25rem;
  width: 3.5rem;
  height: 3.5rem;
}
details {
  background: rgba(var(--secondary-rgb), 0.25);
  border: 1px solid var(--greyblue-hex);
  border-radius: 0.25rem;
  padding: 0.5rem;
  transition: padding 0.2s, margin-bottom 0.2s;
  margin-bottom: 0;
}
details:hover {
  margin-bottom: -0.5rem;
  padding-bottom: 1rem;
}
details[open]:hover {
  margin-bottom: 0;
  padding: 0.5rem;
  transition: none;
}
details summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(var(--greyblue-rgb), 0.75);
  cursor: pointer;
  min-height: 5rem;
  padding: 0 clamp(0.5rem, 2vw, 1.5rem);
  border-radius: 0.25rem;
  color: var(--text-hex);
  transition: background 0.2s;
}
details summary .summaryIcon {
  transition: transform 0.2s;
}
details[open] summary .summaryIcon {
  transform: rotate(90deg) translateX(0.5rem);
}
details[open] summary:hover,
details summary:hover {
  background: rgba(var(--greyblue-rgb), 1);
}
.summaryHeader {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  flex: 2;
}
.summaryHeader .description {
  font-size: 0.9rem;
  flex: 100%;
  padding-left: clamp(0.5rem, 2vw, 1.5rem);
}
.summaryHeader .description span {
  font-size: 1rem;
  font-weight: 500;
}
.summaryHeader h4 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: clamp(0.5rem, 2vw, 1.5rem);
}
.weatherDetails {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 1rem clamp(1rem, 50%, 3rem);
}
.weatherDetails ul {
  list-style: none;
  width: 100%;
  margin: auto;
}
.weatherDetails ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.weatherDetails_line {
  flex: 2;
  border-bottom: 2px dashed rgba(var(--greyblue-rgb), 0.65);
  margin: 0 1rem;
}
.weatherDesc {
  margin: 1.5rem clamp(1rem, 50%, 3rem);
}
.weatherDesc p {
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.5rem;
  margin-bottom: 1rem;
}
.icon {
  width: 2.5rem;
  height: 100%;
  margin: 0 clamp(0.5rem, 2vw, 1.5rem) 0 0;
}

@media screen and (max-width: 768px) {
  nav {
    gap: 1px;
  }
  nav button {
    border-radius: 0;
  }
  nav button:nth-of-type(1) {
    border-radius: 0.25rem 0 0 0.25rem;
  }
  nav button:nth-of-type(3) {
    border-radius: 0 0.25rem 0.25rem 0;
  }
  nav button:nth-of-type(1)::before {
    content: 'Current';
  }
  nav button:nth-of-type(2)::before {
    content: 'Daily';
  }
  nav button:nth-of-type(3)::before {
    content: 'Hourly';
  }
  details {
    background: rgba(var(--secondary-rgb), 0.25);
    border-radius: 0.25rem;
    padding: 0.25rem;
    margin-bottom: 0;
    transition: none;
  }
  details:hover,
  details[open]:hover {
    margin-bottom: 0;
    padding: 0.25rem;
  }

  .hourOutput {
    flex: 100%;
    min-width: 18rem;
    max-width: none;
  }
  .icon {
    width: 2rem;
  }
  .forecastChart {
    position: relative;
    height: 12rem;
    overflow-x: scroll;
  }
  .chartWrapper {
    margin: auto;
    width: fit-content;
    height: 100%;
    overflow-x: auto;
  }
}
@media screen and (max-width: 425px) {
  nav {
    background: rgba(var(--greyblue-rgb), 0.5);
    margin: 0.5rem 0 2rem 0;
    padding: 0;
  }
  nav button:nth-of-type(1),
  nav button:nth-of-type(3) {
    border-radius: 0;
  }
  header,
  .airQuality,
  .alertDisplay,
  .dayOutput {
    padding: 1rem 0.5rem;
  }
  .icon {
    width: 1.6rem;
  }
  .weatherDetails {
    margin: 0.75rem;
  }
  .weatherDesc {
    margin: 1rem 0.75rem;
  }
}
</style>