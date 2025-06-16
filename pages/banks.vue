<script setup></script>

<template>
    <Bread />
    <h2 class="title">Заявка на автокредит в БАНК</h2>
    <Banks />
    <!-- <BannerSB1 /> -->
    <BannerEB3 />
    <ModalAFK />
    <SEO />
</template>



<style lang="scss" scoped>
    .title{
        max-width: 1440px;
        margin: 0 auto;
        padding:0 20px ;
        @media screen and (max-width: 540px) {
            padding: 0 10px;
        }
    }
</style>