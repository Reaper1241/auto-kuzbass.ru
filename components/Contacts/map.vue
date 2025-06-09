<script setup>
import { useAppStore } from "/stores/AppStore.js";
const appStore = useAppStore();
</script>

<template>
    <section class="section section__map" v-if="appStore?.yandexMap">
        <div class="map">
            <iframe :src="`${appStore?.yandexMap}`" width="100%" height="100%" frameborder="0" allowfullscreen>
            </iframe>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.section__map {
    display: flex;
    .map {
        width: 900px;
        height: 300px;
        @media screen and (max-width: 1300px) {
            width: 800px;
            height: 300px;
        }
        @media screen and (max-width: 1200px) {
            width: 600px;
            height: 300px;
        }
        @media screen and (max-width: 1000px) {
            max-width: 500px;
            height: 300px;
        }
        @media screen and (max-width: 767px) {
            max-width: 100%;
            height: 400px;
        }
        @media screen and (max-width: 567px) {
            max-width: 400px;
            height: 400px;
        }
        @media screen and (max-width: 450px) {
            max-width: 350px;
            height: 400px;
        }
    }
}
</style>