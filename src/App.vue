<template>
  <section class="mainLayout">
    <div class="currentWeather">
      <current-weather></current-weather>
    </div>
    <div class="sideBar">
      <side-bar @inputLocation="setLocation"></side-bar>
    </div>
    </section>
</template>

<script setup>
import currentWeather from './components/currentWeather.vue';
import sideBar from './components/sideBar.vue';
import { ref } from 'vue';

let inputLocation = ref('');
let locationMsg = ref('');
let weatherData = ref('');

function setLocation(location) {
  inputLocation.value = location;
  getWeather(inputLocation.value);
}
function getGeoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendGeoLocation, locationError);
  }
}
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
async function getWeather(params) {
  const fetchWeather = await getData(
    `http://localhost:8081/weather/${params[0]}/${params[1]}/${params[2]}`
  );
  weatherData.value = fetchWeather;
  console.log(weatherData);
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
  background: linear-gradient(180deg, #0f5b86 0%, #59b4ff 100%);
  color: #fff;
}
#app {
  margin: auto;
  max-width: 90rem;
  min-height: 100vh;
  padding: 0 1rem;
;
}
header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 1rem 0;
  gap: 1rem 2rem;
  grid-area: header;
}
.mainLayout {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}
.currentWeather {
  flex: 4;
}
.sideBar {
  flex: 3;
  background: rgba(15, 91, 134, 0.5);
  min-height: 100vh;
}
</style>