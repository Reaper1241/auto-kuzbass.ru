<script setup>
definePageMeta({
    name: 'index',
    layout: 'home'
})

let currentCarsData = ref([])

function callback(n) {
    return currentCarsData.value = n
}
</script>

<template>
    <Slider />
    <BannerEB2/>
    <Brands />
    <FilterNew @showCars="callback" />
    <CarsListNew :currentQuary="currentCarsData" />
    <BannerEB3 />
    <!-- <CarsPopular/> -->
    <CarsHot />
    <BannerCB1/>
    <!-- <Sales/> -->
    <ModalAFK />
    <BasePageContent />
    <SEO />
</template>


<style lang="scss" scoped></style>