<template>
  <details>
    <summary>
      <div class="summaryHeader">
        <h5>{{ props.weatherItem.name }} - {{ props.weatherItem.temp }}</h5>
        <p class="description">{{ props.weatherItem.shortDesc }}</p>
      </div>
    </summary>
    <div class="weatherDetails">{{ props.weatherItem }}</div>
  </details>
</template>

<script setup>
const props = defineProps(['weatherItem']);
</script>