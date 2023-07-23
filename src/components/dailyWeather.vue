<template>
  <div class="weatherItems">
    <div v-for="(item, index) in props.weatherForecast" :key="index">
      <daily-weather-item :weatherItem="item"></daily-weather-item>
    </div>
  </div>
</template>

<script setup>
import dailyWeatherItem from './dailyWeatherItem.vue';
const props = defineProps(['weatherForecast']);
</script>

<style scoped>
.weatherItems {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>