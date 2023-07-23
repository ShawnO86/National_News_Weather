<template>
  <details>
    <summary>
      <div class="leftSide"><h5>{{ props.weatherItem.name }}</h5></div>
      <div class="rightSide"><h6>{{ props.weatherItem.shortDesc }}</h6></div>
    </summary>
  </details>
</template>

<script setup>
const props = defineProps(['weatherItem']);
</script>