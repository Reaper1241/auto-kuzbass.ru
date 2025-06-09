<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { useNewCarStore } from '/stores/NewCarStore.js'
const carStore = useNewCarStore()

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

function getBrandImage(url) {
    return appStore.newBrands.find(brand => brand.url_brand == url)?.logo
}
const car = ref(carStore.car);
</script>

<template>
    <section class="model-banner section mb2">
        <div class="container">
            <div class="model-banner__wrapper">
                <div class="model-banner__body">
                    <div class="model-banner__text">
                        <div class="model-banner__title">
                            <NuxtImg lazy format="webp" quality="90" loading="lazy"
                                :src="`${getBrandImage($route.params.brand)}`" alt="car"
                                class="model-banner__title-img" />
                            <span>Получите ваше персональное предложение на
                                <b>{{ cleanUpTitle($route.params?.brand, $route.params?.model).toUpperCase() }}</b>
                            </span>
                        </div>
                        <div class="model-banner__content">
                            <div class="mode-banner__prices">

                                <span class="current">от {{ makeSpaces(car.price - car.sale) }} ₽</span>
                                <span class="old">от {{ makeSpaces(car.price) }} ₽</span>
                            </div>
                            <div class="model-banner__buttons">
                                <BaseButtonModal :car="car" :btn-label="'Получить предложение'" :app-type="8"
                                    :modal-title="`Получить предложение на ${cleanUpTitle(carStore.car.brand, carStore.car.model).toUpperCase()}`"
                                    :btn-class="`classic`" category="new" />
                                <BaseButtonModal :car="car" :btn-label="'Заказать тест-драйв'" :app-type="8"
                                    :modal-title="`Заказать тест-драйв ${cleanUpTitle(carStore.car.brand, carStore.car.model)}`"
                                    :btn-class="`bordered`" category="new" />
                            </div>
                        </div>
                    </div>
                    <div class="model-banner__image">
                        <NuxtImg lazy format="webp" quality="90" loading="lazy" :src="newStore.model.banner" alt="car"
                            v-if="newStore.model.banner" />
                        <NuxtImg lazy format="webp" quality="90" loading="lazy" src="/images/modalDefault.webp"
                            alt="car" v-else />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style lang="scss" scoped>
.model-banner {
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    padding: 0;
    background: #FAFAFA;
}

.model-banner__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;

    @media screen and (max-width: 900px) {
        display: flex;
        flex-direction: column-reverse;
        gap: 0;
    }



    .model-banner__image {
        margin-right: -200px;
        max-height: 550px;

        @media screen and (max-width: 900px) {
            margin-right: -20px;
            margin-left: -20px;
            max-height: fit-content;
            ;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .model-banner__text {
        width: 100%;
        padding: 40px 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: start;
        justify-content: space-around;

        @media screen and (max-width: 900px) {
            padding: 20px 0;
            gap: 30px;
        }

        .model-banner__content {
            display: flex;
            flex-direction: column;
            gap: 20px;

            @media screen and (max-width: 768px) {
                width: 100%;
            }

            .mode-banner__prices {
                display: flex;
                gap: 15px;
                align-items: center;
                flex-wrap: wrap;

                .current {
                    font-weight: bold;
                    font-size: var(--extra-big-size);
                    line-height: normal;
                }

                .old {
                    text-decoration-line: line-through;
                    color: var(--light-dark-color);
                    font-size: var(--big-size);
                    line-height: normal;
                }
            }

            .model-banner__buttons {
                display: flex;
                gap: 20px;
                justify-content: space-between;

                @media screen and (max-width: 768px) {
                    flex-wrap: wrap;
                    gap: 10px;
                }
            }
        }

        .model-banner__title {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: start;

            span {
                font-size: 34px;
                line-height: normal;

                @media screen and (max-width: 1200px) {
                    font-size: var(--extra-big-size);
                }

                @media screen and (max-width: 900px) {
                    font-size: var(--big-size);
                }
            }

            .model-banner__title-img {
                height: 80px;
                width: auto;
                object-fit: contain;

                @media screen and (max-width: 900px) {
                    height: 40px;
                }
            }
        }
    }
}
</style>