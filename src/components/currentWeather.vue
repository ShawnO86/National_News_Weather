<template>
  <div class="weatherBox_head" :style="{ backgroundImage: 'url(' + bgImage + ')' }">
    <div class="weather_head_data">
      <div class="weather_head_left">
        <p>{{ props.currentWeather.current.shortDesc }}</p>
        <h2>{{ props.currentWeather.current.temp }}</h2>
      </div>
      <div class="weather_head_right">
        <p>
          <span class="weather_detail">Rain Chance -- </span>
          {{ props.currentWeather.current.precip }}
        </p>
        <p>
          <span class="weather_detail">Humidity --</span>
          {{ props.currentWeather.current.humidity }}
        </p>
        <p>
          <span class="weather_detail">Wind --</span> {{ props.currentWeather.current.windSpeed }}
          {{ props.currentWeather.windDirection }}
        </p>
        <div v-if="props.currentWeather.currentAir.length != 0">
          <div v-for="(item, index) in props.currentWeather.currentAir" :key="index">
            <p>
              <span class="weather_detail">{{ item.type }} -- {{ item.value }} -- </span>
              <span :style="{ color: aqiColorMap[item.categoryDesc].color }" class="aqiDesc">
                {{ item.categoryDesc }}
                <span class="aqiToolTip">{{ aqiColorMap[item.categoryDesc].txt }}</span> </span
              >hello currentair
            </p>
          </div>
        </div>
        <div v-else-if="props.currentWeather.futureAir.length != 0">
          <div v-for="(item, index) in props.currentWeather.futureAir" :key="index">
            <p v-if="index == 0 || index == 1">
              <span class="weather_detail">{{ item.type }} -- </span>
              <span :style="{ color: aqiColorMap[item.categoryDesc].color }" class="aqiDesc">
                {{ item.categoryDesc }}
                <span class="aqiToolTip">{{ aqiColorMap[item.categoryDesc].txt }}</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <alert-display
    v-if="props.currentWeather.alerts"
    :alerts="props.currentWeather.alerts"
  ></alert-display>
</template>

<script setup>
import { computed } from 'vue';
import alertDisplay from './alertDisplay.vue';

const props = defineProps(['currentWeather']);
let weatherType = computed(() => props.currentWeather.current.shortDesc);
const bgImage = computed(changeBackgroundImage);

//optimize images after crop to .webp and maybe lower res
const weatherTypes = [
  { type: ['Fair', 'Clear', 'Sunny'], image: 'clear.jpg' }, //pic done
  { type: ['Clouds', 'Cloudy'], image: 'cloudy.jpg' }, //pic done
  { type: ['Overcast'], image: 'overcast.jpg' }, //pic done
  { type: ['Snow', 'Blizzard'], image: 'snow.jpg' }, //pic done
  { type: ['Freezing Rain', 'Ice'], image: 'ice.jpg' }, //pic done
  { type: ['Rain', 'Showers'], image: 'rain.jpg' }, //done
  { type: ['Thunderstorm'], image: 'thunderstorm.jpg' }, //done
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
  return `src/assets/${matchingWeatherType.image}`;
}
const aqiColorMap = computed(() => ({
  Good: {
    color: '#22ff22',
    txt: 'Air quality is satisfactory, and air pollution poses little or no risk.'
  },
  Moderate: {
    color: '#ffff50',
    txt: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.'
  },
  'Unhealthy for Sensitive Groups': {
    color: 'orange',
    txt: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.'
  },
  Unhealthy: {
    color: 'red',
    txt: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.'
  },
  'Very Unhealthy': {
    color: 'purple',
    txt: 'Health alert: The risk of health effects is increased for everyone.'
  },
  Hazardous: {
    color: 'maroon',
    txt: 'Health warning of emergency conditions: everyone is more likely to be affected.'
  }
}));
</script>

<style scoped>
.weatherBox_head {
  display: flex;
  align-items: center;
  background-blend-mode: overlay;
  background: rgba(var(--bg-rgb), 0.5);
  padding: clamp(2rem, 5vw, 5rem) 0;
  margin: 0 clamp(1rem, 4vw, 4rem);
  border-radius: 0.5rem;
  height: 40vh;
  max-height: 30rem;
  min-height: 20rem;
}
.weather_head_data {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  background: rgba(var(--greyblue-rgb), 0.65);
  color: var(--text-hex);
  margin: 0rem clamp(1rem, 4vw, 4rem);
  padding: 2rem clamp(0.5rem, 2vw, 1.5rem);
  font-weight: 500;
  border-radius: 0.25rem;
  line-height: 2.5;
  gap: 2rem;
  box-shadow: 3px 3px 6px -3px var(--secondary-hex), -3px -3px 6px -3px var(--secondary-hex);
}
.weather_head_left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  font-size: x-large;
  flex: 1;
}
.weather_head_right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: rgba(var(--bg-rgb), 0.65);
  padding: clamp(0.5rem, 2vw, 1.5rem);
  border-radius: 0.25rem;
}
.weather_detail {
  font-weight: 400;
}
.aqiDesc {
  position: relative;
  border-bottom: 1px dotted var(--text-hex);
  cursor: pointer;
}
.aqiToolTip {
  visibility: hidden;
  width: 12rem;
  position: absolute;
  background: rgb(var(--bg-rgb));
  z-index: 1;
  left: -6rem;
  bottom: 1rem;
  color: var(--text-hex);
  font-weight: 400;
  line-height: 1.5;
  padding: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}
.aqiDesc:hover .aqiToolTip {
  visibility: visible;
  opacity: 1;
}
@media screen and (max-width: 425px) {
  .weatherBox_head {
    margin: 0;
    border-radius: 0;
  }
  .weather_head_data {
    margin: 0rem 0.5rem;
    padding: 0.5rem 0;
    line-height: 2;
    flex-direction: column;
  }
  .weather_head_left {
    font-size: large;
    text-align: center;
  }
  .weather_head_right {
    text-align: center;
    align-items: center;
  }
  .aqiToolTip {
    left: -6rem;
  }
}
</style>