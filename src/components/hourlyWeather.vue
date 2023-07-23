<template>
  <div id="weatherBox">
    <weather-box-head :selectedHour="selectedHour"></weather-box-head>
    <div class="weatherBox_details">
      <div class="hourSelection">
        <label for="time"><h4>48 hour forecast<sub>(Drag to select a time.)</sub></h4></label>
        <input type="range" id="time" name="time" min="0" max="47" v-model="hourIndex" />
        <div class="hourSpan">
          <sub>{{ firstHour }} > </sub>
          <p class="hourSpan_separator"></p>
          <sub> &lt; {{ lastHour }}</sub>
        </div>
      </div>
      <div>48hour temp, humidity, and precipitation graphs</div>
    </div>
  </div>
</template>
  
  <script setup>
import weatherBoxHead from './weatherBoxHead.vue';
import { reactive, ref, computed } from 'vue';
const props = defineProps(['hourlyWeather']);
const firstHour = computed(() => props.hourlyWeather.hourly[0].time);
const lastHour = computed(() => props.hourlyWeather.hourly[47].time);

let hourIndex = ref(1);
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
}
.hourSelection {
  margin-bottom: 2rem;
  background: var(--greyblue-hex);
  padding: 0.5rem clamp(0rem, 1vw, 1rem);
  border: 1px solid var(--secondary-hex);
  border-radius: 0.5rem;
}
.hourSelection h4 {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
input {
  width: 100%;
}
input[type='range'] {
  width: 100%;
}
.hourSpan {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: -0.25rem;
}
.hourSpan_separator {
  flex: 1;
  border-bottom: 1px dashed white;
  height: 0.25rem;
  margin: 0 clamp(0rem, 1vw, 1rem);
}
</style>