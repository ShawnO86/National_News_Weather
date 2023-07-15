<template>
  <div>
    <h1>Weather.Forecast</h1>
  </div>
  <div id="weatherBox">
    <div class="weatherBox_head" :style="{ backgroundImage: 'url(' + bgImage + ')' }">
      <h2>Rockford, IL</h2>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
const weatherType = ref('Cloudy');
const bgImage = computed(changeBackgroundImage);

//optimize images after crop to .webp and maybe lower res
const weatherTypes = [
  { type: ['Fair', 'Clear'], image: 'clear.jpg' }, //pic done
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
  { type: ['Smoke', 'Haze'], image: 'smoke_haze.jpg' },
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
h1 {
  padding: 1rem 0;
  margin-bottom: 2rem;
}
h2 {
  font-size: 2rem;
}
#weatherBox {
  background: rgba(var(--bg-rgb), 0.6);
  width: 100%;
  min-height: 45rem;
  border-radius: 1rem;
}
.weatherBox_head {
  min-height: 15rem;
  background-size: cover;
  background-blend-mode: overlay;
  background: rgba(var(--bg-rgb), 0.3);
  border-radius: 1rem 1rem 0 0;
}
</style>