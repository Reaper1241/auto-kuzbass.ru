<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

import { useRoute } from 'vue-router';
const $route = useRoute();

const brandShow = ref(false);

function showAll() {
    brandShow.value = !brandShow.value;
}

const brands = computed(() => $route.name == 'china' ? appStore?.chinaBrands.brands : appStore?.newBrands);
</script>

<template>
    <section class="brands__section section">
        <div class="container">
            <div class="brands__wrapper">
                <div class="section__header">
                    <BasePageTitle />
                </div>

                <div class="brands__body">
                    <div class="brand__list-block">
                        <ul class="brand__list">
                            <li class="brand__item" v-for="brand in brands" :key="brand.id"
                                :class="{ 'brand__item--show': brandShow }">
                                <NuxtLink :to="`/cars/${brand.url_brand}/`" class="brand__link">
                                    <div class="brand__info">
                                        <img class="brand__logo" :src="`${brand.logo}`" :alt="`${brand.brand}`" />
                                        <div class="brand__span">
                                            <p>{{ brand.brand }}</p>
                                            <span>{{ brand.cars_count }}</span>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </li>
                        </ul>
                        <!-- <button class="brand__list-btn" @click="showAll()" v-if="brands?.length > 18">
                            {{ brandShow ? "Скрыть" : "Показать еще" }}
                        </button> -->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.brands__section {
    .section__header {
        display: flex;
        align-items: center;
        gap: 30px;
        flex-wrap: wrap;

        @media (max-width: 767px) {
            gap: 10px;
        }
    }

    .brand__list {
        display: -ms-grid;
        display: grid;
        -ms-grid-columns: 1fr 0 1fr 0 1fr 0 1fr 0 1fr;
        grid-template-columns: repeat(6, 1fr);
        gap: 15px 23px;
        
        @media screen and (max-width: 1199px) {
            grid-template-columns: repeat(5, 1fr);
        }

        @media screen and (max-width: 1023px) {
            grid-template-columns: repeat(4, 1fr);
        }

        @media screen and (max-width: 767px) {
            grid-template-columns: repeat(3, 1fr);
            gap: 15px 10px;
        }

        @media screen and (max-width: 570px) {
            grid-template-columns: repeat(3, 1fr);
        }

        @media screen and (max-width: 359px) {
            grid-template-columns: repeat(2, 1fr);
        }

        .brand__item {
            width: 100%;
            
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            // border-radius: 10px;
            // border: var(--border);
            opacity: 0.8;
            transition: all 0.3s ease;

            @media screen and (max-width: 767px) {
                filter: grayscale(0);
                opacity: 1;
            }

            &:hover {
                // border: var(--border-hover);
            }

            .brand__link {
                width: 100%;
                height: 100%;
                display: block;
                
                .brand__info {
                    display: flex;
                    align-items: center;
                    
                    text-align: start;
                    white-space: nowrap;
                    max-width: 160px;
                    width: 100%;
                    height: 100%;
                    margin: 0 auto;
                    
                    @media screen and (max-width: 570px) {
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 5px !important;
                        text-align: start;
                        
                    }
                    .brand__span{
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        
                        p{
                            flex-wrap: nowrap;
                            // align-items: center;
                            
                        }
                        span{
                            margin-top: 0px;
                            
                            @media screen and (max-width: 570px){
                                margin-top: 4px;
                            }
                        }
                        @media screen and (max-width: 570px) {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            
                        }
                    }

                    .brand__logo {
                        max-width: 50px;
                        width: 100%;
                        height: 30px;
                        object-fit: contain;
                        object-position: left;

                        @media screen and (max-width: 570px) {
                            object-position: center;
                        }
                    }

                    & p {
                        font-size: 14px;
                        line-height: 20px;
                        text-transform: capitalize;
                        margin-bottom: 5px;

                        @media screen and (max-width: 570px) {
                            font-weight: 500;
                            text-align: center;
                            margin-bottom: 2px;
                        }

                        @media screen and (max-width: 359px) {
                            text-transform: uppercase;
                        }
                    }

                    & span {
                        // display: flex;
                        // align-items: center;
                        font-weight: 300;
                        line-height: 18px;
                        margin-bottom: 5px;
                        font-size: 16px;
                        color: var(--main-color);
                        @media screen and (max-width: 570px) {
                            text-align: center;
                        }
                    }
                }
            }

            // &:nth-child(n + 19) {
            //     display: none;
            // }
        }

        // .brand__item--show {
        //     &:nth-child(n + 19) {
        //         display: block;
        //     }
        // }
    }


    .brand__list-btn {
        width: fit-content;
        font-weight: 400;
        font-size: 16px;
        line-height: 20px;
        color: var(--bg-light);
        background: #BDBDBD;
        border: 1px solid #BDBDBD;
        border-radius: 10px;
        margin-top: 30px;
        transition: all 0.3s ease;
        padding: 15px 20px;
        justify-self: self-end;
        display: flex;

        @media screen and (max-width: 425px) {
            height: 70px;
            margin-top: 20px;
        }

        &:hover {
            color: var(--main-black);
            background: var(--bg-light);
        }
    }
}


@keyframes gradientAnimation {
    0% {
        background:
            linear-gradient(#fff, #fff) padding-box,
            linear-gradient(90deg, #cecece, #f1f1f1) border-box;
    }

    25% {
        background:
            linear-gradient(#fff, #fff) padding-box,
            linear-gradient(180deg, #cecece, #f1f1f1) border-box;
    }

    50% {
        background:
            linear-gradient(#fff, #fff) padding-box,
            linear-gradient(270deg, #cecece, #f1f1f1) border-box;
    }

    75% {
        background:
            linear-gradient(#fff, #fff) padding-box,
            linear-gradient(360deg, #cecece, #f1f1f1) border-box;
    }

    100% {
        background:
            linear-gradient(#fff, #fff) padding-box,
            linear-gradient(90deg, #cecece, #f1f1f1) border-box;
    }
}
</style>