<template>
  <header>
    <h1>National News & Weather</h1>
    <nav>
      <RouterLink to="/">News</RouterLink>
      <RouterLink to="/weather">Weather</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

ref()

/* for hourly forecast: have sun move with hours for daytime and then have moon come in for night with some type of slider to change the hour.*/
</script>

<style>
:root {
  --day-bg-rgb: 5, 42, 59;
  --day-secondary-rgb: 0, 122, 179;
  --day-text-rgb: 207, 229, 238;
  --day-pop-rgb: 0, 174, 255;
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
  background: linear-gradient(180deg, rgb(var(--day-bg-rgb)) 30%, rgb(var(--day-secondary-rgb)) 100%);
}
#app {
  margin: auto;
  max-width: 90rem;
  min-height: 100vh;
  padding: 1rem 2rem;
  color: rgb(var(--day-text-rgb));
  height: 100vh;
}
header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem 6rem;
}
nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}
nav a {
  text-decoration: none;
  color: rgb(var(--day-text-rgb));
}
.router-link-active {
  border-bottom: 2px solid rgb(var(--day-pop-rgb));
  margin: 0 0 0.5rem 0;
}
main {
  margin: 2rem 0;
  padding: 1rem;
  background: rgba(var(--day-secondary-rgb), 0.5);
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 1.75rem;
  }
}

</style>