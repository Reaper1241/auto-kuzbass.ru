<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()
</script>

<template>
    <div class="page__text-content" v-htmlSanitizer="appStore.creditText"></div>
</template>


<style lang="scss" scoped></style>