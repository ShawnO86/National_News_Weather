<template>

  <p>Today and tommorow air quality here</p>
  <p>& alerts to be here.</p>

  <h3>7-Day Forecast <span>( Click box for more details )</span></h3>
  <daily-weather-display :weatherForecast="weatherForecast"></daily-weather-display>

</template>

<script setup>
import dailyWeatherDisplay from './dailyWeather.vue';
import { computed } from 'vue';

const props = defineProps(['dailyWeather']);
const weatherForecast = computed(() => props.dailyWeather.daily);
const airQualityCurrent = computed(() => props.dailyWeather.currentAir);
const airQualityForecast = computed(() => props.dailyWeather.forecastAir);
const alerts = computed(() => props.dailyWeather.alerts);
</script>

<style scoped>
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