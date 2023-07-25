<template>
  <details>
    <summary>
      <div class="summaryHeader">
        <h4>{{ props.weatherItem.name }} - {{ props.weatherItem.temp }}</h4>
        <p class="description">{{ props.weatherItem.shortDesc }}</p>
      </div>
    </summary>
    <div class="weatherDetails">{{ props.weatherItem }}</div>
  </details>
</template>

<script setup>
const props = defineProps(['weatherItem']);
</script>

<style>
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