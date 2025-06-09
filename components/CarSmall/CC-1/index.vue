<script setup>
import Slider from './Slider.vue';
import { useAppStore } from '/stores/AppStore.js';
const appStore = useAppStore();

const props = defineProps(['car'])
const emits = defineEmits(['choiceCar']);
const car = computed(() => props.car)

const selectedImage = ref(0);
</script>

<template>
    <div class="car сс-1">
        <div class="car__img">
            <div class="car__slider">
                <div class="car__slider-wrapper">
                    <div class="slider__overflow">
                        <div class="slider__overflow-list">
                            <div class="slider__overflow-item" v-for="(slide, index) in car.images.slice(0, 10)"
                                :key="index" :style="{ width: 100 / 10 + '%', height: '100%' }"
                                @mouseenter="selectedImage = index" :class="{ 'active': selectedImage === index }" />
                        </div>
                    </div>
                    <div class="slider__item">
                        <img :src="car.images[selectedImage].url" alt="car" />
                    </div>
                </div>
                <div class="car__slider-wrapper mobile">
                    <Slider :carInfo="car" />
                </div>
            </div>
            <div class="car__stickers">
                <div class="sticker available">В наличии</div>
            </div>
        </div>


        <div class="car__title">
            {{ cleanUpTitle(car.brand, car.model) }}
        </div>

        <div class="car__price">
            <div class="car__price-current">
                <span class="old">
                    от {{ makeSpaces(car.price) }} ₽
                </span>
                <span class="current">
                    от {{ makeSpaces(car.price - car.sale) }} ₽
                </span>
            </div>
            <div class="car__price-month">
                от {{ makeSpaces(appStore.calcMonthPrice(car)) }} ₽/11мес.
            </div>
        </div>

        <div class="car__params">
            <div class="car__params-list">
                <span class="car__param">
                    {{ car.year }} г
                </span>
                <span class="car__param">
                    {{ car.modification }} г
                </span>
                <span class="car__param">
                    {{ car.fuel }}
                </span>
                <span class="car__param">
                    {{ car.power }} л.с.
                </span>
                <span class="car__param">
                    {{ car.drive }} привод
                </span>
                <span class="car__param">
                    {{ makeSpaces(car.mileage) }} км
                </span>
                <span class="car__param">
                    {{ car.owner_count_id == 1 ? '1'
                        : car.owner_count_id == 2 ? '2'
                            : car.owner_count_id == 3 ? '3+'
                                : '0' }} вл.
                </span>
            </div>
        </div>


        <div class="car__controls">
            <BaseButton :label="'Выбрать'" :class="`classic`" @click="emits('choiceCar', car)" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.car {
    cursor: pointer;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 280px;
    border-radius: 20px;
    transition: 0.3s;
    position: relative;
    background: white;
    padding: 15px;
    gap: 10px;
    border: 1px solid #D7D7D7;

    @media screen and (max-width: 400px) {
        padding: 10px;
        gap: 10px;
    }

    &:hover {
        box-shadow: var(--box-shadow);
        transition: 0.3s;
    }

    .car__title {
        font-size: var(--big-size);
        font-weight: bold;
        line-height: normal;

        span {
            color: #8E8D92;
            font-weight: inherit;
        }
    }

    .car__params-list {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;

        .car__param {
            border: 1px solid #D7D7D7;
            padding: 3px 5px;
            border-radius: 20px;
            font-size: var(--small-size);

            &:first-child {
                background: var(--secondary-color);
                color: white;
                border: 1px solid var(--secondary-color);
            }
        }
    }

    .car__more-link {
        padding: 15px;
        background: var(--main-color);
        border: 1px solid var(--main-color);
        color: white;
        text-align: center;
        border-radius: 20px;
        width: auto;
        transition: 0.3s;

        &:hover {
            background: transparent;
            transition: 0.3s;
            color: var(--main-color);
        }
    }

    .car__price {
        display: grid;
        width: 100%;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: 10px;

        .car__price-month {
            color: white;
            font-size: var(--standart-size);
            border: 1px solid var(--secondary-color);
            padding: 5px;
            border-radius: 20px;
            background: var(--secondary-color);
            font-weight: 500;

            @media screen and (max-width: 400px) {
                font-size: 12px;
            }
        }

        .car__price-current {
            display: flex;
            flex-direction: column;

            .current {
                flex-direction: column;
                font-size: var(--big-size);
                line-height: normal;
                font-weight: 700;
                color: var(--main-color);
            }

            .old {
                text-decoration: line-through;
                font-size: var(--standart-size);
                color: #8E8D92;
            }
        }
    }

    .car__controls {
        width: 100%;
    }

    .car__img {
        position: relative;
        width: 100%;
        border-radius: 20px;
        overflow: hidden;
        height: auto;

        .car__slider {
            .car__slider-wrapper {
                overflow: hidden;
                display: flex;
                position: relative;
                height: auto;

                @media screen and (max-width: 768px) {
                    display: none;
                    height: auto;
                }

                .slider__item {}

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
            display: none;
            position: absolute;
            z-index: 10;
            top: 1px;
            left: 1px;
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
            }
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

    }
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
</style>