<template>
  <header>
    <div>
      <h1>News & Weather</h1>
    </div>
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
//import { ref, reactive } from 'vue';

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
  background: linear-gradient(180deg, #73C0FF 20%, #59B4FF 100%);
  color: #fff;
}
#app {
  margin: auto;
  max-width: 90rem;
  min-height: 100vh;
  padding: 0 1rem;
}
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}
nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  height: fit-content;
}
nav a {
  text-decoration: none;
}
.router-link-active {
  border-bottom: 2px solid #59b4ff;
  margin: 0 0 0.5rem 0;
}
</style>