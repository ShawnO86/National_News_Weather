<template>
  <div class="weatherBox_head" :style="{ backgroundImage: 'url(' + bgImage + ')' }">

    <div class="weather_head_data">
      <div class="weather_head_left">
        <p>Current Weather</p>
        <h2>{{ props.selectedHour.temp }}</h2>
        <p>{{ props.selectedHour.shortDesc }}</p>
      </div>
      <div class="weather_head_right">
        <p><span class="weather_detail">Rain Chance:</span> {{ props.selectedHour.precip }}</p>
        <p><span class="weather_detail">Humidity:</span> {{ props.selectedHour.humidity }}</p>
        <p>
          <span class="weather_detail">Wind:</span> {{ props.selectedHour.windSpeed }}
          {{ props.selectedHour.windDirection }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['selectedHour']);
let weatherType = computed(() => props.selectedHour.shortDesc);
const bgImage = computed(changeBackgroundImage);

//optimize images after crop to .webp and maybe lower res
const weatherTypes = [
  { type: ['Fair', 'Clear', 'Sunny'], image: 'clear.jpg' }, //pic done
  { type: ['Clouds', 'Cloudy'], image: 'cloudy.jpg' }, //pic done
  { type: ['Overcast'], image: 'overcast.jpg' }, //pic done
  { type: ['Snow', 'Blizzard'], image: 'snow.jpg' }, //pic done
  { type: ['Freezing Rain', 'Ice'], image: 'ice.jpg' }, //pic done
  { type: ['Rain', 'Showers'], image: 'rain.jpg' }, //done
  { type: ['Thunderstorm'], image: 'thunderstorm.jpg' },  //done
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
.weatherBox_head {
  padding: 3rem 0;
  background-size: cover;
  background-blend-mode: overlay;
  background: rgba(var(--bg-rgb), 0.5);  
}
.weather_head_data {
  display: flex;
  justify-content: space-between;
  background: rgba(var(--bg-rgb), 0.8);
  margin: 0.2rem clamp(1rem, 4vw, 4rem);
  padding: 1.5rem;
  font-weight: 500;
  border-radius: 0.25rem;
}
.weather_head_left,
.weather_head_right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.weather_detail {
  font-weight: 400;
}
.weather_head_left {
  flex: 1;
}
.weather_head_right {
  align-items: flex-end;
}
@media screen and (max-width: 425px) {
  .weatherBox_head {
    padding: 1rem 0rem;
  }
  .weather_head_data {
    margin: 0.5rem;
    padding: 1rem 0.5rem;
  }
}
</style>