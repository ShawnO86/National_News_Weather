<template>
  <div class="alertDisplay" v-if="props.alerts != 'No alerts'">
    <h3>{{ props.alerts.length }} Alert(s) Available!</h3>
    <details v-for="(alert, index) in props.alerts" :key="index">
      <summary>
        <p>{{ alert.alertHeadline }}</p>
      </summary>
      <div class="alertDetails">
        <p>{{ alert.alertAreas }}</p>
        <p>{{ alert.alertTextDesc }}</p>
      </div>
    </details>
  </div>
  <div class="alertDisplay"><h3>No alerts for this area</h3></div>
</template>

<script setup>
const props = defineProps(['alerts']);
</script>

<style scoped>
h3 {
  border-bottom: 1px solid var(--secondary-hex);
  margin: 1.5rem 0;
}
.alertDetails {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 1rem;
  padding: 0 clamp(0.5rem, 2vw, 1.5rem);
  border-radius: 0.25rem;
}
</style>