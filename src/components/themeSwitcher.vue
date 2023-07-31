<template>
  <div>
    <p>Theme:
      <span @click="changeTheme" class="themeIcon">
        <font-awesome-icon :icon="lightTheme ? ['fas', 'sun'] : ['fas', 'moon']" />
      </span>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['colors']);
const lightTheme = ref(false);

function changeTheme() {
  lightTheme.value = !lightTheme.value;
  if(!lightTheme.value) {
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
  emit('colors', {
    bgHex: '#D5EEFF',
    bgRGB: '213, 238, 255',
    secondaryHex: '#8AD0FF',
    secondaryRGB: '138, 208, 255',
    greyBlueHex: '#546E80',
    greyBlueRGB: '84, 110, 128',
    textHex: '#000',
    textRGB: '0, 0, 0'
  });
}
  }

</script>

<style scoped>
p {
  cursor: pointer;
}
.themeIcon {
  border-radius: 20%;
  padding: 0.5rem;
  background: var(--greyblue-hex);
  color: #fff;
  transition: background 0.2s;
}
.themeIcon:hover {
  background: rgba(var(--secondary-rgb), 0.5);
}
</style>