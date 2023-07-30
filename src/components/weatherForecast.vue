<template>
  <div class="forecast">
    <div class="forecast_graphs">
      <h2 v-if="dailyWeatherOpen">Daily Forecast</h2>
      <h2 v-else-if="hourlyWeatherOpen">Hourly Forecast</h2>
      7 day temp, humidity, and precipitation graphs
    </div>
    <div v-for="(item, index) in props.weatherForecast" :key="index" class="dayOutput">
      <h3>{{ item[0].date }}</h3>

      <div v-for="(day, dayIndex) in item" :key="dayIndex" class="hourOutput">
        <daily-weather-item :weatherItem="day" v-if="dailyWeatherOpen"></daily-weather-item>
        <hourly-weather-item :weatherItem="day" v-else-if="hourlyWeatherOpen"></hourly-weather-item>
      </div>
    </div>
  </div>
</template>

<script setup>
import dailyWeatherItem from './dailyWeatherItem.vue';
import hourlyWeatherItem from './hourlyWeatherItem.vue';

const props = defineProps(['weatherForecast', 'dailyWeatherOpen', 'hourlyWeatherOpen']);
</script>