<template>
  <div id="weatherBox">
    <weather-box-head :selectedHour="selectedHour"></weather-box-head>
    <div class="weatherBox_details">
      <div class="hourSelection">
        <h3>48 Hour Forecast</h3>
        <sub>Slide to select hour.</sub>
        <input type="range" id="time" name="time" min="0" max="47" v-model="hourIndex" />
      </div>
      <div>48hour temp graph</div>
    </div>
  </div>
</template>
  
  <script setup>
import weatherBoxHead from './weatherBoxHead.vue';
import { reactive, ref, computed } from 'vue';
const props = defineProps(['hourlyWeather']);

let hourIndex = ref(0);
let selectedHour = reactive({
  location: computed(() => props.hourlyWeather.location),
  weather: computed(() => props.hourlyWeather.hourly[hourIndex.value])
});
</script>
  
  <style scoped>
#weatherBox {
  width: 100%;
  min-height: 15rem;
}
.weatherBox_details {
  padding: 2rem calc(clamp(0rem, 1vw, 1rem) + 0.5rem);
  background: rgba(var(--bg-rgb), 0.75);
}
.hourSelection h4 {
  margin-bottom: 1rem;
}
input {
  width: 100%;
}
input[type=range] {
  margin: 1rem 0;
  width: 100%;
}
</style>