<template>
  <font-awesome-icon :icon="icon" v-if="props.desc" class="icon" />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['desc', 'time']);
let weatherType = computed(() => props.desc);
let icon = computed(() => changeIcon());

const iconTypes = [
  { type: ['Fair', 'Clear', 'Sunny'], image: props.time ? ['fas', 'sun'] : ['fas', 'moon'] },
  { type: ['Partly Cloudy'], image: props.time ? ['fas', 'cloud-sun'] : ['fas', 'cloud-moon'] },
  { type: ['Clouds', 'Cloudy', 'Overcast'], image: ['fas', 'cloud'] },
  { type: ['Snow', 'Blizzard'], image: ['fas', 'snowflake'] },
  { type: ['Freezing Rain', 'Ice'], image: ['fas', 'icicles'] },
  { type: ['Rain', 'Showers'], image: props.time ? ['fas', 'cloud-sun-rain'] : ['fas', 'cloud-moon-rain']},
  { type: ['Thunderstorm'], image: ['fas', 'cloud-bolt'] },
  { type: ['Tornado', 'Funnel Cloud'], image: ['fas', 'tornado'] },
  { type: ['Hurricane', 'Tropical Storm'], image: ['fas', 'hurricane'] },
  { type: ['Windy', 'Breezy'], image: ['fas', 'wind'] },
  { type: ['Smoke', 'Haze', 'Fog', 'Fog/Mist', 'Dust', 'Sand'], image: ['fas', 'smog'] },
  { type: ['Hot'], image: ['fas', 'temperature-arrow-up'] },
  { type: ['Cold'], image: ['fas', 'temperature-arrow-down'] }
];
function changeIcon() {
  const matchingWeatherType = iconTypes.find((item) =>
    item.type.some((type) => weatherType.value.includes(type))
  );
  return matchingWeatherType.image;
}
</script>