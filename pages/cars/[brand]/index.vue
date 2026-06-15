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

if (!brand) {
    throw createError({ statusCode: 404, statusMessage: 'Brand not found!', fatal: true })
}

// Один useAsyncData => корректный перенос SSR-payload на клиент
// (без hydration mismatch и без повторного fetch/AbortError при гидрации).
const { data, error } = await useAsyncData(`brand-${brand}`, async () => {
    const [brandResponse, modelsResponse] = await Promise.all([
        fetchServerWrapper(`${apiNew}brands/brand/${brand}`),
        fetchServerWrapper(`${apiNew}filters/models?brand_id=${brand}`)
    ]);

    return {
        brand: brandResponse ?? null,
        models: modelsResponse?.models ?? [],
    };
});

if (error.value) {
    console.error('Error fetching data:', error.value);
    throw createError({ statusCode: 500, statusMessage: 'Failed to load data', fatal: true });
}

// Выполняется и на сервере, и на клиенте (data.value берётся из payload) —
// стор заполнен с первого захода.
newStore.brand = data.value?.brand ?? null;
newStore.models = data.value?.models ?? [];

loading.value = false;
appStore.globalLoader = false;
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
        <!-- <BannerB3/>   -->
        <NewModels />
        <BannerCB2 />
        <CarsListNew />
        <ModalAFK />
        <SEO />
    </template>
</template>

<style scoped lang="scss">
.section__header{
    margin-top: 10px;
}
</style>