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

// :style="{ backgroundImage: `url(${newStore?.brand?.banner ? newStore?.brand?.banner : '/images/bottom__form-bg.webp'})` }"
</script>

<template>
    <section class="brand__section">
        <div class="container">
            <div class="brand__content">
                <div class="brand__form-wrapper">
                    <h2 class="">
                        <span>Получить индивидуальное предложение на покупку {{ newStore?.brand?.brand.toUpperCase() }} в кредит от 3,9%</span></h2>
                    <FormBanner class="brand__form" />
                </div>

                <div class="brand__img">
                    <h2 class="brand__img-h2">Только до {{ getNextMonday() }} 2025</h2>
                    <h3 class="brand__img-h3">Скидка до 1 000 000 ₽ на
<br>автомобили {{ $route.params.brand.toUpperCase() }}</h3>
                    <NuxtImg
                        :src="`${newStore?.brand?.banner ? newStore?.brand?.banner : '/images/bottom__form-bg.webp'}`"
                        :alt="newStore?.brand?.brand + 'banner'"     
                    />
                </div>

                <div class="brand__benefints">
                    <!-- <BannerSB1 class="brand__banner" /> -->
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.brand__section {
    margin-top: 15px;
    
    .brand__content {
        position: relative;
        max-width: 1920px;
        overflow: hidden;
        padding: 20px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        @media screen and (max-width: 1200px) {
            padding: 20px;
        }

        @media screen and (max-width: 768px) {
            padding: 10px 0;
            align-items: center;
            // background: var(--main-color);
            // padding: 0 0 20px 0;
            // flex-direction: column-reverse;
            gap: 15px;
        }
        @media screen and (max-width: 500px) {
            padding: 0;
            align-items: center;
            // background: var(--main-color);
            // padding: 0 0 20px 0;
            // flex-direction: column-reverse;
            gap: 15px;
        }

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            border-radius: var(--border-radius);
            z-index: 1;

            @media screen and (max-width: 767px) {
                display: none;
            }
        }

        &>* {
            position: relative;
            z-index: 2;
        }

        .brand__img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            order: 1;
            @media screen and (max-width: 767px) {
                
            }
            .brand__img-h2{
                position: absolute;
                z-index: 99999;
                padding: 20px;
                font-size: 30px;
                color: white;
                @media screen and (max-width: 970px){
                    display: none;
                }
            }
            .brand__img-h3{
                color: white;
                position: absolute;
                z-index: 99999;
                bottom: 0px;
                font-size: 30px;
                padding: 20px;
                @media screen and (max-width: 970px){
                    display: none;
                }
            }
            img {
                width: 100%;
                height: 100%;
                -o-object-fit: cover;
                object-fit: cover;
                filter: brightness(0.7);

                @media screen and (max-width: 767px) {
                    min-height: 200px;
                }
            }
        }

        .brand__benefints {
            @media screen and (max-width: 767px) {
                display: none;
            }
        }

        .brand__form-wrapper {
            background: white;
            padding:  15px 30px;
            border-radius: 4px;
            max-width: 500px;
            opacity: 0.9;
            display: flex;
            flex-direction: column;
            gap: 15px;
            order: 2;
            
            @media screen and (max-width: 767px) {
                // background: transparent;
                padding: 10px 25px;
                width: 100%;
                // border-radius: 0;
                // gap: 10px;
                // color: white;
                // width: 100%;
            }

            .brand__name {
                position: relative;
                font-weight: 700;
                font-size: 20px;
                line-height: 30px;
                // text-transform: uppercase;

                @media screen and (max-width: 1199px) {
                    font-size: 18px;
                }

                @media screen and (max-width: 1023px) {
                    font-size: 18px;
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
                    font-weight: 600;
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
</style>
