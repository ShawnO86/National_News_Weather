<template>
  <details>
    <summary>
      <img v-if="weatherIconUrl" :src="weatherIconUrl" class="weatherIcon" />
<!--       <change-weather-icon :desc="props.weatherItem.shortDesc" :time="props.weatherItem.isDaytime"></change-weather-icon> -->
      <div class="summaryHeader">
        <h4>{{ props.weatherItem.time }} -- {{ props.weatherItem.temp }}</h4>
        <p class="description">{{ props.weatherItem.shortDesc }}</p>
      </div>

      <font-awesome-icon :icon="['fas', 'caret-right']" class="summaryIcon" />
    </summary>
    <div class="weatherDetails">
      <img v-if="weatherIconUrl" :src="weatherIconUrl" class="weatherIcon" />
      <ul>
        <li>Temp -- {{ props.weatherItem.temp }}</li>
        <li>Rain -- {{ props.weatherItem.precip }}</li>
        <li>Humidity -- {{ props.weatherItem.humidity }}</li>
        <li>Wind -- {{ props.weatherItem.windSpeed }} {{ props.weatherItem.windDirection }}</li>
      </ul>
    </div>
  </details>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import changeWeatherIcon from './changeWeatherIcon.vue';

const props = defineProps(['weatherItem']);
const weatherIconUrl = ref(null);

onMounted(async () => {
  weatherIconUrl.value = props.weatherItem.icon;
});
</script>