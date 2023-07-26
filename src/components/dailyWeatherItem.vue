<template>
  <details>
    <summary>
      <div class="summaryHeader">
        <h4>{{ props.weatherItem.name }} - {{ props.weatherItem.temp }}</h4>
        <p class="description">{{ props.weatherItem.shortDesc }}</p>
      </div>
    </summary>
    <div class="weatherDetails">
      <img :src="props.weatherItem.icon" class="weatherIcon" />
      <ul>
        <li>Temp: {{ props.weatherItem.temp }}</li>
        <li>Rain: {{ props.weatherItem.precip }}</li>
        <li>Humidity: {{ props.weatherItem.humidity }}</li>
        <li>Wind: {{ props.weatherItem.windSpeed }} {{ props.weatherItem.windDirection }}</li>
      </ul>
    </div>
    <div class="weatherDesc">
      <p v-if="!props.weatherItem.isDaytime">Dew Point: {{ props.weatherItem.dewpoint }}</p>
      <p v-else>
        <span>Sunrise: {{ convertUtcToLocal(props.weatherItem.astro.sunrise) }}</span> /
        <span>Sunset: {{ convertUtcToLocal(props.weatherItem.astro.sunset) }}</span>
      </p>
      <p>{{ props.weatherItem.detailDesc }}</p>
    </div>
  </details>
</template>

<script setup>
const props = defineProps(['weatherItem']);

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
<style scoped>
.summaryHeader {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
h4 {
  flex: 100%;
}
.weatherDetails {
  display: flex;
  align-items: top;
  gap: 1.5rem;
  margin: 1rem clamp(0.5rem, 2vw, 1.5rem);
}
.weatherDesc {
  margin: 1rem clamp(0.5rem, 2vw, 1.5rem);
}
.weatherDesc p {
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.5rem;
  margin-bottom: 1rem;
}
ul {
  list-style: none;
}
</style>