<template>
  <div class="alertDisplay">
    <h3>Alerts</h3>
    <p>{{ props.alerts }}</p>
  </div>
</template>

<script setup>
const props = defineProps(['alerts']);
</script>