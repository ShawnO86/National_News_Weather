<template>
  <div id="weatherBox">
    <weather-box-head :selectedHour="selectedHour"></weather-box-head>
    <div class="weatherBox_details">
      <h4>Slide to select forecast hour. (48 hours)</h4>
      <div class="hourSelection">
        <input type="range" id="time" name="time" min="0" max="47" v-model="hourIndex" />
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import weatherBoxHead from './weatherBoxHead.vue';
import { reactive, ref, computed } from 'vue';
const props = defineProps(['hourlyWeather']);
let hourIndex = ref(0);
let selectedHour = reactive({
  location: props.hourlyWeather.location,
  weather: computed(() => props.hourlyWeather.hourly[hourIndex.value])
});
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
.hourSelection {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.5rem;
}
.hourBtn {
  width: fit-content;
  background: none;
  border: 1px solid var(--secondary-hex);
  color: var(--secondary-hex);
  cursor: pointer;
  padding: 0.5rem;
}
input {
  width: 100%;
}
</style>