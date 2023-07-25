<template>
  <div class="sideBar_Header">
    <h3>7 Day Forecast <span>( Click box for more details )</span></h3>
  </div>

</template>

<script setup>
import dailyWeatherDisplay from './dailyWeather.vue';
import { computed } from 'vue';

const props = defineProps(['dailyWeather']);
const weatherForecast = computed(() => props.dailyWeather.daily);
</script>

<style scoped>
h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
span {
  font-size: smaller;
}
</style>