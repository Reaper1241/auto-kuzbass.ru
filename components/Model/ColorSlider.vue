<script setup>
const props = defineProps(['gallery'])

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

const breakpoints = {
    0: {
        itemsToShow: 1,
    },
}
</script>

<template>
    <div class="color-slider">
        <Carousel id="gallery" :items-to-show="1" :wrap-around="true" v-model="newStore.color" :mouseDrag="true"
            :breakpoints="breakpoints" class="color__slider special__slider" snapAlign="center">
            <Slide v-for="(slide, index) in gallery" :key="index">
                <div class="carousel__item">
                    <div class="slide">
                        <div class="image-wrapper">
                            <NuxtImg lazy format="webp" quality="90" loading="lazy" :src="`${slide.url}`" alt="car"
                                style="width: 100%;" />
                        </div>
                    </div>
                </div>
            </Slide>

            <template #addons>
                <Navigation class="carousel__navigation" />
            </template>
        </Carousel>

        <div class="color-choice">
            <div class="color-choice__title">
                Выбранный цвет: {{ gallery[newStore.color]?.color?.color }}
            </div>

            <div class="color-choice__colors">
                <div class="color-choice__color" v-for="(color, index) in gallery" :key="color.id"
                    @click="newStore.color = index" :style="{ display: color.color.hex ? `block` : `none` }"
                    :class="{ 'color-choice__color--active': newStore.color == index }">
                    <div class="color-choice__color-inner" :style="{ background: color.color.hex }" />
                </div>
            </div>
        </div>

        <div class="model-card__alert" v-if="newStore.model.warranty_km || newStore.model.warranty_year">

            <span class="model-card__alert-title">Гарантия на авто</span>
            <span class="model-card__alert-subtitle">
                {{ newStore.model.warranty_km ? (newStore.model.warranty_km + ' км') : '' }}
                {{ newStore.model.warranty_km && newStore.model.warranty_year ? ' или ' : '' }}
                {{ newStore.model.warranty_year ? (getYear(newStore.model.warranty_year)) : '' }}
            </span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.color-choice {
    position: absolute;
    top: 5px;
    left: 5px;
    padding: 10px;
    background: white;
    border-radius: 20px;
    box-shadow: var(--box-shadow);

    @media screen and (max-width: 768px) {
        position: relative;
        left: 0;
    }

    .color-choice__title {
        margin-bottom: 10px;
    }

    .color-choice__colors {
        display: flex;
        gap: 5px;

        .color-choice__color {
            width: 20px;
            height: 20px;
            border-radius: 100%;
            cursor: pointer;
            border: 1px solid var(--dark-grey);

            .color-choice__color-inner {
                width: 100%;
                height: 100%;
                border-radius: 100%;
            }
        }

        .color-choice__color--active {
            padding: 4px;
            border: 1px solid var(--main-black);
        }
    }
}

.color-slider {
    position: relative;
    display: flex;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;

    .carousel {
        height: 100%;

        .image-wrapper {
            height: 100%;
            display: flex;
            align-items: center;

            img {
                max-height: 220px;
                object-fit: contain;
            }
        }
    }
}

.model-card__alert {
    display: flex;
    flex-direction: column;
    text-align: center;

    background: var(--main-color);
    padding: 15px 0;
    color: white;
    gap: 5px;

    @media screen and (max-width: 768px) {
        margin: 0 -10px;
    }

    .model-card__alert-title {
        text-transform: uppercase;
        font-weight: bold;
        font-size: var(--large-size);
    }

    .model-card__alert-subtitle {
        font-size: var(--standart-size);
    }
}
</style>