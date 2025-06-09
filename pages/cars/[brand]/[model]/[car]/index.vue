<script setup>
definePageMeta({
    name: 'car',
})

import { useRoute } from 'vue-router';
import { apiNew } from '@/constants/';

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useNewCarStore } from '/stores/NewCarStore.js'
const carStore = useNewCarStore()

const $route = useRoute();
const brand = findBrand($route.params.brand, appStore.newBrands)
const loading = ref(true);

if (brand) {
    appStore.globalLoader = true
    const { data: car } = await fetchServerWrapper(`${apiNew}cars/car/${$route.params.car}`);

    const brand = findBrand($route.params.brand, appStore.newBrands)
    const { data: models } = await fetchServerWrapper(`${apiNew}models/${brand}`);
    newStore.models = models.value

        const model = findModel($route.params.model, newStore.models);
        if (!model) {
            throw createError({ statusCode: 404, statusMessage: 'Model not found!', fatal: true });
        }

    if (car.value) {
        const { data: images } = await fetchServerWrapper(`${apiNew}galleries/${car.value.car_model_id}`);
        carStore.galleries = images.value

        const { data: model } = await fetchServerWrapper(`${apiNew}models/model/${findModel($route.params.model, newStore.models)}`);
        newStore.model = model.value
    }

    carStore.car = car.value
    appStore.globalLoader = false
    loading.value = false

    if (!car.value) {
        throw createError({ statusCode: 404, statusMessage: 'Car not found!', fatal: true })
    } else {
        if (car.value.images?.length) {
            useHead({
                meta: [
                    { name: 'og:image', content: `${car.value?.images[0]?.url}` },
                ],
            })
        } else {
            useHead({
                meta: [
                    { name: 'og:image', content: `${car.value?.preview}` },
                ],
            })
        }
    }
} else {
    throw createError({ statusCode: 404, statusMessage: 'Brand not found!', fatal: true })
}

console.log(`${apiNew}cars/car/${$route.params.car}`)
</script>

<template>
    <div v-if="loading" class="container">
        <div class="skeleton-car">
            <div class="skeleton image"></div>
            <div class="skeleton"></div>
            <div class="skeleton small-text"></div>
            <div class="skeleton"></div>
            <div class="skeleton"></div>
        </div>
    </div>

    <template v-else>
        <Bread />
        <NewCarCard />
        <NewCarTabs />
        <CarsListNew />
        <BannerEB3 />
        <ModalAFK />
        <SEO />
    </template>
</template>

<style scoped lang="scss"></style>