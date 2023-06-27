<template>
  <form @submit.prevent="sendInput">
    <label for="locationInput">Location Search</label>
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