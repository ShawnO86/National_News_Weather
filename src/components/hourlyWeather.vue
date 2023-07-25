<template>
    <h3>Hourly Forecast</h3>
      <div v-for="(item, index) in props.hourlyWeather.hourly" :key="index" class="dayOutput">
        <h4>{{ item[0].date }}</h4>

        <div v-for="(day, dayIndex) in item" :key="dayIndex" class="hourOutput">
          <hourly-weather-item :weatherItem="day"></hourly-weather-item>
        </div>
      </div>
    <div>48hour temp, humidity, and precipitation graphs</div>

</template>
  
<script setup>
import hourlyWeatherItem from './hourlyWeatherItem.vue';
const props = defineProps(['hourlyWeather']);
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
  width: 100%;
}
.dayOutput h4 {
  flex: 100%;
  border-bottom: 1px solid var(--secondary-hex);
  margin-bottom: 1rem;
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