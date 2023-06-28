<template>
  <header>
    <h1>National News & Weather</h1>
    <location-input @location="setLocation" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/weather">Weather</RouterLink>
      <RouterLink to="/news">News</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script setup>
//date conversion
/* const date = new Date('2023-06-27T14:00:00-05:00');

const currentDay = (date) => {
  const dayValue = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  return dayValue[date.getDay()];
};

const dayMonth = (date) => {
  const monthValue = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return monthValue[date.getMonth()] + " " + date.getDate();
}

console.log(
  currentDay(date), dayMonth(date)
); */

import { RouterLink, RouterView } from 'vue-router'
import locationInput from '../components/locationInput.vue'

function setLocation() {
  
}

</script>

<style>
:root {
  --bg-rgb: 5, 42, 59;
  --secondary-rgb: 0, 122, 179;
  --text-rgb: 207, 229, 238;
  --pop-rgb: 0, 174, 255;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Segoe UI', sans-serif;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.6;
  background: linear-gradient(180deg, rgb(var(--bg-rgb)) 20%, rgb(var(--secondary-rgb)) 115%);
  background-repeat: no-repeat;
  color: rgb(var(--text-rgb));
}
#app {
  margin: auto;
  max-width: 90rem;
  min-height: 100vh;
  color: rgb(var(--text-rgb));
  padding: 0.5rem clamp(1rem, 3vw, 4rem) 0 clamp(1rem, 3vw, 4rem);
}
header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-bottom: 1px solid rgb(var(--secondary-rgb));
  padding: 2rem 0;
  margin-bottom: 2rem;
}
nav {
  display: flex;
  align-items: center;
  gap: clamp(0.5rem, 2vw, 2rem);
}
nav a {
  text-decoration: none;
  color: rgb(var(--text-rgb));
}
nav a:hover,
nav a:focus {
  text-decoration: underline;
  color: rgb(var(--pop-rgb));
}
</style>