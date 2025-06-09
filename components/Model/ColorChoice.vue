<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

const colors = ref(newStore.model.colored_galleries)
</script>

<template>
    <div class="model__image" v-if="colors">
        <ModelColorSlider :gallery="colors" />
    </div>
</template>

<style lang="scss" scoped>
.model__image {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
    }
}
</style>