<script setup>
import { useAppStore } from '/stores/AppStore.js'
const appStore = useAppStore()

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

import { useRoute } from 'vue-router'
const $route = useRoute()

const loading = ref(true);

onMounted(() => {
    loading.value = false
})
</script>

<template>
    <section class="page-banner pb1">
        <div class="container">
            <div class="page-banner__wrapper">
                <div class="page-banner__body">
                    <div class="page-banner__text">
                        <h2 class="page-banner__title">
                            Новые автомобили {{ cleanUpTitle($route.params?.brand) }}
                            <br>в наличии у дилера в Москве
                        </h2>
                        <div class="page-banner__subtitle"
                            v-if="newStore.brand.warranty_km || newStore.brand.warranty_year">
                            Гарантия на авто
                            {{ newStore.brand.warranty_km ? (newStore.brand.warranty_km + ' км') : '' }}
                            {{ newStore.brand.warranty_km && newStore.brand.warranty_year ? ' или ' : '' }}
                            {{ newStore.brand.warranty_year ? (getYear(newStore.brand.warranty_year)) : '' }}
                        </div>

                        <BaseButtonModal :btn-label="'Просмотреть сертификат официального дилера'"
                            :btn-class="`comp fit`" :modalType="`pb1`"
                            v-if="$route.params.brand == 'dongfeng' || $route.params.brand == 'kaiyi' || $route.params.brand == 'mg' || $route.params.brand == 'swm' || $route.params.brand == 'livan' || $route.params.brand == 'itong'" />

                        <button class="page-banner__button"
                            @click="appStore.modelsList.scrollIntoView({ behavior: 'smooth' })" v-else>
                            Посмотреть все модели
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <img class="page-banner__bg" :src="newStore?.brand?.banner" :alt="newStore?.brand?.brand + 'banner'" />
    </section>
</template>

<style lang="scss" scoped>
.page-banner {
    overflow: hidden;
    min-height: 650px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .container {
        position: relative;
        z-index: 10;
    }

    .page-banner__body {
        background: #3b3b3b9a;
        padding: 20px;
        border-radius: 20px;
        display: flex;
        align-items: start;
        width: fit-content;

        .page-banner__text {
            .base-button {
                width: fit-content;
            }
        }
    }

    @media screen and (max-width: 540px) {
        min-height: 450px;
    }

    .page-banner__text {
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: start;

        .page-banner__title {
            color: white;
            font-size: 34px;
            font-weight: 700;

            @media screen and (max-width: 540px) {
                font-size: 24px;
            }
        }

        .page-banner__subtitle {
            color: white;
            font-size: 26px;
            font-weight: 500;

            @media screen and (max-width: 540px) {
                font-size: var(--big-size);
            }
        }

        .page-banner__button {
            background: var(--main-color);
            border: 1px solid var(--main-color);
            color: white;
            padding: 15px 35px;
            margin-top: 15px;
            transition: 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 10px;

            &:hover {
                background: white;
                border: 1px solid var(--main-color);
                color: var(--main-color);
                transition: 0.3s;
            }
        }
    }

    div {
        background: transparent;
    }
}

.page-banner__bg {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>