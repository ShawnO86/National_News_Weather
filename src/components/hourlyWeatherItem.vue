<template>
  <details>
    <summary>
      <div class="summaryHeader">
        <h4>{{ props.weatherItem.time }} - {{ props.weatherItem.temp }}</h4>
        <p class="description">{{ props.weatherItem.shortDesc  }}</p>
      </div>

    </summary>
    <div class="weatherDetails">
      <img v-if="weatherIconUrl" :src="weatherIconUrl" class="weatherIcon"/>
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
import { defineProps, ref, onMounted } from 'vue';

const props = defineProps(['weatherItem']);
const weatherIconUrl = ref(null);

onMounted(async () => {
  // Simulating an API call delay with setTimeout
  setTimeout(() => {
    weatherIconUrl.value = props.weatherItem.icon;
  }, 200);
});
</script>