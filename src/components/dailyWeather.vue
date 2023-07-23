<template>
  <div v-for="(item, index) in props.weatherForecast" :key="index" class="weatherItems">
    <daily-weather-item :weatherItem="item"></daily-weather-item>
    <p>{{ item }}</p>
  </div>
</template>

<script setup>
import dailyWeatherItem from "./dailyWeatherItem.vue";
const props = defineProps(['weatherForecast']);
</script>