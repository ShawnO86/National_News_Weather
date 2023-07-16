<template>
  <form @submit.prevent="sendInput">
    <sub v-if="locationError">{{ locationError }}</sub>
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
  gap: 0 1rem;
  width: 100%;
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
}
button {
  flex: 1;
  cursor: pointer;
  min-width: 6rem;
  border: 1px solid var(--secondary-hex);
}
button:hover {
  border: 1px solid #fff;
}
input::placeholder {
  padding-left: 0.6rem;
  color: var(--secondary-hex);
}
</style>