<template>
  <header>
    <h1>News & Weather</h1>
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
import { RouterLink, RouterView } from 'vue-router';
import { ref, reactive } from 'vue';

/* for hourly forecast: have sun move with hours for daytime and then have moon come in for night with some type of slider to change the hour.*/
</script>

<style>
:root {
  --somecolors: ;
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
  /* background: linear-gradient(180deg, #59B4FF 20%, #73C0FF 100%); */
}
#app {
  margin: auto;
  max-width: 90rem;
  min-height: 100vh;
  height: 100vh;
}
nav {
  display: flex;
  gap: 2rem;
}
nav a {
  text-decoration: none;
}
.router-link-active {
  border-bottom: 2px solid #59b4ff;
  margin: 0 0 0.5rem 0;
}
</style>