<script setup>
import { apiNew } from '@/constants/';

definePageMeta({
    name: 'brand',
    layout: 'home'
})

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const $route = useRoute();
const brand = findBrand($route.params.brand, appStore.newBrands)
const loading = ref(true);

if (brand) {
    try {
        loading.value = true;
        appStore.globalLoader = true

        // Use Promise.all to wait for both requests to complete
        const [brandResponse, modelsResponse] = await Promise.all([
            fetchServerWrapper(`${apiNew}brands/brand/${brand}`),
            fetchServerWrapper(`${apiNew}filters/models?brand_id=${brand}`)
        ]);

        newStore.brand = brandResponse.data.value;
        newStore.models = modelsResponse.data.value.models;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw createError({ statusCode: 500, statusMessage: 'Failed to load data', fatal: true });
    } finally {
        loading.value = false;
        appStore.globalLoader = false
    }
} else {
    throw createError({ statusCode: 404, statusMessage: 'Brand not found!', fatal: true })
}
</script>

<template>
    <div v-if="loading" class="container">
        <div class="skeleton-car">
            <div class="skeleton image"></div>
            <div class="skeleton"></div>
            <div class="skeleton small-text"></div>
            <div class="skeleton"></div>
        </div>
    </div>

    <template v-else>
        <Bread />
            <div class="container">
                <div class="section__header">
                    <BasePageTitle />
                </div>
            </div>
        <BannerMB4 />
        <NewModels />
        <BannerCB1 />
        <CarsListNew />
        <!-- <ModalAFK /> -->
        <SEO />
    </template>
</template>

<style scoped lang="scss">
.section__header{
    margin-top: 30px;
}
</style>