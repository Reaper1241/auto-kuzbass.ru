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
    <!-- <Slider />? -->
    <BannerNB1/>
    <Brands />
    <FilterNew @showCars="callback" />
    <CarsListNew :currentQuary="currentCarsData" />
    <BannerEB3 />
    <CarsHot />
    <BannerCB1/>
    <ModalAFK />
    <BasePageContent />
    <SEO />
</template>


<style lang="scss" scoped></style>