<template>
  <details>
    <summary>
      <div class="summaryHeader" @click="console.log(props.weatherItem)">
        <h4>{{ props.weatherItem[0].name }} - {{ props.weatherItem[0].temp }}</h4>
        <p>{{ props.weatherItem[0].shortDesc }}</p>
      </div>
    </summary>
    <div class="weatherDetails">{{ props.weatherItem }}</div>
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
details summary:hover,
details summary:focus {
  background: var(--greyblue-hex);
}
.weatherDetails {
  padding: 0.5rem 1.5rem;
}
</style>