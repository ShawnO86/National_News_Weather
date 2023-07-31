<template>
  <details :open="firstOpen">
    <summary>
      <img
        v-if="weatherIconUrl"
        :src="weatherIconUrl"
        class="weatherIcon"
        :alt="props.weatherItem.shortDesc + ' image icon'"
      />
      <div class="summaryHeader" v-if="dailyWeatherOpen">
        <h4>{{ props.weatherItem.name }} -- {{ props.weatherItem.temp }}</h4>
        <p class="description">{{ props.weatherItem.shortDesc }}</p>
      </div>
      <div class="summaryHeader" v-else>
        <h4>{{ props.weatherItem.time }} -- {{ props.weatherItem.temp }}</h4>
        <p class="description">{{ props.weatherItem.shortDesc }}</p>
      </div>
      <font-awesome-icon :icon="['fas', 'caret-right']" class="summaryIcon" />
    </summary>
    <div class="weatherDetails">
      <ul>
        <li>
          Temp <span class="weatherDetails_line"></span>
          <span>{{ props.weatherItem.temp }}</span>
        </li>
        <li>
          Rain <span class="weatherDetails_line"></span>
          <span>{{ props.weatherItem.precip }}</span>
        </li>
        <li>
          Humidity <span class="weatherDetails_line"></span>
          <span>{{ props.weatherItem.humidity }}</span>
        </li>
        <li>
          Wind <span class="weatherDetails_line"></span
          ><span>{{ props.weatherItem.windSpeed }} {{ props.weatherItem.windDirection }}</span>
        </li>
        <li v-if="!props.weatherItem.isDaytime && dailyWeatherOpen">
          Dew Point <span class="weatherDetails_line"></span>
          <span>{{ props.weatherItem.dewpoint }}</span>
        </li>
        <li v-if="props.weatherItem.isDaytime && dailyWeatherOpen">
          Sunrise <span class="weatherDetails_line"></span>
          <span>{{ convertUtcToLocal(props.weatherItem.astro.sunrise) }}</span>
        </li>
        <li v-if="props.weatherItem.isDaytime && dailyWeatherOpen">
          Sunset <span class="weatherDetails_line"></span>
          <span>{{ convertUtcToLocal(props.weatherItem.astro.sunset) }}</span>
        </li>
      </ul>
    </div>
    <div class="weatherDesc" v-if="dailyWeatherOpen">
      <p>{{ props.weatherItem.detailDesc }}</p>
    </div>
  </details>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps(['weatherItem', 'firstOpen', 'dailyWeatherOpen']);
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