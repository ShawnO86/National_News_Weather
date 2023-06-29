<template>
  <div class="head_search">
    <h2>Weather.Forecast</h2>
    <location-input @location="setLocation" />
  </div>
</template>
  
  <script setup>
import locationInput from '../components/locationInput.vue'
</script>

<style scoped>

</style>