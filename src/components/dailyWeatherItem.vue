<template>
  <details>
    <summary>
      <div class="summaryHeader">
        <h5>{{ props.weatherItem.name }} - {{ props.weatherItem.temp }}</h5>
        <h6>{{ props.weatherItem.precip }} Chance of rain</h6>
      </div>
    </summary>
    <div>{{ props.weatherItem }}</div>
  </details>
</template>

<script setup>
const props = defineProps(['weatherItem']);
</script>

<style scoped>
details {
  width: 100%;
}
details summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
  background: var(--bg-hex);
  border-top: 1px solid var(--secondary-hex);
  border-bottom: 1px solid var(--secondary-hex);
  width: 100%;
  padding: 0.5rem 0.5rem;
  cursor: pointer;
}
details summary::after {
  content: "Right";
}
details[open] summary::after {
    content: "Down";
}
details summary:hover,
details summary:focus {
  background: var(--greyblue-hex);
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
}

</style>