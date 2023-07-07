<template>
  <div class="search">
    <location-input @location="setLocation" />
  </div>
  <h3>Forecasted Weather</h3>
  <div class="nav">
    <button @click="toggleDailyOpen" :class="dailyOpen ? 'active' : '' " class="toggle">
      Daily
    </button>
    <button @click="toggleHourlyOpen" :class="hourlyOpen ? 'active' : '' " class="toggle">
      Hourly
    </button>
  </div>
  <div><p>side bar</p></div>
</template>

<script setup>
import locationInput from './locationInput.vue';
import { ref } from 'vue';

let inputLocation = ref('');
let dailyOpen = ref(true);
let hourlyOpen = ref(false)

const emit = defineEmits(['inputLocation', 'dailyOpen', 'hourlyOpen']);

function setLocation(location) {
  inputLocation.value = location;
  emit('inputLocation', inputLocation.value);
}
function toggleDailyOpen() {
  dailyOpen.value = true;
  hourlyOpen.value = false;
}
function toggleHourlyOpen() {
  dailyOpen.value = false;
  hourlyOpen.value = true;
}
</script>

<style scoped>
.search {
  margin-bottom: 2rem;
}
.nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: fit-content;
  margin-bottom: 2rem;
}
.nav button {
  width: 50%;
  text-align: center;
  padding: 0.5rem 0;
  cursor: pointer;
  border: 1px solid rgb(var(--bg-rgb));
}
.toggle {
  background-color: rgb(var(--bg-rgb));
  color: #fff;
}
.active {
  background-color: rgb(var(--secondary-rgb));
  color: #000;
}
</style>