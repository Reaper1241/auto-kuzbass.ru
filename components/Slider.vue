<script setup>
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const currentSlide = ref(0)

const slides = ref([
    {
        text: "Мощные, технологичные, экономичные во владении!",
        title: "Покупайте кроссоверы GEELY!",
        url: "/cars/geely/",
        image: "images/slider/main1.webp",
    },
    {
        text: "LADA VESTA SW CROSS - современный, комфортный, наш. По специальной цене",
        title: "Покоряйте родные просторы на надежном авто!",
        url: "/cars/lada/vesta_sw_cross_new",
        image: "images/slider/main2.webp",
    },
    {
        text: "Компактный и мощный, с багажником 1133 л.",
        title: "HAVAL JOLION - ваш яркий городской помощник",
        url: "/cars",
        image: "images/slider/main3.webp",
    },

],)

const loading = ref(true);
onMounted(() => {
    loading.value = false
})

function prev() {
    currentSlide.value--
    if (currentSlide.value < 0) {
        currentSlide.value = slides.value.length - 1
    }
}
function next() {
    currentSlide.value++
    if (currentSlide.value > slides.value.length - 1) {
        currentSlide.value = 0
    }
}
</script>

<template>
    <section class="main__slider section">
        <div class="container">
            <Carousel id="gallery" :items-to-show="1" :wrap-around="true" v-model="currentSlide" :mouseDrag="true"
                class="home__slider" :gap="10" :autoplay="5000">
                <Slide v-for="(slide, index) in slides" :key="index">
                    <img class="slide__img" :src="slide.image" alt="car" />
                    <div class="slider__content">
                        <div class="carousel__item">
                            <p class="slide__text">{{ slide.text }}</p>
                            <h2 class="slide__title">{{ slide.title }}</h2>
                            <NuxtLink :to="slide.url" class="slide__link">
                                <p>Подробнее</p>
                            </NuxtLink>
                        </div>
                    </div>
                </Slide>

                <template #addons>
                    <button class="carousel__prev" @click="prev"></button>
                    <button class="carousel__next" @click="next"></button>
                    <Pagination />
                </template>
            </Carousel>
        </div>
    </section>
</template>

<style scoped lang="scss">
.main__slider {
    .home__slider {
        border-radius: var(--border-radius);
        overflow: hidden;
        position: relative;
    }

    .carousel__slide {
        position: relative;
        z-index: 2;
        width: 100%;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.55) 39%, rgba(0, 0, 0, 0) 63%);
            z-index: 0;
            pointer-events: none;
        }

        .slide__img {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            z-index: -1;

        }

        .slide__img1 {
            @media screen and (max-width: 768px) {
                object-position: 40% 50%;
            }
        }

        .slider__content {
            background: transparent;
            height: 100%;
            width: 100%;
            padding: 50px 100px;

            @media screen and (max-width: 768px) {
                padding: 50px 50px;
            }

            .carousel__item {
                color: var(--bg-light);
                position: relative;
                display: flex;
                flex-direction: column;
                padding: 100px 0;
                height: 100%;
                max-width: 600px;
                justify-content: center;
                gap: 15px;

                @media screen and (max-width: 1024px) {
                    padding: 50px 0;
                }

                @media screen and (max-width: 768px) {
                    padding: 20px 0;
                }

                .slide__title {
                    font-weight: 700;
                    font-size: 36px;
                    line-height: 40px;
                    text-align: left;
                    margin-top: 10px;
                    margin-bottom: 20px;

                    @media screen and (max-width: 768px) {
                        font-size: 30px;
                        line-height: 36px;
                    }

                    @media screen and (max-width: 520px) {
                        font-size: 24px;
                        line-height: 30px;
                    }
                }

                .slide__text {
                    font-weight: 400;
                    font-size: 22px;
                    line-height: auto;
                    text-align: left;

                    @media screen and (max-width: 520px) {
                        font-weight: 500;
                        font-size: 17px;
                        line-height: 24px;
                    }
                }

                .slide__link {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 300px;
                    padding: 20px 25px;
                    background: var(--main-color);
                    border: 1px solid var(--main-color);
                    border-radius: 7px;
                    transition: all 0.3s ease;
                    margin-top: 0;

                    @media screen and (max-width: 520px) {
                        padding: 10px 15px;
                    }

                    @media screen and (max-width: 375px) {
                        width: 100%;
                    }

                    &:hover {
                        background: transparent;

                        & p {
                            color: white;
                        }
                    }

                    & p {
                        font-weight: 500;
                        font-size: 16px;
                        line-height: 18px;
                        background: transparent;
                    }
                }
            }
        }
    }

    .carousel__prev,
    .carousel__next {
        position: absolute;
        top: calc(50% - 10px);
        width: 50px;
        height: 50px;
        font-size: 0;
        padding: 0;
        z-index: 1;

        @media screen and (max-width: 768px) {
            display: none;
            width: 44px;
            height: 44px;
        }

        @media screen and (max-width: 520px) {
            opacity: .5;
        }
    }

    .carousel__prev {
        left: 10px;
        background: url(/svg/slider-left.svg) no-repeat center;
        background-size: contain;
    }

    .carousel__next {
        right: 10px;
        background: url(/svg/slider-right.svg) no-repeat center;
        background-size: contain;
    }
}
</style>