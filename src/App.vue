<template>
  <header>
    <h1>National Weather & News</h1>

    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/weather">Weather</RouterLink>
      <RouterLink to="/news">News</RouterLink>
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
</script>

<style>
:root {

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
}
#app {
  margin: auto;
  max-width: 90rem;
  min-height: 100vh;
  padding: 1rem 2rem;
}
header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}
nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}
nav a {
  text-decoration: none;
}
.router-link-active {
  border-bottom: 2px solid black;
}

</style>