<template>
  <div id="weatherBox">
    <weather-box-head></weather-box-head>
  </div>
</template>

<script setup>
import weatherBoxHead from './weatherBoxHead.vue';

</script>

<style scoped>

#weatherBox {
  background: rgba(var(--bg-rgb), 0.6);
  width: 100%;
  min-height: 15rem;
  border-radius: 1rem;
}
</style>