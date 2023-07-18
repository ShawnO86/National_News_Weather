<template>
  <div id="weatherBox">
    <weather-box-head :selectedHour="selectedHour"></weather-box-head>
    <div class="weatherBox_details">
      <div class="hourSelection">
        <h3>Slide to select a forecast 0-48 hours from now.</h3>
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

//Must figure out why why weather not updating in weatherboxhead


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
}
.weatherBox_details {
  padding: 2rem calc(clamp(0rem, 1vw, 1rem) + 0.5rem);
}
.hourSelection h4 {
  margin-bottom: 1rem;
}
input {
  width: 100%;
}
</style>