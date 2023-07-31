<template>
  <div class="themeSwitcher">
    <p>
      Theme:
      <span>
        <font-awesome-icon
          @click="changeTheme"
          :icon="lightTheme ? ['fas', 'sun'] : ['fas', 'moon']"
          class="themeIcon"
        />
      </span>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const lightTheme = ref(true);

function changeTheme() {
    lightTheme.value = !lightTheme.value;
}
</script>

<style scoped>
</style>