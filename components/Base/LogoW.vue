<script setup></script>

<template>
    <NuxtLink to="/" class="logo">
        <img src="/svg/footer-logo.svg" alt="logo footer" />
    </NuxtLink>
</template>

<style lang="scss" scoped>
.logo {
    width: auto;

    @media screen and (max-width: 768px) {
        text-align: center;
    }

    img {
        max-width: 150px;
        max-height: 100%;
        object-fit: cover;

        @media screen and (max-width: 768px) {
            max-width: 120px;
        }
    }
}
</style>