<template>
  <details>
    <summary>
      <div class="summaryHeader">
        <h5>{{ props.weatherItem.time }} - {{ props.weatherItem.shortDesc  }}</h5>
        <p class="description">{{ props.weatherItem.temp }}</p>
      </div>

    </summary>
    <div class="weatherDetails">
      <img :src="props.weatherItem.icon" class="weatherIcon"/>
      <ul>
        <li>Temp:</li>
        <li>Rain:</li>
        <li>Humidity:</li>
        <li>Wind:</li>

      </ul>

    </div>

  </details>
</template>

<script setup>
const props = defineProps(['weatherItem']);
</script>

<style scoped>
.summaryHeader {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
h5 {
  flex: 100%;
}
.weatherDetails {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin: 1rem clamp(0.5rem, 2vw, 1.5rem);
}
ul {
  list-style: none;
}
</style>