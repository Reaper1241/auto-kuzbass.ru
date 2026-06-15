<script setup>
import { apiNew } from '@/constants/';

definePageMeta({
    name: 'model',
})

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const $route = useRoute();
const loading = ref(true);

const brand = findBrand($route.params.brand, appStore.newBrands)

if (!brand) {
    throw createError({ statusCode: 404, statusMessage: 'Brand not found!', fatal: true })
}

const { data, error } = await useAsyncData(`model-${brand}-${$route.params.model}`, async () => {
    const models = (await fetchServerWrapper(`${apiNew}models/${brand}`)) ?? [];
    const modelId = findModel($route.params.model, models);
    const model = modelId
        ? await fetchServerWrapper(`${apiNew}models/model/${modelId}`)
        : null;

    return { models, model };
});

if (error.value) {
    console.error('Error fetching model data:', error.value);
    throw createError({ statusCode: 500, statusMessage: 'Failed to load model', fatal: true });
}

if (!data.value?.model) {
    throw createError({ statusCode: 404, statusMessage: 'Model not found!', fatal: true })
}

newStore.models = data.value.models ?? [];
newStore.model = data.value.model;

useHead({
    meta: [
        { name: 'og:image', content: `${newStore.model?.preview}` },
    ],
})

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
            <div class="skeleton"></div>
        </div>
    </div>

    <template v-else>
        <Bread />
        <ModelCard class="model"/>
        <!-- <ModelTimer /> -->
        <ModelTabs />
        <ModelFinance />
        <CarsListNew :id="`catalog`" />
        <BannerEB3 :car="newStore.model" />
        <ModalAFK />
        <SEO />
    </template>
</template>

<style scoped lang="scss">
.model{
    // margin-top: 30px;
}
</style>