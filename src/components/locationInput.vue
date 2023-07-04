<template>
  <form @submit.prevent="sendInput">
    <input
      type="text"
      name="locationInput"
      id="locationInput"
      v-model="locationInput"
      placeholder="(City, State) or Zipcode"
    />
    <button>Get Weather</button>
  </form>
  <p v-if="locationError">{{ locationError }}</p>
</template>

  <script setup>
import { ref } from 'vue'

const locationInput = ref('')
const locationError = ref('')

function sendInput() {
  if (!locationInput.value) {
    locationError.value = 'Must input (City, State) or Zipcode!'
    setTimeout(() => {
      locationError.value = ''
    }, 4000)
  } else {
    locationError.value = ''
    this.$emit('location', [locationInput.value, 'no', 'no'])
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-flow: wrap;
  padding: 1rem 0;
  gap: 0 1rem;
}

input,
button {
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  padding: 0.6rem 0.25rem;
}

input {
  flex: 3;
}

button {
  flex: 1;
  cursor: pointer;
}

input::placeholder {
  padding-left: 1rem;
}
</style>