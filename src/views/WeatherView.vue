<template>
  <section>
    <div class="head_search">
      <location-input @location="setLocation" />
      <p>{{ inputLocation }}</p>
    </div>
    <div><p>selected day/current</p></div>
  </section>
</template>
  
  <script setup>
import locationInput from '../components/locationInput.vue';
import { ref } from 'vue';

let inputLocation = ref('');
let weatherOutput = ref('');


function setLocation(location) {
  inputLocation.value = location;
}

function getGeoLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(sendLocation, this.locationError);
  }
}
function sendLocation(position) {
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
  //params are -- [city, lat, long] --
  const data = await getData(`http://localhost:8081/data/${params[0]}/${params[1]}/${params[2]}`);
  if (!data) {
    weatherOutput.value = '';
  } else {
    weatherOutput.value = data;
  }
}
</script>

<style scoped>
</style>