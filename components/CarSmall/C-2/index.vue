<script setup>
import Slider from './Slider.vue';
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const props = defineProps(['car'])
const car = computed(() => props.car)

const selectedImage = ref(0);
const isMobile = ref(false);

/* Обсервер */
const targetElement = ref(null);
const isVisible = ref(false);

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    isVisible.value = true;
                    observer.disconnect();
                }
            });
        },
        {
            root: null,
            rootMargin: '400px',
            threshold: 0.1
        }
    );

    if (targetElement.value) {
        observer.observe(targetElement.value);
    }

    const updateScreenSize = () => {
        isMobile.value = window.innerWidth < 768;
    };

    updateScreenSize();

    window.addEventListener('resize', updateScreenSize);

    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateScreenSize);
    });
});
/* Обсервер */

</script>

<template>
    <div class="car c-1" :class="{ 'current-car': car.id == $route.params.car }">
        <div class="car__stickers">
            <div class="car__title">
                <span class="name">
                    <p>{{ cleanUpTitle(car.brand) }}</p>
                    <NuxtLink :to="`/cars/${car.url_brand}`">Подробнее ></NuxtLink>
                </span>
                
                <div class="price">
                    <div class="car__price-current">
                            от {{ makeSpaces(car.price - car?.sale) }} ₽
                    </div>
                    <div class="car__price-old" v-if="car.sale">
                            от {{ makeSpaces(car.price) }} ₽
                    </div>
                </div>  
                <!-- <span class="model">
                    {{ cleanUpTitle(car.model) }}
                </span> -->
                <!-- <div class="configuration" v-if="car.complectation || car.modification"> -->
                    <!-- <span class="complectation__span">{{ car.complectation }}</span> -->
                    <!-- <span>{{ car.modification }}</span> -->
                <!-- </div> -->
            </div>  
            <div class="price-mob">
                    <div class="car__price-current">
                            от {{ makeSpaces(car.price - car?.sale) }} ₽
                    </div>
                    <div class="car__price-old" v-if="car.sale">
                            от {{ makeSpaces(car.price) }} ₽
                    </div>
                </div>  
        <div class="car__img" ref="targetElement">
            <div class="car__slider" v-if="isVisible">
                <div class="car__slider-wrapper" v-if="car.images.length && !isMobile">
                    <NuxtLink :to="`/cars/${car.url_brand}`">
                        <div class="slider__overflow">
                            <div class="slider__overflow-list">
                                <div class="slider__overflow-item"
                                    v-for="(slide, index) in car.images.slice(0, (car.images.length > 5 ? 5 : car.images.length))"
                                    :key="index"
                                    :style="{ width: 100 / (car.images.length > 5 ? 5 : car.images.length) + '%', height: '100%' }"
                                    @mouseenter="selectedImage = index" @mouseleave="selectedImage = 0"
                                    :class="{ 'active': selectedImage === index }" />

                            </div>
                        </div>
                    </NuxtLink>
                    <div class="slider__item" v-if="car.images.length">
                        <NuxtImg
                            v-for="(slide, index) in car.images.slice(0, (car.images.length > 5 ? 5 : car.images.length))"
                            :key="index" v-show="selectedImage === index" :src="`${slide.url}`" alt="car" format="webp"
                            quality="30" class="lazy-load-image" placeholder="/images/spinner.svg" />
                    </div>
                    <div class="slider__item" v-else>
                        <NuxtLink :to="`/cars/${car.url_brand}`">Нет фото</NuxtLink>
                    </div>
                </div>

                <div class="car__slider-wrapper" v-else>
                    <NuxtLink :to="`/cars/${car.url_brand}`">
                        <div class="slider__item second">
                            <img :src="`${car.preview}`" alt="car" />
                        </div>
                    </NuxtLink>
                </div>

                <div class="car__slider-wrapper mobile" v-if="car.images.length && isMobile">
                    <Slider :carInfo="car" />
                </div>
                <div class="car__slider-wrapper mobile" v-else>
                    <NuxtLink :to="`/cars/${car.url_brand}`">
                        <div class="slider__item second">
                            <NuxtImg lazy format="webp" quality="90" loading="lazy" :src="`${car.preview}`" alt="car" />
                        </div>
                    </NuxtLink>
                </div>
            </div>
            
                <!-- <div class="sticker available">В наличии</div> -->
                <!-- <div class="sticker sale" v-if="car.sale">-{{ Math.round((car.sale / car.price) * 100) }}%</div> -->
                <!-- <div class="sticker garantee" v-if="car.warranty_year">Гарантия {{ car.warranty_year }}</div> -->
            </div>
        </div>

        <NuxtLink :to="`/cars/${car.url_brand}/${car.url_model}/${car.id}`" class="car__info">
            <!-- <div class="car__title">
                <span class="name">
                    {{ cleanUpTitle(car.brand, car.model) }}
                </span>

                <div class="configuration" v-if="car.complectation || car.modification">
                    <span class="complectation__span">{{ car.complectation }}</span>
                    <span>{{ car.modification }}</span>
                </div>
            </div> -->

            <!-- <div class="car__params">
                <ul class="car__params-list">
                    <li class="car__param" v-if="car.power">
                        {{ car.power }} л/с
                    </li>
                    <li class="car__param" v-if="car.fuel">
                        {{ car.fuel }}
                    </li>
                    <li class="car__param" v-if="car.drive">
                        {{ car.drive }}
                    </li>
                </ul>
            </div> -->

            <!-- <div class="car__percent">
                Ставка по кредиту от {{ appStore.creditPercent }}%
            </div> -->

            <!-- <div class="car__price">
                <div class="car__price-current">
                    от {{ makeSpaces(car.price - car?.sale) }} ₽
                </div>
                <div class="car__price-old" v-if="car.sale">
                    от {{ makeSpaces(car.price) }} ₽
                </div>
                <div class="car__price-month">
                    в кредит от: <span>{{ makeSpaces(appStore.calcMonthPrice(car)) }} руб/мес</span>
                </div>
            </div> -->
        </NuxtLink>


        <div class="car__controls">
            <!-- <BaseButtonModal :car="car" :btn-label="'Купить в кредит'" :app-type="2"
                :modal-title="`Купить в кредит ${cleanUpTitle(car.url_brand, car.url_model)}`"
                :btn-class="`classic credit`" category="new" /> -->

            <!-- <BaseButtonModal :car="car" :btn-label="'Заказать обратный звонок'"  :app-type="8"
                :modal-title="`Закажите обратный звонок и наш специалсит перезвонит Вам в течение 15 минут!`"
                :btn-class="`classic trade`" category="new" :btnIcon="`fa-solid fa-phone`"/> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
.price-mob{
    display: none;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding:0px 10px 10px 10px;
    // justify-content: space-between;
    @media screen and (max-width: 1401px){
        display: flex;
    }
    .car__price-current{
        color: white;
        font-weight: 700;
        font-size: 20px;
    }
    .car__price-old{
        color: rgb(184, 184, 184);
        font-size: 16px;
        text-decoration: line-through;
    }
}
.price{
    display: flex;
    align-items: flex-start;
    // justify-content: left;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    padding: 0px 10px;
    // padding:0px 10px 10px 10px;
    // justify-content: space-between;
    @media screen and (max-width: 1401px){
        display: none;
    }
    .car__price-current{
        color: white;
        font-weight: 700;
        font-size: 20px;
    }
    .car__price-old{
        color: rgb(184, 184, 184);
        font-size: 16px;
        text-decoration: line-through;
    }
}

.car {
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 280px;
    border-radius: 4px;
    border: 1px solid #2d4b56;
    transition: 0.3s;
    position: relative;
    background: #2d4b56;
    // gap: 10px;
    padding: 0px !important;

    &:hover {
        box-shadow: var(--box-shadow);
        transition: 0.3s;
    }

    .car__info {
        // padding: 15px;

        

        .car__params {
            margin: 10px 0;

            .car__params-list {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                color: #A7A7A7;

                .car__param {
                    position: relative;

                    &:before {
                        content: '🞄';
                        margin-right: 2px;
                        font-size: 14px;
                    }
                }
            }
        }

        .car__percent {
            margin-bottom: 10px;
            border-radius: 15px;
            border: 2px solid var(--main-color);
            padding: 5px 10px;
            width: fit-content;
            color: var(--main-color);
        }

        .car__more-link {
            padding: 15px;
            background: var(--main-color);
            border: 1px solid var(--main-color);
            color: white;
            text-align: center;
            border-radius: 4px;
            width: auto;
            transition: 0.3s;

            &:hover {
                background: transparent;
                transition: 0.3s;
                color: var(--main-color);
            }
        }

        .car__price {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            

            .car__price-month {
                font-size: var(--standart-size);
                margin-top: 3px;
                @media screen and (max-width: 400px) {
                    font-size: 12px;
                }

                span {
                    color: var(--main-color);
                }
            }

            .car__price-current {
                font-size: 18px;
                line-height: normal;
                font-weight: 700;
                color: var(--main-color);
            }

            .car__price-old {
                margin-left: 10px;
                color: #b0b0b0;
                text-decoration: line-through;
            }
        }
    }

    .car__controls {
        padding: 0 10px 15px 10px;
        width: 100%;
        display: grid;
        flex-direction: column;
        gap: 10px;
    }



    .car__img {
        position: relative;
        width: 100%;
        overflow: hidden;
        height: auto;
        padding: 0px 10px;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        
        .car__slider {
            .car__slider-wrapper {
                overflow: hidden;
                display: flex;
                position: relative;
                height: auto;
                padding: 0px 20px 20px 20px;
                @media screen and (max-width: 768px) {
                    display: none;
                    height: auto;
                }

                .slider__item {
                    height: 225px;
                    width: 100%;
                    padding: 0 0px;
                    display: flex;
                    align-items: flex-end; /* Это выровняет изображение по нижнему краю */
                    overflow: hidden;
                    @media screen and (max-width: 1250px){
                        height: 200px;
                    }
                    @media screen and (max-width: 1130px){
                        height: 150px;
                    }
                    @media screen and (max-width: 1050px){
                        height: 150px;
                    }
                    @media screen and (max-width: 600px){
                        height: 200px;
                    }
                    img {
                        width: 100%;
                        height: auto;
                        max-height: 100%;
                        object-fit: cover;
                        // object-position: center bottom; /* Обрезка будет только сверху */
                    }
                }

                .second {
                    img {
                        object-fit: contain;
                    }
                }

                .slider__overflow {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    background: transparent;

                    .slider__overflow-list {
                        display: flex;
                        width: 100%;
                        height: 100%;
                        background: transparent;

                        .slider__overflow-item {
                            background: transparent;
                            border-bottom: 5px solid white;
                        }

                        .active {
                            border-bottom: 5px solid var(--main-color);
                        }
                    }
                }
            }

            .car__slider-wrapper.mobile {
                display: none;

                @media screen and (max-width: 768px) {
                    display: block;
                }
            }
        }

        .car__stickers {
            display: flex;
            justify-content: space-between;
            width: 100%;
            // position: absolute;
            z-index: 10;
            top: 10px;
            left: 0;
            padding: 0 10px;
            background: transparent;

            .sticker {
                border-radius: 20px;
                background: white;
                text-align: center;
                z-index: 1;
                padding: 6px 8px;
                font-size: var(--small-size);
                line-height: normal;
            }

            .available {
                background: var(--secondary-color);
                color: white;
                display: none;
            }

            .garantee {
                background: var(--main-color);
                color: white;
            }
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

    }
}

.complectation__span{
    color: var(--main-color);
}

.current-car {
    display: none;
}

.recent {
    display: none;
    position: absolute;
    left: 15px;
    top: 15px;
    background: white;
    text-align: center;
    z-index: 100;
    padding: 8px 12px;
    border-radius: 20px;
}

.car__text {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.car__title {
            line-height: normal;
            display: flex;
            // justify-content: center;
            align-items: center;
            // justify-content: space-between;
            // padding: 0px 10px 0px 10px;
            flex-direction: column;
            // margin-bottom: 10px;
            // height: 70px;
            .name {
                font-weight: bold;
                color: white;
                display: flex;
                justify-content: space-between;
                font-weight: 300;
                align-items: center;
                font-size: 14px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-bottom: 9.5px;
                background: var(--main-color);
                width: 100%;
                padding: 10px;
                a{
                    text-decoration: underline;
                }
                // text-decoration: underline;
                // justify-content: center;
                p{
                    font-weight: 700;
                    font-size: 20px;
                }
            }

            .model{
              font-size: 18px;
              display: flex;
            }
        }
</style>