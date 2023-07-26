<template>
  <div class="forecast">
    <h3>Hourly Forecast</h3>
    <div class="forecast_graphs">48hour temp, humidity, and precipitation graphs</div>
    <div v-for="(item, index) in props.hourlyWeather" :key="index" class="dayOutput">
      <h4>{{ item[0].date }}</h4>

      <div v-for="(day, dayIndex) in item" :key="dayIndex" class="hourOutput">
        <hourly-weather-item :weatherItem="day"></hourly-weather-item>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import hourlyWeatherItem from './hourlyWeatherItem.vue';
const props = defineProps(['hourlyWeather']);
</script>
  
<style scoped>
</style>