<template>
    <details>
        <summary>
            <div class="leftSide">{{ props.weatherItem.name }}</div>
            <div class="rightSide"><img :src=props.weatherItem.icon></div>
        </summary>

    </details>
</template>

<script setup>
const props = defineProps(['weatherItem'])
</script>