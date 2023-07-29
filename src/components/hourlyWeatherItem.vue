<template>
  <details>
    <summary>
      <div class="summaryHeader">
        <h4>{{ props.weatherItem.time }} - {{ props.weatherItem.temp }}</h4>
        <p class="description">{{ props.weatherItem.shortDesc  }}</p>
      </div>

    </summary>
    <div class="weatherDetails">
      <img :src="props.weatherItem.icon" class="weatherIcon"/>
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
const props = defineProps(['weatherItem']);
</script>