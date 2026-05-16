<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { apiNew } from '@/constants';

definePageMeta({
    name: 'sedan',
})

// // Добавляем отладку загрузки брендов
// console.log('Before loading china brands:', appStore.chinaBrands);

// if (!appStore.chinaBrands || appStore.chinaBrands.length == 0) {
//     console.log('Loading china brands from API...');
//     fetchClientWrapper(`${apiNew}filters/brands?brand_tag_id=3`)
//         .then(res => res.json())
//         .then(data => {
//             console.log('China brands loaded:', data);
//             appStore.chinaBrands = data;
//         })
//         .catch(error => {
//             console.error('Error loading china brands:', error);
//         });
// } else {
//     console.log('China brands already loaded:', appStore.chinaBrands);
// }

let currentQuary = ref([])

function callback(n) {
    currentQuary.value = n
}
</script>

<template>
    <div class="title">
        <BasePageTitle/>
    </div>
    <!-- <ChinaBanner /> -->
    <!-- <Brands /> -->
    <!-- <ChinaModels /> -->
    <FilterNew @showCars="callback" />
    <CarsListSedan :currentQuary="currentQuary" />
    <BannerEB3 />
    <!-- <ChinaModels /> -->
    <ModalAFK />
    <BasePageContent />
    <SEO />
</template>

<style lang="scss" scoped>
.title{
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 0px ;
    font-size: 24px;
    padding-bottom: 0px;
    // padding-top: 0px;
    @media screen and (max-width: 1000px){
        padding: 10px;
    }
}
</style>