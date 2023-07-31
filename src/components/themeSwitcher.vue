<template>
  <div>
    <p>
      <span @click="changeTheme" class="themeIcon">
        {{ themeName }} theme -- 
        <font-awesome-icon :icon="lightTheme ? ['fas', 'sun'] : ['fas', 'moon']" />
      </span>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['colors']);
const lightTheme = ref(false);
const themeName = ref('Dark');

function changeTheme() {
  lightTheme.value = !lightTheme.value;
  if (!lightTheme.value) {
    themeName.value = 'Dark';
    emit('colors', {
      bgHex: '#273745',
      bgRGB: '39, 55, 69',
      secondaryHex: '#7cafde',
      secondaryRGB: '124, 175, 222',
      greyBlueHex: '#51585e',
      greyBlueRGB: '81, 88, 94',
      textHex: '#fff',
      textRGB: '255, 255, 255'
    });
  } else {
    themeName.value = 'Light';
    emit('colors', {
      bgHex: '#D6EEFF',
      bgRGB: '214, 238, 255',
      secondaryHex: '#99D5FF',
      secondaryRGB: '153, 213, 255',
      greyBlueHex: '#A1B3BF',
      greyBlueRGB: '161, 179, 191',
      textHex: '#000',
      textRGB: '0, 0, 0'
    });
  }
}
</script>

<style scoped>
.themeIcon {
  cursor: pointer;
  background: rgba(var(--secondary-rgb), 0.5);
  color: var(--text-hex);
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  transition: background 0.2s;
}
.themeIcon:hover {
  background: rgba(var(--greyblue-rgb), 0.5);
}
</style>