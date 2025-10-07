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

if (brand) {
    loading.value = true;
    appStore.globalLoader = true

    const { data: models } = await fetchServerWrapper(`${apiNew}models/${brand}`);
    newStore.models = models.value;
    const modelId = findModel($route.params.model, newStore.models);

    if (!modelId) {
        throw createError({ statusCode: 404, statusMessage: 'Model not found!', fatal: true })
    }

    try {
        const { data: model } = await fetchServerWrapper(`${apiNew}models/model/${modelId}`);
        newStore.model = model.value;

        if (!model.value || !modelId) {
            throw createError({ statusCode: 404, statusMessage: 'Model not found!', fatal: true })
        } else {
            useHead({
                meta: [
                    { name: 'og:image', content: `${newStore.model?.preview}` },
                ],
            })
        }

        console.log('Model id: ' + model.value.id + ' ' + $route.params.model)
        console.log(`${apiNew}models/model/${modelId}`)
    } catch (error) {
        console.error('Error fetching model data:', error);
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