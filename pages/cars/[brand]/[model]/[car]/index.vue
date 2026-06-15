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

if (!brand) {
    throw createError({ statusCode: 404, statusMessage: 'Brand not found!', fatal: true })
}

const { data, error } = await useAsyncData(`car-${$route.params.car}`, async () => {
    const car = await fetchServerWrapper(`${apiNew}cars/car/${$route.params.car}`);
    if (!car) {
        return { car: null };
    }

    const models = (await fetchServerWrapper(`${apiNew}models/${brand}`)) ?? [];
    const modelId = findModel($route.params.model, models);
    if (!modelId) {
        return { car, models, notFound: 'model' };
    }

    const [galleries, model] = await Promise.all([
        fetchServerWrapper(`${apiNew}galleries/${car.car_model_id}`),
        fetchServerWrapper(`${apiNew}models/model/${modelId}`),
    ]);

    return { car, models, galleries, model };
});

if (error.value) {
    console.error('Error fetching car data:', error.value);
    throw createError({ statusCode: 500, statusMessage: 'Failed to load car', fatal: true });
}

if (!data.value?.car) {
    throw createError({ statusCode: 404, statusMessage: 'Car not found!', fatal: true })
}

if (data.value.notFound === 'model') {
    throw createError({ statusCode: 404, statusMessage: 'Model not found!', fatal: true });
}

const car = data.value.car;
newStore.models = data.value.models ?? [];
newStore.model = data.value.model ?? null;
carStore.galleries = data.value.galleries ?? null;
carStore.car = car;

appStore.globalLoader = false
loading.value = false

if (car.images?.length) {
    useHead({
        meta: [
            { name: 'og:image', content: `${car?.images[0]?.url}` },
        ],
    })
} else {
    useHead({
        meta: [
            { name: 'og:image', content: `${car?.preview}` },
        ],
    })
}
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
        <NewCarCard @car-updated="handleCarUpdate"/>
        
        <NewCarTabs />
        <BannerCB3 :car="carData"/>
        <ModelFinance  class="finance"/>
        <CarsListNew />
        <BannerEB3 :car="carStore.car"/>
        <ModalAFK />
        <SEO />
    </template>
</template>

<style scoped lang="scss">
.finance{
    margin-bottom: 10px;
}
</style>