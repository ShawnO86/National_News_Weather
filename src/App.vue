<template>
  <section class="mainLayout">
    <div class="currentWeather">
      <div class="search">
        <location-input @location="setLocation" />
      </div>
      <current-weather></current-weather>
    </div>
    <div class="sideBar">
      <side-bar></side-bar>
    </div>
  </section>
</template>

<script setup>
import locationInput from './components/locationInput.vue';
import currentWeather from './components/currentWeather.vue';
import sideBar from './components/sideBar.vue';
import { ref } from 'vue';

let inputLocation = ref('');
//let locationMsg = ref('');
let weatherData = ref('');

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
  weatherData.value = fetchWeather;
  console.log(weatherData.value);
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
.mainLayout {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  min-height: 100vh;
}
.currentWeather {
  flex: 4;
}
.search {
  margin: 1rem 0;
}
.sideBar {
  flex: 3;
  background: rgba(var(--bg-rgb), 0.6);
  min-height: 100vh;
}

@media screen and (max-width: 1024px) {
  .mainLayout {
    flex-direction: column;
  }
  .sideBar {
    margin-bottom: 2rem;
    border-radius: 1rem;
  }
}
</style>