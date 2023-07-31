<template>
  <form @submit.prevent="sendInput">
    <label for="locationInput">Location Search:</label>
    <input
      type="text"
      name="locationInput"
      id="locationInput"
      v-model="locationInput"
      :placeholder="locationError ? locationError : '(City, State) or Zipcode'"
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
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  width: 100%;
  padding: 0 0 1rem 0;
}
sub {
  margin: -1rem 0 -1rem 0;
  flex: 100%;
  text-align: right;
}
label {
  flex: 100%;
}
input,
button {
  border-radius: 0.25rem;
  padding: 0.6rem 0.25rem;
  color: var(--text-hex);
}
input {
  flex: 4;
  border: 1px solid var(--secondary-hex);
  background: var(--greyblue-hex);
  min-width: 12rem;
}
button {
  flex: 1;
  cursor: pointer;
  min-width: 6rem;
  border: 1px solid var(--secondary-hex);
  background: var(--greyblue-hex);
  font-weight: 600;
  transition: background 0.2s, border 0.2s;
}
button:hover {
  border: 1px solid #fff;
  background: rgba(var(--secondary-rgb), 0.5);
}
input::placeholder {
  padding-left: 0.6rem;
  color: rgba(var(--text-rgb), 0.75);
}
.locationError {
  position: absolute;
  top: 1.5rem;
  right: 0;
}
</style>