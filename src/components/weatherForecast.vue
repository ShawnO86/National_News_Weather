<template>
  <div class="forecast">
    <div class="forecast_graphs">
      <h2 v-if="dailyWeatherOpen">Daily Forecast</h2>
      <h2 v-else-if="hourlyWeatherOpen">Hourly Forecast</h2>
      <forecast-chart
        :weatherData="weatherForecast"
        :dailyWeatherOpen="dailyWeatherOpen"
        :hourlyWeatherOpen="hourlyWeatherOpen"
        :theme="themeName"
      ></forecast-chart>
    </div>
    <div v-for="(item, index) in props.weatherForecast" :key="index" class="dayOutput">
      <h3>{{ index }}</h3>

      <div v-for="(day, dayIndex) in item" :key="dayIndex" class="hourOutput">
        <weather-item
          :weatherItem="day"
          :firstOpen="index === isFirst(props.weatherForecast)"
          :dailyWeatherOpen="dailyWeatherOpen"
          v-if="dailyWeatherOpen"
        ></weather-item>
        <weather-item
          :weatherItem="day"
          :firstOpen="index === isFirst(props.weatherForecast) && (dayIndex == 0 || dayIndex == 1)"
          :dailyWeatherOpen="dailyWeatherOpen"
          v-else
        ></weather-item>
      </div>
    </div>
  </div>
</template>

<script setup>
import weatherItem from './weatherItem.vue';
import forecastChart from './forecastChart.vue';

const props = defineProps(['weatherForecast', 'dailyWeatherOpen', 'hourlyWeatherOpen', 'themeName']);

function isFirst(forecast) {
  const firstDate = Object.keys(forecast);
  return firstDate[0];
}
</script>