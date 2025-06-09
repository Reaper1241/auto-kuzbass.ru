<script setup>
const currentSlide = ref(0)
const props = defineProps({
    images: Array,
    imagesType: Boolean,
    preview: String
});
const breakpoints = {
    0: {
        itemsToShow: 1.25,
    },
    1150: {
        itemsToShow: 1,
    },
}

props.imagesType ? null : props.images.unshift({ url: props.preview });

function slideTo(index) {
    if (index === props.images.length) {
        currentSlide.value = 0;
    } else {
        currentSlide.value = index;
    }
}



watch(() => props.images, () => {
    if (props.images.length) {
        currentSlide.value = 1;
    }
});

function slideNext() {
    slideTo((currentSlide.value + 1) % props.images.length);
}

function slidePrev() {
    slideTo((currentSlide.value - 1 + props.images.length) % props.images.length);
}
</script>

<template>
    <div class="special__slider">
        <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide" :mouseDrag="false"
            :breakpoints="breakpoints">
            <Slide v-for="(slide, index) in props.images" :key="index">
                <div class="carousel__item">
                    <div class="slide">
                        <a data-fancybox="gallery" :href="`${slide.url}`">
                            <NuxtImg class="main-image" lazy format="webp" quality="80" loading="lazy" :src="`${slide.url}`" alt="car"
                                style="width: 100%;" />
                        </a>
                    </div>
                </div>
            </Slide>

            <template #addons>
                <Pagination />
                <div class="custom-navigation">
                    
                    <!-- <button class="carousel__prev" @click="slidePrev" />
                    <button class="carousel__next" @click="slideNext" /> -->
                </div>
            </template>
        </Carousel>

        <div class="carousel__custom-thumbnails">
            <ul class="carousel__custom-thumbnails-list"
                :style="`transform: translateY(-${props.images.length > 6 ? (currentSlide * 100) : 0}px)`">
                <!-- Original images -->
                <li v-for="(slide, index) in props.images" :key="index" class="carousel__item"
                    :class="{ 'active': currentSlide === index }" @click="slideTo(index)">
                    <NuxtImg lazy format="webp" quality="90" loading="lazy" :src="slide.url" alt="car"
                        style="width: 100%;" />
                </li>

                <!-- Duplicated first image -->
                <li v-for="(slide, index) in props.images" :key="index" class="carousel__item"
                    :class="{ 'active': currentSlide === index }" @click="slideTo(index)">
                    <NuxtImg lazy format="webp" quality="90" loading="lazy" :src="slide.url" alt="car"
                        style="width: 100%;" v-if="props.images.length > 6" />
                </li>
            </ul>
        </div>

        <!-- <div class="carousel__pages">{{ currentSlide + 1 }} / {{ props.images.length }}</div> -->
    </div>
</template>

<style scoped lang="scss">
.thumbnails li {
    margin: 10px;
}

.carousel__item {
    width: 100%;
}

.special__slider {
    max-width: 95vw;
    display: grid;
    grid-template-columns: 5fr max-content;
    gap: 10px;

    @media screen and (max-width: 1150px) {
        position: relative;
        display: block;
    }

    #thumbnails {
        @media screen and (min-width: 1150px) {
            display: none;
        }
    }

    .no-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .carousel {}

    .carousel__custom-thumbnails {
        position: relative;
        overflow: hidden;
        max-height: 500px;

        .carousel__custom-thumbnails-list {
            display: grid;
            gap: 10px;

            transition: transform 0.3s ease-in-out;

            @media screen and (max-width: 1150px) {
                display: none;
            }

            .carousel__item {
                cursor: pointer;
                list-style: none;
                padding: 0;
                margin: 0;
                border-radius: 4px;
                overflow: hidden;
                opacity: 0.5;
                width: 100px;
            }

            .carousel__item.active {
                opacity: 1;
            }
        }

        .carousel__custom-thumbnails-controls {
            position: absolute;
            top: -10px;

            .controls__prev {
                background: var(--main-color);
                width: 30px;
                height: 30px;
                border-radius: 100%;
                color: white;
            }
        }
    }
}

.no-image {
    grid-template-columns: 1fr;
}

.carousel__pages {
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    background: #3b3b3bc4;
    padding: 4px 8px;
    color: white;
    border-radius: 4px;
    font-size: var(--standart-size);

    @media screen and (max-width: 1150px) {
        display: flex;
    }
}

.carousel__pagination {
    flex-wrap: wrap;
}

.main-image {
    border-radius: 4px;
    width: 100%;
    aspect-ratio: 16 / 9; 
    object-fit: cover;
    display: block;
}
</style>