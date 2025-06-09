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
    <section class="brand">
        <div class="container brand__container">
            <div class="brand__img">
                <img :src="newStore?.brand?.banner ? newStore?.brand?.banner : '/images/404.png'"
                    :alt="newStore?.brand?.brand + 'banner'" />
            </div>
            <div class="brand__content">
                <h2 class="brand__name">
                    Экспресс-кредит <span>на автомобили {{ $route.params.brand.toUpperCase() }}</span></h2>
                <FormBanner class="express__form" />

                <ul class="model__form-list">
                    <li>Ставка от {{ appStore.creditPercent }}%</li>
                    <li>Первый взнос 0%</li>
                    <li>Одобрение более 95%</li>
                    <li>КАСКО в подарок</li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.brand {

    .brand__container {
        position: relative;
        max-width: 1920px;
        width: 100%;
        overflow: hidden;

        .brand__img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;

            img {
                width: 100%;
                height: 100%;
                -o-object-fit: cover;
                object-fit: cover;
                filter: brightness(0.7);
            }
        }

        .brand__content {
            position: relative;
            color: var(--bg-light);
            display: flex;
            flex-direction: column;
            max-width: 1440px;
            width: 100%;
            height: 100%;
            margin: 0 auto;
            padding: 60px 0;
            z-index: 2;

            @media screen and (max-width: 1023px) {
                padding-top: 40px;
            }

            @media screen and (max-width: 767px) {
                padding-top: 30px;
            }

            .brand__name {
                position: relative;
                font-weight: 800;
                font-size: 30px;
                line-height: 40px;
                text-transform: uppercase;

                @media screen and (max-width: 1199px) {
                    font-size: 28px;
                }

                @media screen and (max-width: 1023px) {
                    font-size: 20px;
                    line-height: 30px;
                }

                @media screen and (max-width: 767px) {
                    text-align: center;
                    max-width: 265px;
                    margin: 0 auto;
                }

                @media screen and (max-width: 425px) {
                    font-weight: 600;
                    line-height: 24px;
                }

                & span {
                    @media screen and (max-width: 767px) {
                        text-transform: initial;
                    }

                    @media screen and (max-width: 425px) {
                        font-size: 16px;
                    }
                }

                &::before {
                    content: "";
                    position: absolute;
                    top: calc(50% - 2px);
                    left: -265px;
                    width: 250px;
                    height: 4px;
                    background: var(--bg-light);

                    @media screen and (max-width: 1600px) {
                        content: none;
                    }
                }
            }
        }
    }
}

.express__form {
    display: flex;
    flex-direction: row;
    align-items: self-start;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
}

.model__form-list {
    font-weight: 500;
    font-size: 20px;
    line-height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    margin-top: 54px;
    margin-bottom: 34px;

    @media screen and (max-width: 1200px) {
        font-size: 16px;
        line-height: 30px;
        gap: 15px;
    }

    @media screen and (max-width: 1023px) {
        flex-wrap: wrap;
    }

    @media screen and (max-width: 767px) {
        display: none;
    }

    & li {
        position: relative;
        padding-left: 50px;

        @media screen and (max-width: 1200px) {
            padding-left: 40px;
        }

        &::before {
            content: "";
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 0;
            background: url(/svg/star.svg) no-repeat center;
            background-size: contain;
            width: 40px;
            height: 40px;

            @media screen and (max-width: 1200px) {
                width: 30px;
                height: 30px;
            }
        }
    }
}
</style>
