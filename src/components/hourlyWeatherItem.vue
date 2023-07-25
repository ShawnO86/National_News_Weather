<template>
  <details>
    <summary>
      <div class="summaryHeader">
        <h5>{{ props.weatherItem.time }} - {{ props.weatherItem.temp }}</h5>
        <p class="description">{{ props.weatherItem.shortDesc }}</p>
      </div>
    </summary>
    <div class="weatherDetails">
      <h6></h6>
      <p>Temp:</p>
      <p>Rain:</p>
      <p>Humidity:</p>
      <p>Wind:</p>
    </div>
  </details>
</template>

<script setup>
const props = defineProps(['weatherItem']);
</script>