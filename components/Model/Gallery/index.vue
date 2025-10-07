<script setup>
import { apiNew } from '@/constants';
import { useNewStore } from '/stores/NewStore.js';
import { ref, computed, watch, onMounted, nextTick } from 'vue';

const newStore = useNewStore();

const interior = ref([]);
const exterior = ref([]);
const loading = ref(true);
const choice = ref(0);

const currentSlide = ref(0);
const carouselRef = ref(null);
const carouselKey = ref(0); 

const fetchOptions = {
    headers: {
        'domain': 'https://new-carlab.ru'
    }
};

const images = computed(() => {
    return choice.value === 0 ? interior.value : exterior.value;
});

const breakpoints = {
    0: { itemsToShow: 1.25 },
    1150: { itemsToShow: 1.75 },
};


function waitForImagesToLoad(imgList) {
    return Promise.all(
        imgList.map(src => 
            new Promise(resolve => {
                const img = new Image();
                img.src = src;
                if (img.complete) {
                    resolve();
                } else {
                    img.onload = () => resolve();
                    img.onerror = () => resolve();
                }
            })
        )
    );
}

function refreshCarousel(forceRecreate = false) {
    nextTick(() => {
        if (forceRecreate) {
            carouselKey.value++;
        } else if (carouselRef.value) {
            carouselRef.value.updateSlideWidth?.();
            carouselRef.value.updateSlidesData?.();
        }
    });
}

async function loadGalleries() {
    try {
        loading.value = true;

        const urls = [
            `${apiNew}galleries/${newStore.model.id}?gallery_type_id=1`,
            `${apiNew}galleries/${newStore.model.id}?gallery_type_id=2`,
        ];

        const [interiorData, exteriorData] = await Promise.all(
            urls.map(url => fetch(url, fetchOptions).then(res => res.json()))
        );

        interior.value = interiorData;
        exterior.value = exteriorData;

        await nextTick();
        await waitForImagesToLoad(images.value.map(i => i.url));


        refreshCarousel(true);
    } catch (error) {
        console.error('Error fetching galleries:', error);
    } finally {
        loading.value = false;
    }
}


watch(images, async (newVal) => {
    if (newVal.length) {
        currentSlide.value = 0;
        await nextTick();
        await waitForImagesToLoad(newVal.map(i => i.url));

        refreshCarousel(true);
    }
}, { immediate: true });

onMounted(async () => {
    await loadGalleries();
    setTimeout(() => refreshCarousel(true), 100);
});
</script>

<template>
    <section class="gallery" v-if="interior.length || exterior.length">
        <div class="gallery__wrapper">
            <div class="gallery__body">
                <div class="gallery__choice">
                    <div class="choice__item"
                         @click="choice = 0"
                         :class="{ 'active': choice == 0 }"
                         v-if="interior.length">
                        Интерьер
                        <i class="fa-solid fa-sort-down"></i>
                    </div>
                    <div class="choice__item"
                         @click="choice = 1"
                         :class="{ 'active': choice == 1 }"
                         v-if="exterior.length">
                        Экстерьер
                        <i class="fa-solid fa-sort-down"></i>
                    </div>
                </div>

                <div class="gallery__output">
                    <div class="special__slider model__gallery">
                        <Carousel
                            :key="carouselKey"
                            ref="carouselRef"
                            id="gallery" 
                            :items-to-show="1" 
                            :wrap-around="false" 
                            v-model="currentSlide"
                            :breakpoints="breakpoints"
                        >
                            <Slide v-for="(slide, index) in images" :key="index">
                                <div class="carousel__item">
                                    <div class="slide">
                                        <a data-fancybox="gallery" :href="slide.url">
                                            <img :src="slide.url" alt="car" style="width: 100%;" />
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
