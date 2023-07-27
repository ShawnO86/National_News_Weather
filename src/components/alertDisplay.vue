<template>
  <div class="alertDisplay">
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
</template>

<script setup>
const props = defineProps(['alerts']);
</script>

<style scoped>
.alertDetails {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 3rem clamp(0.5rem, 2vw, 1.5rem);
  border-radius: 0.25rem;
}
</style>