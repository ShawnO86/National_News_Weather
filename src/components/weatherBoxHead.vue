<template>
  <header>
    <div>
      <p>Hourly Forecast for:</p>
      <h1>{{ weather.location }}</h1>
    </div>
    <p>{{ weather.weather.time }}</p>
  </header>
  <div class="weatherBox_head" :style="{ backgroundImage: 'url(' + bgImage + ')' }">
    <div class="weather_head_data">
      <p>{{ props.selectedHour.weather.shortDesc }} - {{ props.selectedHour.weather.temp }}</p>
      <p>Precip: {{ props.selectedHour.weather.precip }}</p>
      <p>Humidity: {{ props.selectedHour.weather.humidity }}</p>
      <p>
        Wind: {{ props.selectedHour.weather.windSpeed }}
        {{ props.selectedHour.weather.windDirection }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps(['selectedHour']);
let weather = ref(props.selectedHour);
let weatherType = computed(() => weather.value.weather.shortDesc);
const bgImage = computed(changeBackgroundImage);

//optimize images after crop to .webp and maybe lower res
const weatherTypes = [
  { type: ['Fair', 'Clear', 'Sunny'], image: 'clear.jpg' }, //pic done
  { type: ['Clouds', 'Cloudy'], image: 'cloudy.jpg' }, //pic done
  { type: ['Overcast'], image: 'overcast.jpg' }, //pic done
  { type: ['Snow', 'Blizzard'], image: 'snow.jpg' },
  { type: ['Freezing Rain', 'Ice'], image: 'freezing_rain_ice.jpg' },
  { type: ['Rain', 'Showers'], image: 'rain_showers.jpg' },
  { type: ['Thunderstorm'], image: 'thunderstorm.jpg' },
  { type: ['Tornado', 'Funnel Cloud'], image: 'tornado_funnel_cloud.jpg' },
  { type: ['Hurricane', 'Tropical Storm'], image: 'hurricane_tropical_storm.jpg' },
  { type: ['Windy', 'Breezy'], image: 'windy_breezy.jpg' },
  { type: ['Dust', 'Sand'], image: 'dust_sand.jpg' },
  { type: ['Smoke', 'Haze'], image: 'smoke_haze.jpg' }, //pic done
  { type: ['Hot'], image: 'hot.jpg' },
  { type: ['Cold'], image: 'cold.jpg' },
  { type: ['Fog', 'Fog/Mist'], image: 'fog.jpg' }
];
//checks if the weatherType is in the weatherTypes array and returns the specified image to use for the background of the weatherBox container
function changeBackgroundImage() {
  const matchingWeatherType = weatherTypes.find((item) =>
    item.type.some((type) => weatherType.value.includes(type))
  );
  return `/src/assets/${matchingWeatherType.image}`;
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 calc(clamp(0rem, 1vw, 1rem) + 0.5rem);
}
.weatherBox_head {
  padding: 2rem 0.5rem;
  background-size: cover;
  background-blend-mode: overlay;
  background: rgba(var(--bg-rgb), 0.25);
}
.weather_head_data {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
  background: rgba(var(--bg-rgb), 0.25);
  padding: 0.5rem clamp(0rem, 1vw, 1rem);
  border-radius: 0.5rem;
}
@media screen and (max-width: 425px) {
  header {
    flex-wrap: wrap;
    padding: 0 0.5rem;
  }
  .weatherBox_head {
    padding: 1rem 0.5rem;
    flex-direction: column;
  }
  .weather_head_data {
    align-items: flex-start;
    background: none;
    padding: 0;
  }
}
</style>