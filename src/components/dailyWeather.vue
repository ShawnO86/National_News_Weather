<template>
  <div class="forecast">
    <h2>Daily Forecast</h2>
    <div class="forecast_graphs">7 day temp, humidity, and precipitation graphs</div>
    <div v-for="(item, index) in props.weatherForecast" :key="index" class="dayOutput">
      <h3>{{ item[0].date }}</h3>

      <div v-for="(day, dayIndex) in item" :key="dayIndex" class="hourOutput">
        <daily-weather-item :weatherItem="day"></daily-weather-item>
      </div>
    </div>
  </div>
</template>

<script setup>
import dailyWeatherItem from './dailyWeatherItem.vue';
const props = defineProps(['weatherForecast']);
</script>

<style scoped>
</style>