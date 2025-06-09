<script setup>
import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();
</script>

<template>
    <section class="models-catalog section" :ref="(el) => { appStore.modelsList = el }">
        <div class="container">
            <div class="models-catalog__header section__header">
                <BaseSectionTitle :title="`Каталог моделей ${cleanUpTitle($route.params.brand.toUpperCase())}:`" />
            </div>

            <div class="cars-template models-catalog__body">
                <CarSmallNM2 v-for="model in newStore.models" :key="model.id" :car="model" />
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.models-catalog {
    scroll-margin-top: 10vh;
}
</style>