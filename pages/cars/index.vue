<script setup>
definePageMeta({
    name: 'cars',
})

let currentQuary = ref([])

function callback(n) {
    currentQuary.value = n
}
</script>

<template>
    <Bread />
    <Brands />
    
    <FilterNew @showCars="callback" />
    <CarsListNew :currentQuary="currentQuary" />
    <!-- <CarsPopular/> -->
    <BannerEB3 />
    
    <SEO />
</template>

<style scoped lang="scss"></style>