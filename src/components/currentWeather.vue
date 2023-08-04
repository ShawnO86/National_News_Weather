<template>
  <div class="weatherBox_head" :style="{ backgroundImage: 'url(' + bgImage + ')' }">
    <div class="weather_head_data">
      <div class="weather_head_left">
        <p>{{ props.currentWeather.current.shortDesc }}</p>
        <h2>{{ props.currentWeather.current.temp }}</h2>
      </div>
      <div class="weather_head_right">
        <p>
          <span class="weather_detail">Rain Chance:</span>
          {{ props.currentWeather.current.precip }}
        </p>
        <p>
          <span class="weather_detail">Humidity:</span>
          {{ props.currentWeather.current.humidity }}
        </p>
        <p>
          <span class="weather_detail">Wind:</span> {{ props.currentWeather.current.windSpeed }}
          {{ props.currentWeather.windDirection }}
        </p>
        <div v-if="props.currentWeather.currentAir.length != 0" class="airContainer">
          <div
            v-for="(item, index) in props.currentWeather.currentAir"
            :key="index"
            class="airValue_container"
          >
            <p>
              <span class="weather_detail">{{ item.type }}:</span>
              <span :style="{ background: aqiColorMap[item.categoryDesc].color }" class="aqiDesc">
                {{ item.value }} - {{ item.categoryDesc }}
                <span class="aqiToolTip">{{ aqiColorMap[item.categoryDesc].txt }}</span>
              </span>
            </p>
          </div>
        </div>
        <div v-else-if="props.currentWeather.futureAir.length != 0" class="airContainer">
          <div
            v-for="(item, index) in props.currentWeather.futureAir"
            :key="index"
            class="airValue_container"
          >
            <p v-if="index == 0 || index == 1">
              <span class="weather_detail">{{ item.type }} -- </span>
              <span :style="{ background: aqiColorMap[item.categoryDesc].color }" class="aqiDesc">
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
import { computed, onMounted, onBeforeUnmount, ref } from 'vue';
import alertDisplay from './alertDisplay.vue';

const props = defineProps(['currentWeather']);
let weatherType = computed(() => props.currentWeather.current.shortDesc);
const bgImage = computed(changeBackgroundImage);
const windowWidth = ref(window.innerWidth);

//optimize images after crop to .webp and maybe lower res
const weatherTypes = [
  { type: ['Fair', 'Clear', 'Sunny'], image: 'clear' }, //done
  { type: ['Clouds', 'Cloudy'], image: 'cloudy' },
  { type: ['Overcast'], image: 'overcast' },
  { type: ['Snow', 'Blizzard'], image: 'snow' },
  { type: ['Freezing Rain', 'Ice'], image: 'ice' },
  { type: ['Rain', 'Showers'], image: 'rain' },
  { type: ['Thunderstorm'], image: 'thunderstorm' },
  { type: ['Tornado', 'Funnel Cloud'], image: 'tornado_funnel_cloud' },
  { type: ['Hurricane', 'Tropical Storm'], image: 'hurricane_tropical_storm' },
  { type: ['Windy', 'Breezy'], image: 'windy_breezy' },
  { type: ['Dust', 'Sand'], image: 'dust_sand' },
  { type: ['Smoke', 'Haze'], image: 'smoke_haze' },
  { type: ['Hot'], image: 'hot' },
  { type: ['Cold'], image: 'cold' },
  { type: ['Fog', 'Fog/Mist'], image: 'fog' }
];
//monitor widow size and switch header image for that size
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

function handleResize() {
  windowWidth.value = window.innerWidth;
}
//checks the weatherType returns the specified image to use for background of header image
function changeBackgroundImage() {
  const matchingWeatherType = weatherTypes.find((item) =>
    item.type.some((type) => weatherType.value.includes(type))
  );
  if (windowWidth.value <= 425) {
    return `src/assets/${matchingWeatherType.image}_mobile.jpg`;
  } else if (windowWidth.value <= 768) {
    return `src/assets/${matchingWeatherType.image}_tablet.jpg`;
  } else {
    return `src/assets/${matchingWeatherType.image}.jpg`;
  }
}
const aqiColorMap = computed(() => ({
  Good: {
    color: 'rgba(0, 228, 0, 0.5)',
    txt: 'Air quality is satisfactory, and air pollution poses little or no risk.'
  },
  Moderate: {
    color: 'rgba(255, 255, 0, 0.5)',
    txt: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.'
  },
  'Unhealthy for Sensitive Groups': {
    color: 'rgba(255, 126, 0, 0.5)',
    txt: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.'
  },
  Unhealthy: {
    color: 'rgba(255, 0, 0, 0.5)',
    txt: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.'
  },
  'Very Unhealthy': {
    color: 'rgba(143, 63, 151, 0.5)',
    txt: 'Health alert: The risk of health effects is increased for everyone.'
  },
  Hazardous: {
    color: 'rgba(126, 0, 35, 0.5)',
    txt: 'Health warning of emergency conditions: everyone is more likely to be affected.'
  }
}));
</script>

<style scoped>
.weatherBox_head {
  display: flex;
  align-items: center;
  background-position: center center;
  background-blend-mode: overlay;
  background-repeat: no-repeat;
  background: rgba(var(--greyblue-rgb), 0.25);
  padding: clamp(2rem, 5vw, 5rem) 0;
  margin: 0 clamp(1rem, 4vw, 4rem);
  border-radius: 0.5rem;
  height: clamp(20rem, 40vh, 26.25rem);
}
.weather_head_data {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  background: rgba(var(--greyblue-rgb), 0.5);
  color: var(--text-hex);
  margin: 0rem clamp(1rem, 4vw, 4rem);
  padding: 2rem clamp(0.5rem, 2vw, 1.5rem);
  font-weight: 500;
  border-radius: 0.25rem;
  line-height: 2;
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
  background: rgba(var(--bg-rgb), 0.5);
  padding: clamp(0.5rem, 2vw, 1.5rem);
  border-radius: 0.25rem;
  gap: 0.25rem;
}
.weather_head_right p {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(var(--text-rgb), 0.25);
  gap: 1rem;
}
.airContainer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.25rem;
}
.airValue_container {
  display: flex;
  justify-content: space-between;
  flex: 1;
}
.airValue_container p {
  white-space: nowrap;
}
.weather_detail {
  font-weight: 400;
}
.aqiDesc {
  position: relative;
  border-bottom: 1px dashed var(--text-hex);
  cursor: pointer;
  padding: 0 0.25rem;
  border-radius: 0.25rem 0.25rem 0 0;
}
.aqiToolTip {
  white-space: wrap;
  visibility: hidden;
  width: 13rem;
  position: absolute;
  background: rgb(var(--bg-rgb));
  z-index: 1;
  left: -6rem;
  bottom: 1rem;
  color: var(--text-hex);
  font-weight: 400;
  line-height: 1.5;
  padding: 0.75rem;
  opacity: 0;
  transition: opacity 0.2s;
  border-radius: 0.25rem;
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
    margin: 0.5rem 0.75rem;
    padding: 0.5rem 0 0 0;
    line-height: 2;
    flex-direction: column;
    box-shadow: none;
  }
  .weather_head_left {
    font-size: large;
    text-align: center;
  }
  .weather_head_right {
    text-align: center;
    align-items: center;
    border-radius: 0 0 0.25rem 0.25rem;

  }
  .airContainer {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.25rem 0.5rem;
  }

  .aqiToolTip {
    left: -6rem;
  }
}
</style>