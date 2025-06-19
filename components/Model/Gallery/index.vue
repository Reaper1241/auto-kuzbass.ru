<script setup>
import { apiNew } from '@/constants';

import { useNewStore } from '/stores/NewStore.js';
const newStore = useNewStore();

const interior = ref([]);
const exterior = ref([]);
const loading = ref(true);
const choice = ref(0);

const urls = [
    `${apiNew}galleries/${newStore.model.id}?gallery_type_id=1`,{
        headers: {
            'Domain': 'https://tmn-auto.ru'
        }
    },
    `${apiNew}galleries/${newStore.model.id}?gallery_type_id=2`,{
        headers: {
            'Domain': 'https://tmn-auto.ru'
        }
    }
];

Promise.all(urls.map(url => fetch(url).then(res => res.json())))
    .then(([interiorData, exteriorData]) => {
        interior.value = interiorData;
        exterior.value = exteriorData;
        loading.value = false;
    });


const currentSlide = ref(0)
const images = computed(() => {
    return choice.value === 0 ? interior.value : exterior.value
})

const breakpoints = {
    0: {
        itemsToShow: 1.25,
    },
    1150: {
        itemsToShow: 1.75,
    },
}

function slideTo(index) {
    if (index === images.length) {
        currentSlide.value = 0;
    } else {
        currentSlide.value = index;
    }
}

watch(() => images.value, () => {
    if (images.value.length) {
        currentSlide.value = 1;
    }
});
</script>

<template>
    <section class="gallery" v-if="interior?.length || exterior?.length">
            <div class="gallery__wrapper">
                <div class="gallery__body">
                    <div class="gallery__choice">
                        <div class="choice__item" @click="choice = 0" :class="{ 'active': choice == 0 }"
                            v-if="interior?.length">
                            Интерьер
                            <i class="fa-solid fa-sort-down"></i>
                        </div>
                        <div class="choice__item" @click="choice = 1" :class="{ 'active': choice == 1 }"
                            v-if="exterior?.length">
                            Экстерьер
                            <i class="fa-solid fa-sort-down"></i>
                        </div>
                    </div>
                    <div class="gallery__output">
                        <div class="special__slider model__gallery">
                            <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide"
                                :mouseDrag="false" :breakpoints="breakpoints">
                                <Slide v-for="(slide, index) in images" :key="index">
                                    <div class="carousel__item">
                                        <div class="slide">
                                            <a data-fancybox="gallery" :href="`${slide.url}`">
                                                <img :src="`${slide.url}`" alt="car" style="width: 100%;" />
                                            </a>
                                        </div>
                                    </div>
                                </Slide>

                                <template #addons>
                                    <Navigation class="carousel__navigation" />
                                </template>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
    </section>
</template>

<style lang="scss" scoped>
.gallery__body {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .gallery__choice {
        display: flex;
        gap: 15px;

        .choice__item {
            font-size: var(--large-size);
            font-weight: 600;
            line-height: normal;
            background: #eeeeee;
            padding: 8px 14px;
            border-radius: 20px;
            cursor: pointer;
            opacity: 0.4;
            transition: 0.3s;
            position: relative;

            @media screen and (max-width: 768px) {
                font-size: var(--medium-size);
            }

            i {
                position: absolute;
                bottom: -10px;
                color: #eeeeee;
                left: 50%;
                transform: translateX(-50%);
                font-size: 25px;
            }

            &:hover {
                opacity: 1;
                transition: 0.3s;
            }
        }

        .active {
            opacity: 1;
        }
    }

    .gallery__output {
        display: flex;
        flex-direction: row;
        gap: 5px;
        overflow-x: auto;
        padding-bottom: 10px;


        img {
            width: auto;
            object-fit: cover;
            height: 150px;
        }
    }
}
</style>