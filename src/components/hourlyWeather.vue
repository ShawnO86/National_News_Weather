<template>
  <weather-box-head :selectedHour="selectedHour"></weather-box-head>
  <div class="weatherBox_details">
    <h3>Hourly Forecast</h3>
    <div class="hourSelection">
      <div v-for="(item, index) in props.hourlyWeather.hourly" :key="index" class="dayOutput">
        <h4>{{ item[0].date }}</h4>
        <div v-for="(day, dayIndex) in item" :key="dayIndex">
          <div class="hourOutput">
            <h5>{{ day.time }}</h5>
            <p>{{ day.temp }}</p>
            <p>{{ day.precip }}</p>
          </div>
        </div>
      </div>
    </div>
    <div>48hour temp, humidity, and precipitation graphs</div>
  </div>
</template>
  
  <script setup>
import weatherBoxHead from './weatherBoxHead.vue';
import { computed, reactive } from 'vue';
const props = defineProps(['hourlyWeather']);
const dates = Object.keys(props.hourlyWeather.hourly);
let selectedHour = reactive({
  location: computed(() => props.hourlyWeather.location),
  weather: computed(() => props.hourlyWeather.hourly[dates[0]][0])
});
</script>
  
  <style scoped>
.weatherBox_details {
  padding: 2rem calc(clamp(0rem, 1vw, 1rem) + 0.5rem);
}
.weatherBox_details h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.hourSelection {
  margin-bottom: 2rem;
  background: var(--greyblue-hex);
  padding: 0.5rem clamp(0rem, 1vw, 1rem);
  border: 1px solid var(--secondary-hex);
  border-radius: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.dayOutput {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
}
.dayOutput h4 {
  flex: 100%;
  border-bottom: 1px solid var(--secondary-hex);
  margin-bottom: 1rem;
}
.hourOutput {
  width: 8rem;
  border: 1px solid var(--secondary-hex);
  padding: 0 0.25rem;
  border-radius: 0.5rem;
  background: none;
  color: #fff;
}
.rightAlign {
  text-align: right;
}
button:hover,
button:focus {
  background: var(--bg-hex);
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
h3 span {
  font-size: smaller;
}
.hourSelection::-webkit-scrollbar {
  width: 0.5rem;
  height: 0.5rem;
}
.hourSelection::-webkit-scrollbar-track {
  background: var(--bg-hex);
  border: 1px solid var(--greyblue-hex);
  border-radius: 0.5rem;
  margin: 0 0.5rem;
}
.hourSelection::-webkit-scrollbar-thumb {
  background-color: var(--secondary-hex);
  border-radius: 0.5rem;
}
</style>