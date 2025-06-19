<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { apiNew } from '@/constants';

definePageMeta({
    name: 'china',
})

if (appStore.chinaBrands.length == 0) {
    fetchClientWrapper(`${apiNew}filters/brands?brand_tag_id=2`).
        then(res => res.json())
        .then(data => appStore.chinaBrands = data)
}

let currentQuary = ref([])

function callback(n) {
    currentQuary.value = n
}
</script>

<template>
    <div class="title">
        <BasePageTitle />
    </div>
    <ChinaBanner />
    <Brands />
    <FilterNew @showCars="callback" />
    <CarsListNew :currentQuary="currentQuary" />
    <BannerEB3 />
    <ChinaModels />

    <!-- <ModalAFK /> -->
    <BasePageContent />
    <SEO />
</template>

<style lang="scss" scoped>
.title{
    max-width: 1430px;
    margin: 0 auto;
    padding: 30px 15px;
    font-size: 24px;
}
</style>