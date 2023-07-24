<template>
  <div class="sideBar_Header">
    <p v-if="alerts">Alerts: {{ alerts }}</p>
    <div class="airQuality"><p>Today and tommorow air quality here</p></div>
    <h3>7 Day Forecast <span>( Click box for more details )</span></h3>
  </div>

  <daily-weather-display :weatherForecast="weatherForecast"></daily-weather-display>
</template>

<script setup>
import dailyWeatherDisplay from './dailyWeather.vue';
import { computed } from 'vue';

const props = defineProps(['dailyWeather']);
const weatherForecast = computed(() => props.dailyWeather.daily);
const alerts = computed(() => props.dailyWeather.alerts);
</script>

<style scoped>
.sideBar_Header {
  padding: 0.5rem 1.5rem;
}
h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
}
span {
  font-size: smaller;
}
</style>