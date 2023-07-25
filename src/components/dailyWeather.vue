<template>
  <h3>Daily Forecast</h3>
  <div>7 day temp, humidity, and precipitation graphs</div>
  <div v-for="(item, index) in props.weatherForecast.daily" :key="index" class="dayOutput">
    <h4>{{ item[0].date }}</h4>

    <div v-for="(day, dayIndex) in item" :key="dayIndex" class="hourOutput">
      <daily-weather-item :weatherItem="day"></daily-weather-item>
    </div>
  </div>
</template>

<script setup>
import dailyWeatherItem from './dailyWeatherItem.vue';
const props = defineProps(['weatherForecast']);
</script>

<style scoped>
</style>