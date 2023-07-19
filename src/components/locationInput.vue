<template>
  <form @submit.prevent="sendInput">
    <sub v-if="!locationError">{{ locationError }}</sub>
    <sub v-else-if="locationError">{{ locationError }}</sub>
    <input
      type="text"
      name="locationInput"
      id="locationInput"
      v-model="locationInput"
      placeholder='"City, State" or Zipcode'
    />
    <button>Get Weather</button>
  </form>
</template>

  <script setup>
import { ref } from 'vue';
const emit = defineEmits(['location']);
const locationInput = ref('');
const locationError = ref('');

function sendInput() {
  if (!locationInput.value) {
    locationError.value = 'Must input (City, State) or Zipcode!';
    setTimeout(() => {
      locationError.value = '';
    }, 4000);
  } else {
    locationError.value = '';
    emit('location', [locationInput.value, 'no', 'no']);
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  width: 100%;
  padding: 0 0 1rem 0;
}
sub {
  margin: -2rem 0 -1rem 0;
  flex: 100%;
}
input,
button {
  border-radius: 0.25rem;
  padding: 0.6rem 0.25rem;
  background: var(--bg-hex);
  color: #fff;
  border: none;
}
input {
  flex: 4;
  border: 1px solid var(--secondary-hex);
  background: rgba(var(--bg-rgb), 0.25);
  min-width: 12rem;
}
button {
  flex: 1;
  cursor: pointer;
  min-width: 6rem;
  border: 1px solid var(--secondary-hex);
  background: rgba(var(--bg-rgb), 0.25);
}
button:hover {
  border: 1px solid #fff;
}
input::placeholder {
  padding-left: 0.6rem;
  color: rgba(255, 255, 255, 0.75);
}
</style>