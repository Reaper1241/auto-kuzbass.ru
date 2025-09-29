<script setup>
definePageMeta({
    name: 'taxi',
})
</script>

<template>
    <div class="title">
        <!-- <BasePageTitle /> -->
    </div>
    <Bread />
    <TaxiBanner />
    <Taxi />
    <BannerTB2 />

    <ModalAFK />
    <BasePageContent />
    <SEO />
</template>

<style lang="scss" scoped>
.title{
    max-width: 1430px;
    margin: 0 auto;
    // padding: 30px 15px;
    font-size: 24px;
}
</style>