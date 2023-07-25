<template>
  <details>
    <summary>
      <div class="summaryHeader">
        <h4>{{ props.weatherItem.time }}</h4>
        <h5>{{ props.weatherItem.temp }}</h5>
      </div>
    </summary>
    <div class="weatherDetails">
      <h6>{{ props.weatherItem.shortDesc }}</h6>
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
details {
  width: 100%;
  padding: 0 1.5rem;
}
details summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-hex);
  border: 1px solid var(--secondary-hex);
  width: 100%;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  border-radius: 0.5rem;
}
details summary::after {
  content: 'Right';
}
details[open] summary::after {
  content: 'Down';
}
.summaryHeader {
  width: 6rem;
}
</style>