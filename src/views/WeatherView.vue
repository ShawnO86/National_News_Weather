<template>
  <div class="head_search">
    <h2>Weather</h2>
    <location-input @location="setLocation" />
  </div>
</template>
  
  <script setup>
import locationInput from '../components/locationInput.vue'

function setLocation() {

}
</script>

<style scoped>

</style>