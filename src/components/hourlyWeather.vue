<template>
    <div id="weatherBox">
      <weather-box-head></weather-box-head>
      <div class="weatherBox_details">
        <h4>weather details for hourly forcasts</h4>
        <p>shortDesc</p>
        <p>icon?</p>
      </div>
    </div>
    <p>hourly weather time selection</p>
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
  .weatherBox_details {
    padding: 1rem 1rem 2rem 1rem;
    border-top: 1px dashed var(--secondary-hex);
  }
  </style>