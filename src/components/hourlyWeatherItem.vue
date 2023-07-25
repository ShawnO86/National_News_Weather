<template>
  <details>
    <summary>
      <div class="summaryHeader">
        <h4>{{ props.weatherItem.time }} - {{ props.weatherItem.temp }}</h4>
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
<style scoped>
details summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--secondary-hex);
  cursor: pointer;
}
details summary::after {
  content: 'Right';
}
details[open] summary::after {
  content: 'Down';
}
details summary:hover,
details summary:focus {
  background: var(--greyblue-hex);
}
</style>