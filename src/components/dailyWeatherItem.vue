<template>
  <details>
    <summary>
      <div class="summaryHeader">
        <h4>{{ props.weatherItem.name }} - {{ props.weatherItem.temp }}</h4>
        <p class="description">{{ props.weatherItem.shortDesc }}</p>
      </div>
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
    <div class="weatherDesc">
      <p v-if="!props.weatherItem.isDaytime">Dew Point -- {{ props.weatherItem.dewpoint }}</p>
      <p v-else>
        <span v-if="props.weatherItem.astro">Sunrise -- {{ convertUtcToLocal(props.weatherItem.astro.sunrise) }}</span> /
        <span v-if="props.weatherItem.astro">Sunset -- {{ convertUtcToLocal(props.weatherItem.astro.sunset) }}</span>
      </p>
      <p>{{ props.weatherItem.detailDesc }}</p>
    </div>
  </details>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['weatherItem']);
const weatherIconUrl = ref(null);

onMounted(async () => {
    weatherIconUrl.value = props.weatherItem.icon;
});

function convertUtcToLocal(utcTime) {
  const utcDate = new Date(utcTime);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localOptions = { timeZone: userTimeZone };
  const localDate = new Date(utcDate.toLocaleString('en-US', localOptions));

  const localTimeString = localDate.toLocaleString('en-US', localOptions);
  let formatedTime = localTimeString.split(',');
  return formatedTime[1];
}
</script>